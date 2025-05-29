<template>
  <AppBar/>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <!-- Profile Section -->
      <div class="bg-white p-6 rounded-lg shadow flex flex-col items-center gap-4 mb-10">
        <div class="w-40 h-40 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-5xl">
          <span v-if="!user.picture">👤</span>
          <img v-else :src="user.picture" alt="User Picture" class="w-full h-full object-cover" />
        </div>
        <h2 class="text-2xl font-semibold text-gray-700 text-center">{{ user.name }}</h2>
        <p class="text-gray-500 text-base text-center">{{ user.email }}</p>
        <button class="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">Edit Profile</button>
      </div>

      <!-- Edit Profile Section (with change password) -->
      <div class="bg-white p-4 rounded shadow hover:shadow-md transition mb-10">
        <h3 class="text-lg font-medium text-gray-700 mb-4">🔧 Update Profile & Password</h3>
        <p class="text-sm text-gray-500 mb-2">Perbarui nama, foto profil, dan ubah kata sandi Anda.</p>
        <button class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit Profile / Change Password</button>
      </div>

      <!-- Starred Products Section -->
      <div class="bg-white p-6 rounded shadow">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-700">⭐ Starred Products</h3>
          <select v-model="sortOption" class="border rounded px-3 py-1 text-sm">
            <option value="mostViewed">Paling Banyak Dilihat</option>
            <option value="recent">Terbaru Ditambahkan</option>
          </select>
        </div>
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div v-for="(product, index) in sortedProducts" :key="index" class="border p-4 rounded-lg flex gap-4 items-center">
            <img :src="product.image" alt="Product Image" class="w-16 h-16 object-cover rounded" />
            <div class="flex-1">
              <h4 class="font-semibold text-gray-800">{{ product.name }}</h4>
              <p class="text-sm text-gray-500">👁️ {{ product.views }} views</p>
            </div>
          </div>
          <p v-if="!starredProducts.length" class="text-gray-400 text-sm text-center py-4 col-span-2">
            Belum ada produk yang difavoritkan.
          </p>
        </div>
      </div>
    </div>
  </div>
  <FooterApp/>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppBar from '../../components/AppBar.vue'
import FooterApp from '../../components/FooterApp.vue'

const user = {
  name: 'Nama User',
  email: 'user@email.com',
  picture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg' // Kosongkan untuk default 👤 icon
}

const sortOption = ref('mostViewed')

const starredProducts = ref([
  { name: 'Es Kopi Susu Gula Aren', views: 1123, image: 'https://via.placeholder.com/64' },
  { name: 'Roti Bakar Coklat Keju', views: 845, image: 'https://via.placeholder.com/64' },
  { name: 'Teh Tarik Rempah', views: 212, image: 'https://via.placeholder.com/64' }
])

const sortedProducts = computed(() => {
  if (sortOption.value === 'mostViewed') {
    return [...starredProducts.value].sort((a, b) => b.views - a.views)
  } else {
    return [...starredProducts.value].reverse() // simulasi terbaru ditambahkan
  }
})
</script>

<style scoped>
</style>