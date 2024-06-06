import { FetchContext, FetchResponse } from 'ofetch'
import useForm from './useForm'

export default function usePrecognitionForm<Data extends Record<string, unknown>>(method: RequestMethod, url: string | (() => string), data: Data) {
  const form = useForm(data)
  form.method = method
  form.url = resolveUrl(url)
  form.validate = validate
  form.validating = false
  const baseSubmit = form.submit
  const precogSubmit = (data: Record<string, unknown>) => {
    return baseSubmit.bind(form)(form.method, form.url, data)
  }

  form.submit = precogSubmit.bind(form)

  return form
}

async function validate(fieldName: string) {
  console.log('validate', fieldName)
  // check if the fieldName is an array
  let onlyFieldsToValidate
  const transformedData = this.transform(this.data())
  if (Array.isArray(fieldName)) {
    // get only the keys that are listed in the array
    fieldName.forEach((key) => {
      if (onlyFieldsToValidate[key] !== undefined) {
        onlyFieldsToValidate[key] = transformedData[key]
      }
    })
  }
  else {
    onlyFieldsToValidate = { [fieldName]: transformedData[fieldName] }
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
      console.log('precognitionOnError', errors)
      this.setError(errors)
    },
    onFinish: () => {
      console.log('precognitionOnFinish')
      this.validating = false
    },
  }

  const validateOnly = Object.keys(onlyFieldsToValidate).join()

  console.log('precognition oFetch')
  try {
    const response = await $fetch(this.url, {
      method: this.method,
      headers: {
        'Precognition': true,
        'Precognition-Validate-Only': validateOnly,
      },
      body: onlyFieldsToValidate,
      onRequest: async ({ request, options }) => {
        console.log('precognition oFetch onRequest', request, options)

        await defaultOptions.onStart()
      },
      onResponseError: async ({ response }) => {
        console.log('precognition onResponseError')
        const errors = response._data.data?.errors
        await defaultOptions.onError(errors)
        await defaultOptions.onFinish()
      },
    }).catch(async (e) => {
      if (e.status !== 422) {
      // this isn't a precognition error
        throw e
      }

      console.log('precognition onResponseError')
      const errors = e.data?.data?.errors
      await defaultOptions.onError(errors)
      await defaultOptions.onFinish()
    })
  }
  catch (e) {
  }
}

type RequestMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'

const resolveUrl = (url: string | (() => string)): string => typeof url === 'string'
  ? url
  : url()
