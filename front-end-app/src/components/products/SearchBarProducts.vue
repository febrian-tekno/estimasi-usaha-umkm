<template>
  <div class="flex justify-center w-full">
    <div class="relative w-full max-w-5xl flex items-center gap-2">
      <input
        ref="inputRef"
        v-model="search"
        type="text"
        placeholder="Cari Produk.."
        @keyup.enter="onSearch"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300 pr-10"
      />
      <!-- Tombol X -->
      <button
        v-if="search"
        @click="clearSearch"
        class="absolute right-24 text-gray-400 hover:text-gray-600"
      >
        &times;
      </button>

      <!-- Tombol Cari -->
      <button
        @click="onSearch"
        class="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
      >
        Cari
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSearchStore } from '@/stores/search'
import { useRouter } from 'vue-router'

const search = ref('')
const inputRef = ref(null)

const store = useSearchStore()
const router = useRouter()

function onSearch() {
  store.updateKeyword(search.value)
  router.push(
    search.value.trim()
      ? `/products/search?q=${encodeURIComponent(search.value)}`
      : `/products/search`
  )
}


function clearSearch() {
  search.value = ''
  store.updateKeyword('')
  inputRef.value?.focus()
}
</script>
