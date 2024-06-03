<script setup lang="ts">
// const form = useForm({
//   description: '',
// })
const entries = ref([])

const form = usePrecognitiveForm('post', '/api/todo-precog', {
  description: '',
  age: 10,
})

const submitForm = async () => {
  await form.post('/api/todo-precog', {
    onSuccess: response => entries.value.push(response._data),
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
        <div class="">
          <LabeledInput
            id="description"
            v-model="form.description"
            label="Description"
            type="text"
            name="description"
            :errors="form.errors.description"
            @change="form.validate('description')"
          />
        </div>
        <div class="">
          <LabeledInput
            id="age"
            v-model.number="form.age"
            label="Age"
            type="text"
            name="age"
            :errors="form.errors.age"
            @change="form.validate('age')"
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
