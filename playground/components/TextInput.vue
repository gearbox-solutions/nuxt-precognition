<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <input
    v-model="model"
    class="bg-gray-900 px-4 py-2 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
</template>
