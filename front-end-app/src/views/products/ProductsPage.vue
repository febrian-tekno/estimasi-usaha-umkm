<template>
  <AppBar />

  <section class="p-6 py-8 min-h-[100vh]" >
    <div class="mx-auto max-w-5xl ">
      <h2 class="text-3xl font-semibold text-gray-800 mb-4 text-center">Cari Produk</h2>
      <div class="flex">
        <button
          @click="showFilter = !showFilter"
          class="flex items-center text-white gap-2 px-4 py-2 border bg-blue-500 rounded-md m-2 hover:bg-blue-600"
        >
          <template v-if="!showFilter" >
            <SlidersHorizontal class="w-5 h-5" />
            <span>Filter</span>
          </template>
          <template v-else>
            <X class="w-5 h-5" />
            <span>Tutup</span>
          </template>
        </button>

        <SearchBarProducts />
      </div>

      <ProductsFilter v-if="showFilter" />
    </div>

    <h2 class="text-3xl font-semibold text-gray-800 m -4 text-left mt-12">Produk List:</h2>

    <div class="w-full max-w-7xl mx-auto">
      <IndikatorLoading v-if="loading" :text="'fetch data produk...'" />
      <ErrorMessage v-else-if="error" :text="errorRes" />
      <div v-else>

        <ProductsList :products="products" />

        <PaginationProducts
          :currentPage="searchStore.page"
          :totalPages="totalPages"
          @update:page="onChangePage"
        />
      </div>
    </div>
  </section>
  <section class="bg-gray-50 py-16 mt-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
      Belum menemukan estimasi produk yang cocok?
    </h2>
    <p class="text-gray-600 mb-6 text-sm sm:text-base">
      Tenang, kamu bisa coba buat estimasi produkmu sendiri sesuai kebutuhan dan ide kamu.
    </p>
    <router-link to="/products/add" class="inline-block">
      <button class="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-xl transition duration-300 shadow-md">
        Buat Estimasi Produk
      </button>
    </router-link>
  </div>
</section>

  <FooterApp />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { SlidersHorizontal, X } from 'lucide-vue-next'

import AppBar from '@/components/global/AppBar.vue'
import FooterApp from '@/components/global/FooterApp.vue'
import SearchBarProducts from '@/components/products/SearchBarProducts.vue'
import ProductsFilter from '@/components/products/ProductsFilter.vue'
import IndikatorLoading from '@/components/global/IndikatorLoading.vue'
import ErrorMessage from '@/components/etc/ErrorMessage.vue'
import ProductsList from '@/components/products/ProductsList.vue'
import PaginationProducts from '@/components/products/PaginationProducts.vue'
import { useSearchStore } from '@/stores/search.js'

const searchStore = useSearchStore()
const totalPages = ref(1)
const products = ref([])
const loading = ref(false)
const showFilter = ref(false)
const error = ref(false)
const errorRes = ref('')

const baseProductsUrl = import.meta.env.VITE_PRODUCTS_BASE_URL

async function fetchProducts(query) {
  loading.value = true
  try {
    const response = await axios.get(`${baseProductsUrl}?${query}`, {
      withCredentials: true,
    })
    const result = response.data.data
    products.value = result.products
    totalPages.value = result.totalPages || 1
    error.value = false
  } catch (err) {
    error.value = true
    errorRes.value = err.response?.data?.message || err.message || 'Terjadi kesalahan'
  } finally {
    loading.value = false
  }
}

// Watch queryParams untuk fetch ulang data saat berubah
watch(
  () => searchStore.queryParams,
  (newQuery) => {
    fetchProducts(newQuery)
  },
  { immediate: true }
)

function onChangePage(newPage) {
  searchStore.updatePage(newPage)
}

onMounted(() => {
  fetchProducts(searchStore.queryParams)
})
</script>
