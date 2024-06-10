import type { FetchContext, FetchResponse } from "ofetch";
import useForm from "./useForm";

export default function usePrecognitionForm<Data extends Record<string, unknown>>(
  method: RequestMethod,
  url: string | (() => string),
  data: Data,
) {
  const form = useForm(data);
  form.method = method;
  form.url = resolveUrl(url);
  form.validate = validate;
  form.validating = false;
  const baseSubmit = form.submit;
  const precogSubmit = (data: Record<string, unknown>) => {
    return baseSubmit.bind(form)(form.method, form.url, data);
  };

  form.submit = precogSubmit.bind(form);

  return form;
}

async function validate(fieldName: string) {
  // check if the fieldName is an array
  let onlyFieldsToValidate;
  const transformedData = this.transform(this.data());
  if (Array.isArray(fieldName)) {
    // get only the keys that are listed in the array
    fieldName.forEach((key) => {
      if (onlyFieldsToValidate[key] !== undefined) {
        onlyFieldsToValidate[key] = transformedData[key];
      }
    });
  } else {
    onlyFieldsToValidate = { [fieldName]: transformedData[fieldName] };
  }

  const defaultOptions = {
    onStart: () => {
      this.validating = true;
    },
    onSuccess: async () => {
      this.clearErrors();
    },
    onError: (errors) => {
      this.setError(errors);
    },
    onFinish: () => {
      this.validating = false;
    },
  };

  const validateOnly = Object.keys(onlyFieldsToValidate).join();

  try {
    await $fetch(this.url, {
      method: this.method,
      headers: {
        Precognition: true,
        "Precognition-Validate-Only": validateOnly,
      },
      body: onlyFieldsToValidate,
      onRequest: async () => {
        await defaultOptions.onStart();
      },
      onResponse: async (context: FetchContext & { response: FetchResponse<R> }): Promise<void> | void => {
        if (!context.response.ok) {
          return;
        }

        // clear the errors for the validated fields
        await this.clearErrors(validateOnly);
      },
      onResponseError: async ({ response }) => {
        const errors = response._data.data?.errors;
        await defaultOptions.onError(errors);
        await defaultOptions.onFinish();
      },
    });
  } catch (e) {
    if (e.status !== 422) {
      // this isn't a precognition error
      throw e;
    }
  }
}

type RequestMethod = "get" | "post" | "patch" | "put" | "delete";

const resolveUrl = (url: string | (() => string)): string => (typeof url === "string" ? url : url());
