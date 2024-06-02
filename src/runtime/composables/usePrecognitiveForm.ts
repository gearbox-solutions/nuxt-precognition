import useForm from './useForm'

export default function usePrecognitiveForm(method, url, data) {
  const form = useForm(data)
  form.method = method
  form.url = url
  form.validate = async (fieldName: string) => {
    const data = { [fieldName]: form.transform(form.data())[fieldName] }
    data.precognition = {
      field: fieldName,
    }
    const defaultOptions = {
      onBefore: (visit) => {
        console.log('precognition onBefore', visit)
        form.wasSuccessful = false
        form.recentlySuccessful = false
        clearTimeout(recentlySuccessfulTimeoutId)
      },
      onStart: (visit) => {
        console.log('precognition onStart', visit)
        form.processing = true
      },
      onSuccess: async (page) => {
        console.log('precognition onSuccess', page)
        form.processing = false
        form.progress = null
        form.clearErrors()
        form.wasSuccessful = true
        form.recentlySuccessful = true
      },
      onError: (errors) => {
        console.log('precognitiononError', errors)
        form.processing = false
        form.progress = null
        form.clearErrors().setError(errors)
      },
      onFinish: () => {
        console.log('precognitiononFinish')
        form.processing = false
        form.progress = null
      },
    }

    await $fetch(form.url, {
      method: form.method,
      body: data,
      onRequest: async ({ request, options }) => {
        console.log('precognition oFetch onRequest', request, options)

        await defaultOptions.onStart()
      },
      onResponse: async ({ response }) => {
        console.log('precognition onResponse')
        // onResponse is always called, even if there was an errors
        // return early so we don't execute both this and onResponseError
        if (!response.ok) {
          return
        }
        await defaultOptions.onSuccess(response)
        await defaultOptions.onFinish()
      },
      onResponseError: async ({ response }) => {
        console.log('precognition onResponseError')
        const errors = response._data.data?.errors
        await defaultOptions.onError(errors)
      },
    })
  }

  return form
}
