<template>
  <AppBar />
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-5xl mx-auto">
      <div class="flex justify-between">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <div>
          <a v-if="user && user.role === 'admin'"
            href="/dashboard/admin"
            class="m-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            Dashboard Admin
          </a>
          <LogoutBtn />
        </div>

      </div>

      <!-- Profile Section -->
      <div class="bg-white p-6 rounded-lg shadow flex flex-col items-center gap-4 mb-10">
          <div
          class="relative w-40 h-40 rounded-full overflow-hidden cursor-pointer"
          @mouseenter="hover = true"
          @mouseleave="hover = false"
        >
          <img
            v-if="user && user.picture"
            :src="user.picture"
            alt="User Picture"
            class="relative w-40 h-40 rounded-full overflow-hidden transition duration-300"
            :class="{ 'brightness-50': hover }"
          />
          <img
            v-else
            src="@/assets/images/defaultPictureUser.jpg"
            alt="Default Picture User"
            class="relative w-40 h-40 rounded-full overflow-hidden transition duration-300"
            :class="{ 'brightness-50': hover }"
          />
          
          <!-- Icon pensil muncul kalau hover -->
          <div
            v-if="hover"
            class="absolute inset-0 flex items-center justify-center text-white text-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-10 h-10">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M16.5 3.75a2.121 2.121 0 113 3L7.5 18.75 3 19.5l.75-4.5L16.5 3.75z" />
            </svg>
          </div>
        </div>
        <h2 v-if="user" class="text-2xl font-semibold text-gray-700 text-center">{{ user.username }}</h2>
        <p v-if="user" class="text-gray-500 text-base text-center">{{ user.email }}</p>
        <p v-else class="text-gray-400 text-center">Failed to get user</p>
        <button class="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">Edit Profile</button>
      </div>

      <!-- Edit Profile Section -->
      <div class="bg-white p-4 rounded shadow hover:shadow-md transition mb-10">
        <h3 class="text-lg font-medium text-gray-700 mb-2">Update Profile & Password</h3>
        <p class="text-sm text-gray-500 mb-2">Perbarui nama, foto profil, dan ubah kata sandi Anda.</p>
        <button class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit Profile / Change Password</button>
      </div>

      <!-- Starred Products Section -->
      <div class="bg-white p-6 rounded shadow mb-10">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-700">Starred Products</h3>
          <select v-model="sortOption" class="border rounded px-3 py-1 text-sm">
            <option value="mostViewed">Paling Banyak Dilihat</option>
            <option value="recent">Terbaru Ditambahkan</option>
          </select>
        </div>
         <ProductsList :products="sortedProducts" />
      </div>

      <!-- My Estimate Products Section -->
      <div class="bg-white p-6 rounded shadow mt-12">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-700">Estimasi Produk Saya</h3>
          <select v-model="sortOptionEstimate" class="border rounded px-3 py-1 text-sm">
            <option value="mostViewed">Paling Banyak Dilihat</option>
            <option value="recent">Terbaru Ditambahkan</option>
          </select>
        </div>

        <ProductsList :products="sortedEstimates" />

        <!-- Buat Estimasi Produk Button -->
        <div class="w-full flex justify-center mt-4">
          <a
            href="/products/add"
            class="bg-blue-500 hover:bg-blue-600 text-white text-base px-4 py-2 rounded-lg shadow-md transition duration-200 ease-in-out"
          >
            Buat estimasi produk
          </a>
        </div>
      </div>
    </div>
  </div>
  <FooterApp />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import AppBar from '@/components/global/AppBar.vue'
import FooterApp from '@/components/global/FooterApp.vue'
import LogoutBtn from '@/components/dashboard/logoutBtn.vue'
import ProductsList from '@/components/products/ProductsList.vue'

const baseUserUrl = import.meta.env.VITE_USER_BASE_URL
const baseProductUrl = import.meta.env.VITE_PRODUCTS_BASE_URL

const authStore = useAuthStore()

const user = ref(null)
const starredProducts = ref([])
const estimateProducts = ref([])
const hover = ref(false)

const sortOption = ref('mostViewed')
const sortOptionEstimate = ref('mostViewed')

// sortedProducts: urutkan produk favorit
const sortedProducts = computed(() => {
  if (sortOption.value === 'mostViewed') {
    return [...starredProducts.value].sort((a, b) => (b.views || 0) - (a.views || 0))
  }
  return [...starredProducts.value].reverse()
})

// sortedEstimates: urutkan Estimasi Produk
const sortedEstimates = computed(() => {
  if (sortOptionEstimate.value === 'mostViewed') {
    return [...estimateProducts.value].sort((a, b) => (b.views || 0) - (a.views || 0))
  }
  return [...estimateProducts.value].reverse()
})

const fetchUserDetailsById = async () => {
  try {
    const currentUserId = authStore.user?._id
    if (!currentUserId) throw new Error('User ID not found')

    const response = await axios.get(`${baseUserUrl}/${currentUserId}`, {
      withCredentials: true
    })

    user.value = response.data.data || null
    starredProducts.value = user.value?.starred_products || []
  } catch (error) {
    console.error('Failed to fetch user details:', error)
    user.value = null
  }
}

const fetchEstimateProducts = async () => {
  try {
    const currentUserId = authStore.user?._id
    if (!currentUserId) throw new Error('User ID not found')

    const url = `${baseProductUrl}?createdBy=${currentUserId}`
    const res = await axios.get(url, { withCredentials: true })
    estimateProducts.value = res.data.data.products || []
  } catch (err) {
    console.error('Failed to fetch estimate products:', err)
  }
}

onMounted(async () => {
  try {
    await authStore.fetchCurrentUser()
    if (authStore.user?._id) {
      await fetchUserDetailsById()
      await fetchEstimateProducts()
    }
  } catch (error) {
    console.error('Error fetching auth user:', error)
  }
})
</script>
