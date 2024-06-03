

# Nuxt Precognition

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Laravel-inspired precognition module for Nuxt.js

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-precognition?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- Convenient form submission and validation with `useForm` composable
- '[Precognition](https://laravel.com/docs/11.x/precognition)'-style form validation of form data before form submission with `handlePrecognitionRequest` server middleware
- 
- 

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-precognition
```

That's it! You can now use Nuxt Precognition in your Nuxt app ✨

## Usage

### `useForm`
 The `useForm` composable provides a convenient way to handle form submission and validation errors in your Nuxt app. A form created through the `useForm` composable provide your form submissions with a number of useful features:
 - Lifecycle Hooks
    - `onBefore` - 
    - `onStart` -
    - `onProgress` - 
    - `onSuccess` - 
    - `onError` - 
    - `onCacnel` -
    - `onFinish` -
 - Form State
   - `isDirty`
   - `hasErrors`
   - `processing`
   - `wasSuccessful`
   - `recentlySuccessful`


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
