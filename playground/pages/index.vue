<script setup lang="ts"></script>

<template>
  <div class="prose prose-invert">
    <h1>Nuxt Precognition Example</h1>
    <p>This is a playground for testing the Nuxt Precognition module.</p>
    <p>There are two different registration form examples which you can try out.</p>
    <h2>Register Form</h2>
    <p>
      The first "Register" is a form which uses the <code>useForm</code> composable. Form data is sent to the server and
      validated upons submission.
    </p>
    <p>
      The useForm composable is used to provide some very convenient lifecycle hooks for the form, as well as nice
      validation and error handling.
    </p>

    <NuxtLink to="/register-form">Register Form</NuxtLink>

    <h2>Register Form with Precognition</h2>

    <p>The second "Register-Precog"is a form which uses the <code>usePrecognitionForm</code> composable.</p>
    <p>
      In addition to the features of the <code>useForm</code> composable, the usePrecognitionForm composable also
      provides a <code>validate</code> method which can be used to validate the form data before the form is submitted.
      This method is called on the @change hook of the inputs to validate as the user is entering data.
    </p>
    <NuxtLink to="/register-precog">Register with Precognition</NuxtLink>
  </div>
</template>
