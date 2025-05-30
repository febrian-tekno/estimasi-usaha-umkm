<template>
  <form class="w-full space-y-4" @submit.prevent="handleSubmit">
    <div class="w-full text-left space-y-2 mb-4">
      <h2 class="text-3xl font-bold">{{ title }}</h2>
      <p class="text-gray-600 text-sm leading-relaxed" v-html="description"></p>
    </div>

    <label class="block text-sm text-gray-700">Email:</label>
    <input
      v-model="localEmail"
      type="email"
      placeholder="Email"
      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
      :class="{ 'border-red-500': localEmail && !isEmailValid }"
      required
    />
    <p v-if="localEmail && !isEmailValid" class="text-red-500 text-xs mt-1">Invalid email format</p>

    <AppButton
      :text="buttonText"
      color="yellow"
      :loading="loading"
      :disabled="!isEmailValid || loading"
    />
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import AppButton from '../global/AppButton.vue';

const props = defineProps({
  title: String,
  description: String,
  buttonText: String,
  email: String,
  loading: Boolean,
});

const emit = defineEmits(['update:email', 'submit']);

const localEmail = ref(props.email || '');

const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localEmail.value));

// Sync localEmail ke parent via v-model:email
watch(localEmail, (val) => {
  emit('update:email', val);
});

const handleSubmit = () => {
  if (!isEmailValid.value) return;
  emit('submit');
};
</script>
