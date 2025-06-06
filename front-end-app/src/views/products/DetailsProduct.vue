<template>
  <AppBar />

  <div class="m-8">
    <a @click.prevent="goBack" href="#" class="text-xl hover:underline">< Kembali</a>
  </div>
  <!-- Detail Produk -->
  <div class="min-h-screen p-4 bg-white max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
    <!-- Gambar & Info -->
    <div class="w-full lg:w-1/2 relative">
      <img
        :src="baseServerUrl + product.image"
        alt="Product Image"
        class="rounded-xl object-cover w-full h-[300px] md:h-[400px] lg:h-[450px] shadow-md"
      />

      <!-- Tombol Star -->
      <button
        @click="toggleStar"
        :disabled="starLoading"
        class="absolute top-4 right-4 text-yellow-400 text-3xl hover:text-yellow-500 transition disabled:opacity-50"
        :title="isStarred ? 'Unstar product' : 'Star product'"
      >
        <i :class="isStarred ? 'fas fa-star' : 'far fa-star'"></i>
      </button>

      <!-- Tags -->
      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="(tag, idx) in product.tags || []"
          :key="idx"
          class="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Statistik -->
      <div class="mt-4 flex justify-between items-center text-gray-600 text-sm font-medium">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <i class="fa fa-eye text-orange-500"></i> {{ product.views || 0 }}
          </div>
          <div class="flex items-center gap-2">
            <i class="fa fa-star text-yellow-400"></i> {{ product.stars || 0 }}
          </div>
        </div>
        <div
          v-if="product.isVerified"
          class="text-green-600 font-semibold flex items-center gap-2"
        >
          <i class="fa fa-check-circle"></i> Terverifikasi Ahli
        </div>
      </div>
      
      <div v-if="product.createdBy" class="mt-4">
        Dibuat Oleh: {{ product.createdBy.username }}
      </div>
    </div>

    <!-- Detail -->
    <div class="w-full lg:w-1/2 text-gray-800" v-if="product.title">
      <div class="max-w-4xl mx-auto p-6">
    <!-- Judul dan info dasar produk -->
    <h1 class="text-3xl md:text-4xl font-bold text-orange-600 mb-6">
      {{ product.title || product.name }}
    </h1>
    <div class="mb-6 space-y-4 text-lg">
      <p>
        <span class="font-semibold">Harga Jual: </span>
        Rp. {{ product.estimatedSellingPrice?.toLocaleString('id-ID') || '-' }}
      </p>
      <p>
        <span class="font-semibold">Hasil per Produksi:</span>
        {{ product.productionYield || '-' }} unit
      </p>

      <p>
        <span class="font-semibold">Modal (per batch):</span>
        Rp. {{ product.capital?.toLocaleString('id-ID') || '-' }}
      </p>
    </div>
    
    <h2 class="text-2xl font-semibold mb-3 border-b border-orange-300 pb-1"></h2>
    <!-- Tampilkan child component untuk statistik -->
    <ProductStats :product="product" />
  </div>
    </div>
  </div>
      
  <!-- langkah pembuatan, Bahan, Packing, Peralatan -->
  <div  class="max-w-7xl mx-auto px-4">
      <section v-if="product.steps?.length" class="mb-6">
              <h2 class="text-2xl font-semibold mb-3 border-b border-orange-300 pb-1">
                Langkah Pembuatan
              </h2>
              <ol class="list-decimal list-inside space-y-2 text-gray-700">
                <li v-for="step in product.steps || []" :key="step">{{ step }}</li>
              </ol>
      </section>
      <section v-if="product.tips?.length" class="mb-6">
         <h2 class="text-2xl font-semibold mb-3 border-b border-orange-300 pb-1">
                Tips
          </h2>
          <ol class="list-decimal list-inside space-y-2 text-gray-700">
              <li v-for="tip in product.tips || []" :key="tip">{{ tip }}</li>
          </ol>
      </section>

    <section v-if="product.ingredients?.length" class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 border-b border-orange-300 pb-1">Bahan</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ItemCard
          v-for="(item, idx) in product.ingredients"
          :key="idx"
          :item="item"
        />
      </div>
    </section>

    <section v-if="product.packaging?.length" class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 border-b border-orange-300 pb-1">Packing</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ItemCard
          v-for="(item, idx) in product.packaging"
          :key="idx"
          :item="item"
        />
      </div>
    </section>

    <section v-if="product.tools?.length" class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 border-b border-orange-300 pb-1">Peralatan</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ItemCard
          v-for="(item, idx) in product.tools"
          :key="idx"
          :item="item"
        />
      </div>
    </section>

    <!-- Related -->
    <section class="mt-10">
      <h2 class="text-2xl font-semibold mb-4 border-b border-orange-300 pb-1">Related Products</h2>
      <div class="text-gray-500 italic">[Related products will be displayed here]</div>
    </section>
  </div>

  <!-- Loading & Error -->
  <div
    v-if="loading"
    class="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center text-orange-600 font-semibold text-xl"
  >
    Loading...
  </div>

  <div
    v-if="error"
    class="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center text-red-600 font-semibold text-xl"
  >
    {{ error }}
  </div>

  <FooterApp />
