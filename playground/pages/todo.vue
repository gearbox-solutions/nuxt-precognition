<script setup lang="ts">
const entries = ref([])
const form = useForm({
  description: '',
})

const submitForm = async () => {
  await form.post('/api/todo', {
    onSuccess: (response) => {
      entries.value.push(response._data)
    },
  })
}
</script>

<template>
  <div>
    <div class="flex gap-x-8">
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
      <pre>{{ form }}</pre>
    </div>
    <div class="pt-12">
      <pre />
      <div class="text-lg font-bold uppercase">
        Entries
      </div>
      <div
        v-for="(entry, index) in entries"
        :key="index"
      >
        {{ entry.description }}
      </div>
    </div>
  </div>
</template>
