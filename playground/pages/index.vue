<script setup lang="ts">
import TextInput from '~/components/TextInput.vue'
import ButtonPrimary from '~/components/ButtonPrimary.vue'

console.log(useForm)
const form = useForm({
  item: '',
})
</script>

<template>
  <div>
    <form class="space-y-4">
      <div class="space-x-4">
        <label for="username">Item</label>
        <TextInput
          v-model="form.item"
          type="text"
          name="username"
        />
      </div>

      <div>
        <ButtonPrimary>
          Submit
        </buttonprimary>
      </div>
    </form>
  </div>
</template>
