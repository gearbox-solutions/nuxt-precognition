<script setup lang="ts">
const entries = ref([]);
const form = useForm({
  email: "",
  age: null,
});

const submitForm = async () => {
  await form.post("/api/register", {
    onSuccess: (response) => {
      entries.value.push(response._data);
    },
  });
};
</script>

<template>
  <div>
    <div class="flex gap-x-8">
      <form class="space-y-4" @submit.prevent="submitForm">
        <LabeledInput
          id="email"
          v-model="form.email"
          label="Email"
          type="text"
          name="email"
          :errors="form.errors.email"
        />
        <LabeledInput id="age" v-model.number="form.age" label="Age" type="text" name="age" :errors="form.errors.age" />

        <div>
          <ButtonPrimary :disabled="form.processing"> Submit </ButtonPrimary>
        </div>
      </form>
      <pre>{{ form }}</pre>
    </div>
    <div class="pt-12">
      <pre />
      <div class="text-lg font-bold uppercase">Registered Users</div>
      <div v-for="(entry, index) in entries" :key="index">
        {{ entry.email }}
      </div>
    </div>
  </div>
</template>
