<script setup lang="ts">
const form = usePrecognitionForm("post", "/api/register-precog", {
  name: "",
  email: "",
  age: null,
});

const { data: registrations, refresh } = await useFetch("/api/registrations");

const submitForm = async () => {
  await form.submit({
    onSuccess: () => {
      refresh();
    },
  });
};
</script>

<template>
  <div>
    <div class="flex gap-x-8">
      <form class="space-y-4" @submit.prevent="submitForm">
        <LabeledInput
          id="name"
          v-model="form.name"
          label="Name"
          type="text"
          name="name"
          :errors="form.errors.name"
          @change="form.validate('name')"
        />
        <LabeledInput
          id="email"
          v-model="form.email"
          label="Email"
          type="text"
          name="email"
          :errors="form.errors.email"
          @change="form.validate('email')"
        />
        <LabeledInput
          id="age"
          v-model.number="form.age"
          label="Age"
          type="text"
          name="age"
          :errors="form.errors.age"
          @change="form.validate('age')"
        />

        <div>
          <ButtonPrimary :disabled="form.processing || form.hasErrors"> Submit </ButtonPrimary>
        </div>
      </form>
      <pre>{{ form }}</pre>
    </div>
    <div class="pt-12">
      <div class="text-lg font-bold uppercase">Registrations</div>
      <div v-for="registration in registrations" :key="registration.id" class="flex gap-x-4">
        <div class="w-56">{{ registration.name }}</div>
        <div>{{ registration.email }}</div>
      </div>
    </div>
  </div>
</template>
