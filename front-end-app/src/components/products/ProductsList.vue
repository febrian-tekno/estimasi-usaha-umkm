<template>
  <div>
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 m-4 lg:grid-cols-4 gap-4" v-if="products.length">
      <div
        v-for="product in products"
        :key="product._id"
        @click="goToDetail(product._id)"
        class="cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
      >
         <!-- Gambar dan badge verifikasi -->
        <div class="relative">
          <img
            :src="baseServerUrl + product.image"
            alt="Produk"
            class="w-full h-40 sm:h-48 object-cover"
          />

          <span
            v-if="product.isVerified"
            class="absolute top-2 left-2 bg-white bg-opacity-80 text-green-600 font-medium text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm"
          >
            <i class="fa fa-check-circle"></i> Terverifikasi Ahli
          </span>
        </div>

        <div class="p-4">
          <h3 class="text-base sm:text-lg font-semibold text-gray-800 mb-1 truncate">
            {{ product.title }}
          </h3>
  
          <p class="text-sm text-gray-500">
           <span class="font-bold text-black ">Modal: </span> Rp {{ product.capital?.toLocaleString('id-ID') }}
          </p>

          <div class="flex flex-wrap items-center justify-between gap-1 mt-3 text-xs sm:text-sm text-gray-500"  >
            <span class="flex items-center gap-1">
              <i class="fa fa-star text-yellow-400"></i> {{ product.stars }}
            </span>
            <span class="flex items-center gap-1">
              <i class="fa fa-eye"></i> {{ product.views }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center py-16 text-center text-gray-500">
      <i class="fas fa-box-open text-4xl mb-4 text-gray-400"></i>
      <h2 class="text-lg sm:text-xl font-semibold">Produk tidak ditemukan</h2>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const baseServerUrl = import.meta.env.VITE_SERVER_BASE_URL;

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()

function goToDetail(id) {
  router.push(`/products/${id}`)
}
</script>
