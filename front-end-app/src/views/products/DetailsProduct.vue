<template>
  <AppBar />

  <!-- Navigation Actions -->
  <div class="m-8 flex items-center gap-4">
    <a @click.prevent="goBack" href="#" class="text-xl hover:underline">&lt; Kembali</a>
    <button @click="exportPdf" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      📄 Export ke PDF
    </button>
  </div>

  <!-- Main Content Wrapper -->
  <div class="min-h-screen p-4 bg-white max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

    <!-- Left Panel: Image, Star, Tags, Stats, Creator -->
    <div class="w-full lg:w-1/2 relative">
      <img :src="baseServerUrl + product.image" alt="Product Image"
           class="rounded-xl object-cover w-full h-[300px] md:h-[400px] lg:h-[450px] shadow-md" />

      <button @click="toggleStar" :disabled="starLoading"
              class="absolute top-4 right-4 text-yellow-400 text-3xl hover:text-yellow-500 transition disabled:opacity-50"
              :title="isStarred ? 'Unstar product' : 'Star product'">
        <i :class="isStarred ? 'fas fa-star' : 'far fa-star'"></i>
      </button>

      <div class="mt-4 flex flex-wrap gap-2">
        <span v-for="(tag, idx) in product.tags || []" :key="idx"
              class="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
          {{ tag }}
        </span>
      </div>

      <div class="mt-4 flex justify-between items-center text-gray-600 text-sm font-medium">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <i class="fa fa-eye text-orange-500"></i>
            {{ product.views || 0 }}
          </div>
          <div class="flex items-center gap-2">
            <i class="fa fa-star text-yellow-400"></i>
            {{ product.stars || 0 }}
          </div>
        </div>
        <div v-if="product.isVerified" class="text-green-600 font-semibold flex items-center gap-2">
          <i class="fa fa-check-circle"></i>
          Terverifikasi Ahli
        </div>
      </div>

      <div v-if="product.createdBy" class="mt-4 text-sm text-gray-700">
        Dibuat Oleh: {{ product.createdBy.username }}
      </div>
    </div>

    <!-- Right Panel: Title, Details, Stats Controls -->
    <div class="w-full lg:w-1/2 text-gray-800" v-if="product.title">
      <div class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl md:text-4xl font-bold text-orange-600 mb-6">
          {{ product.title }}
        </h1>

        <div class="mb-6 space-y-4 text-base md:text-lg">
          <p>
            <span class="font-semibold">Harga Jual:</span>
            Rp {{ product.estimatedSellingPrice?.toLocaleString('id-ID') || '-' }}
          </p>
          <p>
            <span class="font-semibold">Hasil per Produksi:</span>
            {{ product.productionYield || '-' }} unit
          </p>
          <p>
            <span class="font-semibold">Modal (per produksi):</span>
            Rp {{ product.capital?.toLocaleString('id-ID') || '-' }}
          </p>
          <p>
            <span class="font-semibold">Modal Awal:</span>
            Rp {{ initialCapital.toLocaleString('id-ID') }}
          </p>
        </div>

        <ProductStats v-model:price="localPrice" v-model:target="localTarget" :product="product"
                      :initial-capital="initialCapital" />
      </div>
    </div>

  </div>

  <!-- Sections: Steps, Tips, Ingredients, Packing, Tools -->
  <div class="max-w-7xl mx-auto px-4 space-y-6">
    <section v-if="product.steps?.length">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 border-b border-orange-300 pb-1">
        Langkah Pembuatan
        <span class="text-gray-500 italic block sm:inline ml-2">Per 1 kali Produksi</span>
      </h2>
      <ol class="list-decimal list-inside space-y-2 text-gray-700 marker:text-black">
        <li v-for="step in product.steps" :key="step" class="p-2 text-justify">
          {{ step }}
        </li>
      </ol>
    </section>

    <section v-if="product.tips?.length">
      <h2 class="text-2xl font-semibold mb-3 border-b border-orange-300 pb-1">Tips</h2>
      <ol class="list-decimal list-inside space-y-2 text-gray-700 marker:text-black">
        <li v-for="tip in product.tips" :key="tip" class="p-2 text-justify">
          {{ tip }}
        </li>
      </ol>
    </section>

    <section v-if="product.ingredients?.length">
      <div class="flex justify-between items-center mb-4 border-b border-orange-300 pb-1">
        <h2 class="text-2xl font-semibold">Bahan</h2>
        <h2 class="text-lg text-orange-500 font-semibold">
          Total: Rp {{ totalIngredientsCost.toLocaleString('id-ID') }}
        </h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ItemCard v-for="(it, i) in product.ingredients" :key="i" :item="it" />
      </div>
    </section>

    <section v-if="product.packaging?.length">
      <div class="flex justify-between items-center mb-4 border-b border-orange-300 pb-1">
        <h2 class="text-2xl font-semibold">Packing</h2>
        <h2 class="text-lg text-orange-500 font-semibold">
          Total: Rp {{ totalPackagingCost.toLocaleString('id-ID') }}
        </h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ItemCard v-for="(it, i) in product.packaging" :key="i" :item="it" />
      </div>
    </section>

    <section v-if="product.tools?.length">
      <div class="flex justify-between items-center mb-4 border-b border-orange-300 pb-1">
        <h2 class="text-2xl font-semibold">Peralatan</h2>
        <h2 class="text-lg text-orange-500 font-semibold">
          Total: Rp {{ totalToolsCost.toLocaleString('id-ID') }}
        </h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ItemCard v-for="(it, i) in product.tools" :key="i" :item="it" />
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-4 border-b border-orange-300 pb-1">Related Products</h2>
      <div class="text-gray-500 italic">[Related products will be displayed here]</div>
    </section>
  </div>

  <!-- Loading & Error Overlays -->
  <div v-if="loading"
       class="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center text-orange-600 font-semibold text-xl">
    Loading...
  </div>
  <div v-if="error"
       class="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center text-red-600 font-semibold text-xl">
    {{ error }}
  </div>

  <FooterApp />

  <!-- PDF Teleport -->
  <teleport to="body">
    <div id="pdf-offscreen" class="absolute -top-[9999px] -left-[9999px] opacity-0">
      <ProductPdf ref="pdfRef" :business-name="businessName" :product="product" :stats="{
        initialCapital,
        capitalPerDay,
        capitalPerMonth,
        profitPerDay,
        profitPerMonth,
        batchesPerDay,
        revenuePerDay,
        paybackPeriod
      }" :price="localPrice" :target="localTarget" />
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import AppBar from '@/components/global/AppBar.vue'
import FooterApp from '@/components/global/FooterApp.vue'
import ItemCard from '@/components/products/ItemCard.vue'
import ProductStats from '@/components/products/ProductStats.vue'
import ProductPdf from '@/components/pdf/EstimasiProductPdf.vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import { useRoute, } from 'vue-router'

