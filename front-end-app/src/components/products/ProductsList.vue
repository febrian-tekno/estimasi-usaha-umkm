<template>
  <div>
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 m-4 lg:grid-cols-4 gap-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
      >
        <img
          :src="product.image || '/src/assets/images/sidebanner.jpg'"
          alt="Produk"
          class="w-full h-40 sm:h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="text-base sm:text-lg font-semibold text-gray-800 mb-1 truncate">{{ product.name }}</h3>
          <p class="text-sm text-gray-500">Rp {{ product.price.toLocaleString() }} / pcs</p>

          <div class="flex flex-wrap items-center justify-between gap-1 mt-3 text-xs sm:text-sm text-gray-500">
            <span
              v-if="product.isVerified"
              class="text-green-600 font-medium flex items-center gap-1"
            >
              <i class="fa fa-check-circle"></i> Tervalidasi Ahli
            </span>
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
  </div>
</template>

<script setup>
const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
})
</script>
