

# Nuxt Precognition

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt Precognition is a "precognition" utility for sharing server-side validation with your front-end. This is inspired by [Laravel Precognition](https://laravel.com/docs/11.x/precognition) and helps you provide a good user validation experience, while also helping to make the Nuxt form submission and validation process as smooth as possible.

[🏀 Online playground](https://stackblitz.com/github/gearbox-solutions/nuxt-precognition?file=playground%2Fapp.vue)

## Features

- Convenient form submission and validation with `useForm` and `usePrecognitionForm` composables 
- Server-side validation of form data before the actual form submission with `definePrecognitionEventHandler` Nuxt server middleware

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-precognition
```

That's it! You can now use Nuxt Precognition in your Nuxt app ✨

## Usage

### The usePrecognitionForm Vue Composable

The `usePrecogitionForm` composable is the core feature for setting up the precognition workflow. This composable extends the `useForm` composable (described below)and provides a more robust form submission and validation workflow when used in conjunction with the `handlePrecognitionRequest` server middleware.

The `useProecognitionForm` composable is automatically imported into your Nuxt app when you install the module, and can be used without needing to manually import it.

This composable is used to create your form object and with handle form submission and validation. It is stateful, and will provide you with the form states and errors for you to nicely display validation and submission state in your components.

Here is an example of using the `usePrecognitionForm` composable to create a form object and handle form submission and validation:

```vue
<script setup lang="ts">
// const form = useForm({
//   description: '',
// })

const entries = ref([])

const form = usePrecognitionForm('post', '/api/todo-precog', {
  description: '',
})

const submitForm = async () => {
  await form.submit({
    onSuccess: (response) => {
      entries.value.push(response._data)
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
            Description
          </label>
          <input
            id="description"
            v-model="form.description"
            type="text"
            name="description"
            @change="form.validate('description')"
          />
          <div
            v-for="error in form.errors.description"
            :key="error"
            class="text-red-500"
          >
            {{ error }}
          </div>
        </div>

        <div>
          <button :disabled="form.processing">
            Submit
          </buttonprimary>
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

### The useForm Vue Composable
 The `useForm` Vue composable provides a convenient way to handle form submission and validation errors in your Nuxt app. A form created through the `useForm` composable provide your form submissions with a number of useful features:
 - Lifecycle Hooks
    - `onBefore` - 
    - `onStart` -
    - `onSuccess` - 
    - `onError` - 
    - `onFinish` -
 - Form State
   - `isDirty`
   - `hasErrors`
   - `processing`
   - `wasSuccessful`
   - `recentlySuccessful`
   
This form is based on the [`useForm` composable from Inertia.js](https://inertiajs.com/forms#form-helper) and generally implements the same API and can be used in the same way. [The documentation for the `useForm` composable](https://inertiajs.com/forms#form-helper) should be consulted for details on how to use the form.

This composable is automatically imported into your Nuxt app when you install the module, and can be used without needing to manually import it.

The useForm composable can be used without the precognition middleware, and is just a convenient way to handle form submission and validation errors in your Nuxt app in general.

Here is an example of using the form to submit a Todo item to an API endpoint:
```vue
<script setup lang="ts">
const entries = ref([])
const form = useForm({
  description: '',
})

const submitForm = async () => {
  await form.post('/api/todo', {
    onSuccess: (response) => {
      entries.value.push(response._data)
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
          <label for="description">Description</label>
          <input
            id="description"
            v-model="form.description"
            label="Description"
            type="text"
            name="description"
            :errors="form.errors.description"
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
      <pre />
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

### The handlePrecognitionRequest Server Utility / Middleware

The `handlePrecognitionRequest` server middleware is a server-side middleware that can be used to handle form submissions and validation errors in your Nuxt app. It is designed to work with the `usePrecognitionForm` composable, and will validate the data submitted by that form, and will return validation results before it reaches the main part of your handler.

> [!Note]  
> Your main handler code will not run on a precognition validation request, even though it will be posting to the same endpoint

Validation is configured using a [Zod Object](https://zod.dev/?id=objects) which should be designed to handle the fields in your form subimssion.

Your Nuxt server routes should return a default `definePrecognitionEventHandler` instead of the usual `defineEventHandler`. This new handler takes a Zod object as its first parameter, and then the second parameter is your regular event handler function definition. 

This new handler type is automatically imported by Nuxt when the module is installed, and does not need to be manually imported.

Example Todo API endpoint handler:
```ts
import { z } from 'zod'

// define the Zod object for validation
const todoRequestSchema = z.object({
  description: z.string().trim().min(1, 'Description is required'),
})

// use the Precognition handler with the Zod schema
export default definePrecognitionEventHandler(todoRequestSchema, async (event) => {
    const validated = await getValidatedInput(event, todoRequestSchema)

    // do something with the body
    const newTodo = {
      id: 1,
      description: validated.description,
    }

    // simulate a slow response to show the loading state on the front-end
    await sleep(1000)

    return newTodo
  })

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

```


###


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
[npm-version-src]: https://img.shields.io/npm/v/nuxt-precognition/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-precognition

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-precognition.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-precognition

[license-src]: https://img.shields.io/npm/l/nuxt-precognition.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-precognition

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
