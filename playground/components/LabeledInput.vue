<script setup lang="ts">
import type { PropType } from 'vue'

const model = defineModel<string | number>()
defineProps({
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  errors: {
    type: Array as PropType<string[]>,
    default: null,
  },
})
defineOptions({
  inheritAttrs: false,
})

defineEmits(['change'])
</script>

<template>
  <div class="space-y-1">
    <label
      :for="id"
      class="block text-sm uppercase"
    >{{ label }}</label>

    <input
      v-bind="$attrs"
      :id="id"
      v-model="model"
      :name="name"
      class="rounded-md px-2 py-1"
      @change="$emit('change')"
    >
    <div
      v-for="error in errors"
      :key="error"
      class="text-red-500"
    >
      {{ error }}
    </div>
  </div>
</template>
