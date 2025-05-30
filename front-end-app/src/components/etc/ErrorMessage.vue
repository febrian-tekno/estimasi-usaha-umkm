<template>
  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong class="font-bold">Error:</strong>
    <p class="block sm:inline">  {{ text }}  </p>
  </div>
</template>

<script setup>

const props = defineProps({
  text: {
    type: String,
    default: 'Gagal mengambil data.'
  }
});
</script>
