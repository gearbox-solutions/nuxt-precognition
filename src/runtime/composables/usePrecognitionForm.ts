import useForm from './useForm'

export default function usePrecognitionForm<Data extends Record<string, unknown>>(method: RequestMethod, url: string | (() => string), data: Data) {
  const form = useForm(data)
  form.method = method
  form.url = resolveUrl(url)
  form.validate = validate.bind(form)
  form.validating = false
  const baseSubmit = form.submit
  const precogSubmit = (data: Record<string, unknown>) => {
    return baseSubmit.bind(form)(form.method, form.url, data)
  }

  form.submit = precogSubmit.bind(form)

  return form
}

function precogSubmit(method: RequestMethod, url: string, data: Record<string, unknown>) {
  baseSubmit(method, url, data)
}

async function validate(fieldName: string) {
  console.log('validate', fieldName)
  const data = { [fieldName]: this.transform(this.data())[fieldName] }
  data.precognition = {
    field: fieldName,
  }
  const defaultOptions = {
    onStart: () => {
      console.log('precognition onStart')
      this.validating = true
    },
    onSuccess: async (response) => {
      console.log('precognition onSuccess', response)
      this.clearErrors()
    },
    onError: (errors) => {
      console.log('precognitiononError', errors)
      this.setError(errors)
    },
    onFinish: () => {
      console.log('precognitiononFinish')
      this.validating = false
    },
  }

  try {
    console.log('precognition oFetch')
    await $fetch(this.url, {
      method: this.method,
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
        await defaultOptions.onFinish()
      },
    })
  }
  catch (e) {
    // we don't need to do anything here, the onError hook will handle it
  }
}

type RequestMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'

const resolveUrl = (url: string | (() => string)): string => typeof url === 'string'
  ? url
  : url()
