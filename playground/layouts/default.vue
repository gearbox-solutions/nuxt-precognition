<script setup lang="ts">
</script>

<template>
  <div>
    <div class="bg-gray-900 px-8 py-4 ">
      <NuxtLink to="/">
        Home
      </NuxtLink>
    </div>
    <div class="px-8 py-4">
      <slot />
    </div>
  </div>
</template>
