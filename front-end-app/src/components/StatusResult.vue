<template>
  <div class="text-center space-y-3">
    <img
      :src="status === 'success' ? successIcon : failedIcon"
      alt="Status Icon"
      class="mx-auto w-24 md:w-28"
    />
    <h2 :class="['text-2xl font-bold', status === 'success' ? 'text-green-600' : 'text-red-600']">
      {{ title }}
    </h2>
    <p class="text-gray-700">{{ description }}</p>
    <a :href="linkHref" class="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded inline-block">
      {{ buttonText }}
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  status: { type: String, required: true }, // 'success' atau 'failed'
  title: { type: String, required: true },
  description: { type: String, required: true },
  linkHref: { type: String, required: true },
  buttonText: { type: String, required: true }
});

const successIcon = 'https://img.icons8.com/?size=100&id=yXOHowNYbgM5&format=png&color=000000';
const failedIcon = 'https://img.icons8.com/?size=100&id=64164&format=png&color=000000';
</script>
