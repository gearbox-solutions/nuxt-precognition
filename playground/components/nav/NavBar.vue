<script setup lang="ts">
import ContentWidthContainer from "~/components/ContentWidthContainer.vue";

</script>

<template>
  <div class="bg-gray-900">
    <ContentWidthContainer>
      <div class="flex justify-between">
        <div class="flex">
          <NuxtLink href="/" class="px-4 py-2 hover:bg-gray-800">Home</NuxtLink>

          <NuxtLink href="/todo" class="px-4 py-2 hover:bg-gray-800">ToDo</NuxtLink>
        </div>
      </div>
    </ContentWidthContainer>
  </div>
</template>
