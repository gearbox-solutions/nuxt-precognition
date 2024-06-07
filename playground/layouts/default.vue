<script setup lang="ts">
import ContentWidthContainer from '~/components/ContentWidthContainer.vue'
import NavBar from '~/components/nav/NavBar.vue'
</script>

<template>
  <div>
    <NavBar />
    <ContentWidthContainer>
      <div
        class="px-4 py-4"
      >
        <slot />
      </div>
    </ContentWidthContainer>
  </div>
</template>
