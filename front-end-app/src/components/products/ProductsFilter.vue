<template>
  <section class="bg-white p-6 mb-12 rounded-xl shadow-md max-w-5xl mx-auto space-y-8 ">

    <!-- Baris 1: Dropdown Urutkan + Modal + Filter -->
    <div class="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-center justify-between">

      <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-wrap">

        <!-- Dropdown Urutkan -->
        <div class="flex flex-col w-full sm:w-48">
          <label for="sort" class="text-sm font-semibold text-gray-700 mb-1">Urutkan Berdasarkan</label>
          <select
            id="sort"
            v-model="tempSortBy"
            class="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition w-full"
          >
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Dropdown Maksimal Modal -->
        <div class="flex flex-col w-full sm:w-48">
          <label for="maxCapital" class="text-sm font-semibold text-gray-700 mb-1">Maksimal Modal</label>
          <select
            id="maxCapital"
            v-model="tempMaxCapital"
            class="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition w-full"
          >
            <option :value="''">Semua</option>
            <option v-for="value in maxCapitalOptions" :key="value" :value="value">
              {{ formatRupiah(value) }}
            </option>
          </select>
        </div>

      </div>

      <!-- Tombol Terapkan Filter -->
      <div class="w-full sm:w-auto mt-2 sm:mt-6">
        <button
          @click="applyFilter"
          class="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-medium w-full sm:w-auto"
        >
          Terapkan Filter
        </button>
      </div>

    </div>

    <!-- Baris 2: Kategori + ASC DESC -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex gap-3 flex-wrap max-w-full">
        <button
          v-for="cat in categories"
          :key="cat.value"
          @click="selectCategory(cat.value)"
          :class="[
            'flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition whitespace-nowrap',
            searchStore.filters.category === cat.value
              ? 'bg-orange-500 text-white border-orange-500'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          ]"
        >
          <img v-if="cat.icon" :src="cat.icon" alt="icon" class="w-5 h-5 object-contain" />
          <span>{{ cat.label }}</span>
        </button>
      </div>
      <!-- Tombol Sort Order Toggle -->
      <div class="ml-auto shrink-0">
        <button
          @click="toggleSortOrder"
          class="flex items-center gap-2 px-4 py-2 border rounded-lg transition border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <img
            :src="searchStore.sortOrder === 'desc'
              ? 'https://img.icons8.com/ios-filled/24/sort-down.png'
              : 'https://img.icons8.com/ios-filled/24/sort-up.png'"
            alt="sort"
            class="w-4 h-4"
          />
          <span>{{ searchStore.sortOrder === 'desc' ? 'Terbaru' : 'Terlama' }}</span>
        </button>
      </div>

    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()

// Temp value buat dropdown, baru simpan ke pinia saat tombol di klik
const tempSortBy = ref(searchStore.sortBy)
const tempMaxCapital = ref(searchStore.filters.maxCapital || '')

const sortOptions = [
  { label: 'Default', value: '' },
  { label: 'Laba Tertinggi', value: 'profit' },
  { label: 'Modal Terendah', value: 'capital' },
  { label: 'Paling Populer', value: 'popularity' },
]

const maxCapitalOptions = [100000, 200000, 500000, 1000000]

const categories = [
  { label: 'Semua', value: '', icon: 'https://img.icons8.com/ios-filled/50/menu.png' },
  { label: 'Makanan', value: 'food', icon: 'https://img.icons8.com/ios-filled/50/meal.png' },
  { label: 'Minuman', value: 'drink', icon: 'https://img.icons8.com/ios-filled/50/cocktail.png' },
]

function selectCategory(value) {
  searchStore.updateFilter('category', value)
}

function toggleSortOrder() {
  searchStore.updateSortOrder(
    searchStore.sortOrder === 'desc' ? 'asc' : 'desc'
  )
}

function applyFilter() {
  searchStore.updateSort(tempSortBy.value)
  searchStore.updateFilter('maxCapital', tempMaxCapital.value)
}

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}
</script>