</template>

<script setup>
import { onMounted, ref, watch, } from 'vue'
import AppBar from '@/components/global/AppBar.vue'
import FooterApp from '@/components/global/FooterApp.vue'
import ItemCard from '@/components/products/ItemCard.vue'
import { useAuthStore } from '@/stores/auth'

import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import ProductStats from '@/components/products/ProductStats.vue'

// --- STATE & REFS ---
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()


const product = ref({})
const loading = ref(true)
const error = ref('')
const isStarred = ref(false)
const starLoading = ref(false) 
const userId = ref('')
const modalIngredients = ref('')
const modalPackages = ref('')
const modalTools = ref('')



const baseServerUrl = import.meta.env.VITE_SERVER_BASE_URL
const baseProductsUrl = import.meta.env.VITE_PRODUCTS_BASE_URL
const baseUsersUrl = import.meta.env.VITE_USER_BASE_URL 


function goBack() {
  router.back()
}



// --- FUNCTION: AMBIL DATA PRODUK ---
async function fetchProduct(id) {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`${baseProductsUrl}/${id}`)
    const data = res.data.data
    product.value = data
    console.log(product.value);

    await checkIfStarred(id)
  } catch (err) {
    error.value = err.response?.data?.message || err.message
  } finally {
    loading.value = false
  }
}

// --- FUNCTION: CEK STATUS STAR ---
async function checkIfStarred(productId) {
  if(userId.value) {
    console.log(userId.value)
  try {
    const res = await axios.get(`${baseUsersUrl}/${userId.value}/starred/${productId}`, {withCredentials: true})
    isStarred.value = res.data.data.isStarred
  } catch (err) {
    if (err.response && err.response.status === 404) {
      isStarred.value = false
    } else {
      console.error('Gagal cek starred:', err)
    }
  }
}}

// --- FUNCTION: TOGGLE STAR (star/unstar) ---
async function toggleStar() {
  if (starLoading.value) return

  starLoading.value = true
  const productId = route.params.id

  try {
    if (!isStarred.value) {
      // Belum di‐star, kirim POST
      // Asumsikan backend butuh body { productId } (sesuaikan kalau perlu)
      await axios.post(`${baseUsersUrl}/${userId.value}/starred`, { productId }, {withCredentials: true})
      isStarred.value = true
      // Tambah count stars di UI (jika product.stars sudah ada)
      product.value.stars = (product.value.stars || 0) + 1
    } else {
      // Sudah di‐star, kirim DELETE
      await axios.delete(`${baseUsersUrl}/${userId.value}/starred/${productId}`, {withCredentials: true})
      isStarred.value = false
      product.value.stars = Math.max((product.value.stars || 1) - 1, 0)
    }
  } catch (err) {
    console.error('Gagal toggle starred:', err)
  } finally {
    starLoading.value = false
  }
}

watch(
  () => route.params.id,
  (id) => {
    if (id) fetchProduct(id)
  },
  { immediate: true }
)
onMounted(async () => {
  await authStore.fetchCurrentUser()
  userId.value = authStore.user?._id
  const productId = route.params.id
  if (productId) fetchProduct(productId)
  if(userId.value) checkIfStarred(productId)
})

</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
</style>