// Route, Router, Auth
const route = useRoute()
const authStore = useAuthStore()

// Reactive state
const product = ref({})
const localPrice = ref(0)
const localTarget = ref(0)
const loading = ref(true)
const error = ref('')
const isStarred = ref(false)
const starLoading = ref(false)
const userId = ref('')

// Base URLs
const baseServerUrl = import.meta.env.VITE_SERVER_BASE_URL
const baseProductsUrl = import.meta.env.VITE_PRODUCTS_BASE_URL
const baseUsersUrl = import.meta.env.VITE_USER_BASE_URL

// Computed costs
const totalIngredientsCost = computed(() =>
  (product.value.ingredients || [])
    .reduce((sum, { item, qty }) => sum + (item?.price || 0) * qty, 0)
)
const totalPackagingCost = computed(() =>
  (product.value.packaging || [])
    .reduce((sum, { item, qty }) => sum + (item?.price || 0) * qty, 0)
)
const totalToolsCost = computed(() =>
  (product.value.tools || [])
    .reduce((sum, { item, qty }) => sum + (item?.price || 0) * qty, 0)
)
const initialCapital = computed(
  () => totalIngredientsCost.value + totalPackagingCost.value + totalToolsCost.value
)

// Computed PDF stats
const batchesPerDay = computed(() => Math.ceil(localTarget.value / (product.value.productionYield || 1)))
const capitalPerDay = computed(() => batchesPerDay.value * (product.value.capital || 0))
const capitalPerMonth = computed(() => capitalPerDay.value * 30)
const revenuePerDay = computed(() => localPrice.value * localTarget.value)
const profitPerDay = computed(() => revenuePerDay.value - capitalPerDay.value)
const profitPerMonth = computed(() => profitPerDay.value * 30)
const paybackDays = computed(() => (profitPerDay.value <= 0 ? Infinity : Math.ceil(initialCapital.value / profitPerDay.value)))
const paybackPeriod = computed(() => {
  const d = paybackDays.value
  if (!isFinite(d)) return '–'
  if (d <= 30) return `${d} hari`
  const m = Math.floor(d / 30), rd = d % 30
  if (m <= 12) return rd ? `${m} bulan ${rd} hari` : `${m} bulan`
  const y = Math.floor(m / 12), rm = m % 12
  return rm ? `${y} tahun ${rm} bulan` : `${y} tahun`
})

// Fetch product and starred
async function fetchProduct(id) {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(`${baseProductsUrl}/${id}`)
    product.value = res.data.data
    localPrice.value = product.value.estimatedSellingPrice || 0
    localTarget.value = product.value.dailySalesTarget || 0
    await checkIfStarred(id)
  } catch (e) {
    error.value = e.response?.data?.message || e.message
  } finally {
    loading.value = false
  }
}
async function checkIfStarred(prodId) {
  if (!userId.value) return
  try {
    const res = await axios.get(`${baseUsersUrl}/${userId.value}/starred/${prodId}`, { withCredentials: true })
    isStarred.value = res.data.data.isStarred
  } catch (err) {
    if (err.response?.status === 404) isStarred.value = false
  }
}
async function toggleStar() {
  if (starLoading.value) return
  starLoading.value = true
  const pid = route.params.id
  try {
    if (!isStarred.value) {
      await axios.post(`${baseUsersUrl}/${userId.value}/starred`, { productId: pid }, { withCredentials: true })
      product.value.stars = (product.value.stars || 0) + 1
      isStarred.value = true
    } else {
      await axios.delete(`${baseUsersUrl}/${userId.value}/starred/${pid}`, { withCredentials: true })
      product.value.stars = Math.max((product.value.stars || 1) - 1, 0)
      isStarred.value = false
    }
  } finally {
    starLoading.value = false
  }
}

// Export PDF action
const pdfRef = ref(null)
function exportPdf() {
  nextTick(() => {
    pdfRef.value?.downloadPdf()
  })
}

// Navigation
function goBack() {
  window.location.href = '/products/search'
}

// Watch and Mount
watch(() => route.params.id, id => id && fetchProduct(id), { immediate: true })

onMounted(async () => {
  await authStore.fetchCurrentUser()
  userId.value = authStore.user?._id || ''
  if (route.params.id) await fetchProduct(route.params.id)
})
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
</style>
