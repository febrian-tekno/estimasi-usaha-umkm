<template>
  <div class="space-y-6">
    <!-- 1. Input Harga Jual & Target Penjualan per Hari -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Input Harga Jual -->
      <div>
        <label class="block text-md font-semibold mb-1">
          Harga Jual (Rp)
        </label>
        <p class="my-2">Rekomendasi : Rp. {{ product.estimatedSellingPrice?.toLocaleString('id-ID') }}</p>
        <input
          v-model.number="localPrice"
          type="number"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <!-- Input Target Penjualan / Hari -->
      <div>
        <label class="block text-sm font-semibold mb-1">
          Target Penjualan / Hari
        </label>
        <p class="my-2">Rekomendasi : {{ product.productionYield }}</p>

        <input
          v-model.number="localTarget"
          type="number"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
    </div>

    <!-- 2. Card Statistik Produksi & Keuangan -->
    <div class="bg-white rounded-2xl shadow-md p-6 space-y-6">
      <!-- Judul Section -->
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">
        Statistik Produksi & Keuangan
      </h2>

      <!-- Grid dengan 2 kolom untuk tampilkan data -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Modal Per Hari -->
        <div class="flex justify-between items-center">
          <span class="font-medium text-gray-600">Modal / Hari:</span>
          <span class="text-lg font-semibold text-green-600">
            Rp {{ capitalPerDay.toLocaleString('id-ID') }}
          </span>
        </div>

        <!-- Modal Per Bulan -->
        <div class="flex justify-between items-center">
          <span class="font-medium text-gray-600">Modal / Bulan (×30):</span>
          <span class="text-lg font-semibold text-green-600">
            Rp {{ capitalPerMonth.toLocaleString('id-ID') }}
          </span>
        </div>

        <!-- Keuntungan Per Hari -->
        <div class="flex justify-between items-center">
          <span class="font-medium text-gray-600">Keuntungan / Hari:</span>
          <span
            :class="[
              'text-lg font-semibold',
              profitPerDay >= 0 ? 'text-blue-600' : 'text-red-600'
            ]"
          >
            Rp {{ profitPerDay.toLocaleString('id-ID') }}
          </span>
        </div>

        <!-- Keuntungan Per Bulan -->
        <div class="flex justify-between items-center">
          <span class="font-medium text-gray-600">Keuntungan / Bulan:</span>
          <span
            :class="[
              'text-lg font-semibold',
              profitPerMonth >= 0 ? 'text-blue-600' : 'text-red-600'
            ]"
          >
            Rp {{ profitPerMonth.toLocaleString('id-ID') }}
          </span>
        </div>

        <!-- Jumlah Batch Produksi Per Hari -->
        <div class="flex justify-between items-center">
          <span class="font-medium text-gray-600">Batch / Hari:</span>
          <span class="text-lg font-semibold text-gray-800">
            {{ batchesPerDay }} batch
          </span>
        </div>

        <!-- Pendapatan Kotor Per Hari -->
        <div class="flex justify-between items-center">
          <span class="font-medium text-gray-600">Pendapatan / Hari:</span>
          <span class="text-lg font-semibold text-indigo-600">
            Rp {{ revenuePerDay.toLocaleString('id-ID') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// 1. Props yang diterima: satu objek product
//    - product.capital         : modal per batch (Number)
//    - product.productionYield : unit per batch (Number)
//    - product.estimatedSellingPrice : harga jual awal per unit (Number)
//    - product.dailySalesTarget       : target penjualan awal per hari (Number)
const props = defineProps({
  product: {
    type: Object,
    required: true,
    // contoh shape:
    // {
    //   capital: 121939,
    //   productionYield: 1,
    //   estimatedSellingPrice: 1000000,
    //   dailySalesTarget: 1,
    //   ...
    // }
  }
})

// 2. buat ref lokal untuk harga & target agar reaktif
//    inisialisasi dari props.product
const localPrice = ref(props.product.estimatedSellingPrice || 0)
const localTarget = ref(props.product.dailySalesTarget || 0)

// Jika props.product berubah tiba-tiba (misalnya parent update),
// kita sinkronkan juga localPrice & localTarget:
watch(() => props.product.estimatedSellingPrice, (val) => {
  localPrice.value = val || 0
})
watch(() => props.product.dailySalesTarget, (val) => {
  localTarget.value = val || 0
})

// 3. Ambil modal per batch & yield dari props.product
const capital = props.product.capital || 0
const productionYield = props.product.productionYield > 0
  ? props.product.productionYield
  : 1  // pastikan tidak 0

// 4. Hitung batch per hari berdasarkan localTarget & productionYield
const batchesPerDay = computed(() => {
  return Math.ceil(localTarget.value / productionYield)
})

// 5. Modal per hari = batch per hari × modal per batch
const capitalPerDay = computed(() => {
  return batchesPerDay.value * capital
})

// 6. Modal per bulan (dias. 30 hari)
const capitalPerMonth = computed(() => {
  return capitalPerDay.value * 30
})

// 7. Pendapatan kotor per hari = harga jual × target per hari
const revenuePerDay = computed(() => {
  return localPrice.value * localTarget.value
})

// 8. Keuntungan bersih per hari = pendapatan kotor – modal per hari
const profitPerDay = computed(() => {
  return revenuePerDay.value - capitalPerDay.value
})

// 9. Keuntungan bersih per bulan = keuntungan per hari × 30
const profitPerMonth = computed(() => {
  return profitPerDay.value * 30
})
</script>

<style scoped>
/* Jika mau menambah styling khusus, taruh di sini */
</style>
