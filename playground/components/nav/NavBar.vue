<script setup lang="ts">
import ContentWidthContainer from "~/components/ContentWidthContainer.vue";

const route = useRoute();

const activeClasses = (location) => {
  if (location === route.path) {
    return "border-b-4 border-blue-500";
  }

  return "border-b-4 border-transparent";
};

const links = [
  { name: "Home", path: "/" },
  { name: "Register", path: "/register" },
  { name: "Register-Precognition", path: "/register-precog" },
];
</script>

<template>
  <div class="bg-gray-900">
    <ContentWidthContainer>
      <div class="flex justify-between">
        <div class="flex">
          <NuxtLink
            v-for="link in links"
            :key="link.path"
            :href="link.path"
            class="px-4 pb-2 pt-4 hover:bg-gray-800"
            :class="activeClasses(link.path)"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>
    </ContentWidthContainer>
  </div>
</template>
