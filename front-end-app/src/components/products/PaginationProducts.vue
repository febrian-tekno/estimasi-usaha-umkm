<template>
  <nav class="flex justify-center items-center gap-2 mt-6">
    <button
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)"
      class="px-3 py-1 rounded border hover:bg-gray-200 disabled:opacity-50"
    >
      Prev
    </button>

    <button
      v-for="page in pagesToShow"
      :key="page"
      @click="$emit('update:page', page)"
      :class="['px-3 py-1 rounded border', currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-200']"
    >
      {{ page }}
    </button>

    <button
      :disabled="currentPage === totalPages"
      @click="$emit('update:page', currentPage + 1)"
      class="px-3 py-1 rounded border hover:bg-gray-200 disabled:opacity-50"
    >
      Next
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
});

// Logika untuk menampilkan maksimal 5 halaman di tengah
const pagesToShow = computed(() => {
  const total = props.totalPages;
  const current = props.currentPage;
  let start = Math.max(current - 2, 1);
  let end = Math.min(start + 4, total);

  // Jika range kurang dari 5, geser start
  start = Math.max(end - 4, 1);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
</script>
