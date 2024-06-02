<script setup lang="ts">
console.log(useForm)
const form = useForm({
  description: '',
})

const submitForm = async () => {
  form.post('/api/todo')
}
</script>

<template>
  <div>
    <pre>{{ form }}</pre>
    <form
      class="space-y-4"
      @submit.prevent="submitForm"
    >
      <div class="space-x-4">
        <LabeledInput
          id="description"
          v-model="form.description"
          label="Description"
          type="text"
          name="description"
          :errors="form.errors.description"
        />
      </div>

      <div>
        <ButtonPrimary :disabled="form.processing">
          Submit
        </buttonprimary>
      </div>
    </form>
  </div>
</template>
