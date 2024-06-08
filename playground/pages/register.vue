<script setup lang="ts">
const form = useForm({
  name: "",
  email: "",
  age: null,
});

const { data: registrations, refresh } = await useFetch("/api/registrations");

const submitForm = async () => {
  await form.post("/api/registrations", {
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
        <LabeledInput id="name" v-model="form.name" label="Name" type="text" name="name" :errors="form.errors.name" />
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
      <div class="text-lg font-bold uppercase">Registrations</div>
      <div v-for="registration in registrations" :key="registration.id" class="flex gap-x-4">
        <div class="w-56">{{ registration.name }}</div>
        <div>{{ registration.email }}</div>
      </div>
    </div>
  </div>
</template>
