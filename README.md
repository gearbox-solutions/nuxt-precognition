

# Nuxt Precognition

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt Precognition is a "precognition" utility for sharing server-side validation with your front-end. This is inspired by [Laravel Precognition](https://laravel.com/docs/11.x/precognition) and helps you provide a good user validation experience, while also helping to make the Nuxt form submission and validation process as smooth as possible.

## Table of Contents
* [Features](#Features)
* [Quick Setup](#quick-setup)
* [Examples](#examples)
* [Usage - Client-Side](#usage---client-side)
  * [usePrecognitionForm](#the-useprecognitionform-vue-composable)
  * [useForm](#the-useform-vue-composable)
* [Usage - Server-Side](#usage---server-side)
  * [handlePrecognitionRequest](#the-handleprecognitionrequest-server-utility--middleware) 
  * [getValidatedInput](#the-getvalidatedinput-utlity-function)




## Features

- Convenient form submission and validation with `useForm` and `usePrecognitionForm` composables 
- Server-side validation of form data before the actual event handler runs with `definePrecognitionEventHandler` Nuxt server utility/middleware

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @gearbox-solutions/nuxt-precognition
```

That's it! You can now use Nuxt Precognition in your Nuxt app ✨

## Examples

[🏀 Try it on Stackblitz! 🏀](https://stackblitz.com/github/gearbox-solutions/nuxt-precognition?file=playground%2Fpages%2Fregister-precog.vue)

An example implementation can be found in the [`/playground` directory of this project](https://github.com/gearbox-solutions/nuxt-precognition/tree/main/playground). You can run it locally by checking out this repo, installing dependencies with `pnpm install`, and then running the playground with `pnpm run dev`. This should launch a local server for you to see the form submissions both with validation-only using the `useForm` composable and precognition validation with `usePrecognitionForm`.

Alternatively, use the Stackblitz link above to run it in your browser.

## Usage - Client-Side

### The usePrecognitionForm Vue Composable

The `usePrecogitionForm` composable is the core feature for setting up the precognition workflow. This composable extends the `useForm` composable (described below)and provides a more robust form submission and validation workflow when used in conjunction with the `handlePrecognitionRequest` server middleware.

The `useProecognitionForm` composable is automatically imported into your Nuxt app when you install the module, and can be used without needing to manually import it.

This composable is used to create your form object and will manage form submission and validation. It is stateful, and will provide you with the form states and errors for you to nicely display validation and submission state in your components.

Here is an example of using the `usePrecognitionForm` composable to create a form object, validate the data on change, and handle form submission and responses:

```vue
<script setup lang="ts">

const { data: entries, refresh } = await useFetch("/api/entries");

const form = usePrecognitionForm('post', '/api/entries', {
  name: '',
})

const submitForm = async () => {
  await form.submit({
    onSuccess: (response) => {
      refresh()
    },
  })
}
</script>

<template>
  <div>
    <div class="flex gap-x-8">
      <form
        class="space-y-4"
        @submit.prevent="submitForm"
      >
        <div class="">
          <label for="description"
                 class="block text-sm uppercase">
            Name
          </label>
          <input
            id="description"
            v-model="form.name"
            type="text"
            name="description"
            @change="form.validate('name')"
          />
          <div
            v-for="error in form.errors.name"
            :key="error"
            class="text-red-500"
          >
            {{ error }}
          </div>
        </div>

        <div>
          <button :disabled="form.processing">
            Submit
          </button>
        </div>
      </form>
      <pre>{{ form }}</pre>
    </div>
    <div class="pt-12">
      <div class="text-lg font-bold uppercase">
        Entries
      </div>
      <div
        v-for="(entry, index) in entries"
        :key="index"
      >
        {{ entry.name }}
      </div>
    </div>
  </div>
</template>


```

### The useForm Vue Composable
 The `useForm` Vue composable provides a convenient way to handle form submission and validation errors in your Nuxt app for cases when you may not want to use the full precognition features, but still keep the same convenient form-submission process. A form created through the `useForm` composable provide your form submissions with a number of useful features.

This form is based on the [`useForm` composable from Inertia.js](https://inertiajs.com/forms#form-helper) and generally implements the same API and can be used in the same way. [The documentation for the `useForm` composable](https://inertiajs.com/forms#form-helper) should be consulted for details on how to use the form.


 - Lifecycle Hooks
    - `onBefore()` 
    - `onStart()`
    - `onSuccess(response)` - Runs after the request. Called only if the request is successful. 
    - `onError(response)` -  Runs after the request. Called only if the request fails.
    - `onFinish(response)` - Always runs after the request, after `onSuccess` or `onError`
 - Form State
   - `isDirty` - Boolean - Indicates if the form values have been changed since it was instanciated.
   - `hasErrors` - Boolean - Indicates if there are validation errors
   - `processing` - Boolean - Indicates if the form has been submitted, but a response has not yet been received
   - `wasSuccessful` - Boolean - Indicates if the last form submission was successful
   - `recentlySuccessful` - Boolean - Temporarily indicates `true` if the last form submission was successful, then changes to false. This is useful for temporarily showing a "Success!" type of message to users.
 - Functions
   - `reset()` - Reset the form to the state it was in when it was created
   - `setError(field, value)` - Manually set an error state.
   - `clearErrors()` - Clear the error state.
   - `submit(method, url, options?)` - Submit the form using the specified method. You can also use the helper functions instead of this.
   - `get(url: string, options?)` - Convenience function for `submit()` with `GET`
   - `post(url: string, options?)` - Convenience function for `submit()` with `POST`
   - `put(url: string, options?)` - Convenience function for `submit()` with `PUT`
   - `patch(url: string, options?)` - Convenience function for `submit()` with `PATCH`
   - `delete(url: string, options?)` - Convenience function for `submit()` with `DELETE`


This composable is automatically imported into your Nuxt app when you install the module, and can be used without needing to manually import it.

The useForm composable can be used without the precognition middleware, and is just a convenient way to handle form submission and validation errors in your Nuxt app in general. You can use this with the `getValidatedInput()` utility to validate and return validation errors if you don't want to do the precognition validation.

Here is an example of using the form to submit a Todo item to an API endpoint:
```vue
<script setup lang="ts">

const { data: entries, refresh } = await useFetch("/api/entries");

const form = useForm({
  description: '',
})

const submitForm = async () => {
  await form.post('/api/entries', {
    onSuccess: (response) => {
      refresh()
    },
  })
}
</script>

<template>
  <div>
    <div class="flex gap-x-8">
      <form
        class="space-y-4"
        @submit.prevent="submitForm"
      >
        <div class="space-x-4">
          <label for="description">Name</label>
          <input
            id="description"
            v-model="form.name"
            type="text"
            name="description"
            :errors="form.errors.name"
          />
        </div>

        <div>
          <button :disabled="form.processing">
            Submit
          </button>
        </div>
      </form>
      <pre>{{ form }}</pre>
    </div>
    <div class="pt-12">
      <div class="text-lg font-bold uppercase">
        Entries
      </div>
      <div
        v-for="(entry, index) in entries"
        :key="index"
      >
        {{ entry.description }}
      </div>
    </div>
  </div>
</template>


```

## Usage - Server-Side

### The handlePrecognitionRequest Server Utility / Middleware

The `handlePrecognitionRequest` server middleware is a server-side middleware that can be used to handle form submissions and validation errors in your Nuxt app. It is designed to work with the `usePrecognitionForm` composable, and will validate the data submitted by that form, and will return validation results before it reaches the main part of your handler.

> [!Note]  
> Your main handler code will not run on a precognition validation request, even though it will be posting to the same endpoint. How convenient!

Validation is configured using a [Zod Object](https://zod.dev/?id=objects) which should be designed to handle the fields in your form subimssion.

Your Nuxt server routes should return a default `definePrecognitionEventHandler` instead of the usual `defineEventHandler`. This new handler takes a Zod object as its first parameter, and then the second parameter is your regular event handler function definition. 

This new handler type is automatically imported by Nuxt when the module is installed, and does not need to be manually imported.

```ts
definePrecognitionEventHandler(zodSchemaObject, handler)
```

#### Parameters:

* **zodSchemaObject** - The Zod validation [Schema Object](https://zod.dev/?id=objects) which will be used for validation of form data on Precognition requests, without executing the handler.
* **handler** - A regular [Nuxt event handler callback function](https://nuxt.com/docs/guide/directory-structure/server) to run, which would be your regular event handler for this server endpoint.


Example API endpoint handler:
```ts
import { z } from 'zod'

// define the Zod object for validation
const todoRequestSchema = z.object({
  description: z.string().trim().min(1, 'Description is required'),
})

// use the Precognition handler with the Zod schema
// definePrecognitionEventHandler is used instead of defineEventHandler
export default definePrecognitionEventHandler(todoRequestSchema, async (event) => {
  
    // This handler callback doesn't execute on precognition validation requests!
  
    // perform validation on the input for when the form is directly submitted
    const validated = await getValidatedInput(event, todoRequestSchema)

    // continue and do something with the body
    // ...
    // ...
  })
```

### The getValidatedInput() utlity function
The `getValidatedInput` utility function provides a simple, one-liner function call for validating your input. This function is a wrapper around H3's [`readValidatedBody`](https://h3.unjs.io/examples/validate-data#validate-body) to make it easier to reuse your same Zod validation object as in your precognition request handling.

This utility function is automatically imported by Nuxt.

```
getValidatedInput(event, validationSchema)
```

#### Parameters:

* **event** - the H3 event being processed by your event handler
 * **validationSchema** - The Zod validation schema, which you would probably want to be the same schema as used by your `definePrecognitionEventHandler`

#### Returns:
a promise which will resolve to an object of your validated form data. You can `await` this function call to get the form data directly. 

#### Throws: 
A [Nuxt Error Object](https://nuxt.com/docs/api/utils/create-error) with validation error information. You can allow this error to be thrown, which will then be received by the `usePrecogntionForm` or `useForm` composables to update your validation error state. Alternatively, you may decide to catch the error and handle it.


### Example:
```ts
export default defineEventHandler(async (event) => {
  // get the validated form data or throw an exception back to our form
  const validated = await getValidatedInput(event, todoRequestSchema)

  // continue and do something with the form data
  // ...
  // ...
})
```


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@gearbox-solutions/nuxt-precognition/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@gearbox-solutions/nuxt-precognition

[npm-downloads-src]: https://img.shields.io/npm/dm/@gearbox-solutions/nuxt-precognition.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@gearbox-solutions/nuxt-precognition

[license-src]: https://img.shields.io/npm/l/@gearbox-solutions/nuxt-precognition.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@gearbox-solutions/nuxt-precognition

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
