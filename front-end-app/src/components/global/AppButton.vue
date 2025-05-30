<template>
  <button
    :disabled="isDisabled"
    :class="buttonClasses"
  >
    <span v-if="!loading">{{ text }}</span>
    <span v-else class="flex items-center space-x-2">
      <svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4" fill="none" />
        <path
          class="opacity-75"
          fill="white"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span>Loading...</span>
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: String,
  color: {
    type: String,
    default: 'green'
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

// Tombol tidak aktif jika loading atau disabled
const isDisabled = computed(() => props.loading || props.disabled);

// Warna tombol berdasarkan prop
const colorClass = computed(() => {
  switch (props.color) {
    case 'green':
      return 'bg-green-500 hover:bg-green-600';
    case 'blue':
      return 'bg-blue-500 hover:bg-blue-600';
    case 'gray':
      return 'bg-gray-500 hover:bg-gray-600';
    case 'yellow':
      return 'bg-yellow-500 hover:bg-yellow-600';
    default:
      return 'bg-black hover:bg-gray-800';
  }
});

// Style tambahan jika tombol nonaktif
const disabledClass = computed(() =>
  isDisabled.value ? 'opacity-50 cursor-not-allowed' : ''
);

// Gabungan semua class tombol
const buttonClasses = computed(() => [
  'w-full py-2 rounded text-white font-semibold flex justify-center items-center transition',
  colorClass.value,
  disabledClass.value
]);
</script>
