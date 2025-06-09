<template>
  <div class="space-y-6">
    <!-- Input Harga & Target -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-md font-semibold mb-1">Harga Jual (Rp)</label>
        <input
          :value="price"
          @input="e => emit('update:price', e.target.valueAsNumber)"
          type="number"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
      <div>
        <label class="block text-md font-semibold mb-1">Target / Hari</label>
        <input
          :value="target"
          @input="e => emit('update:target', e.target.valueAsNumber)"
          type="number"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
    </div>

    <!-- Statistik Produksi -->
    <div class="bg-white rounded-2xl shadow-md p-6 space-y-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">
        Simulasi Statistik Produksi & Keuangan
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-medium">
        <div class="flex justify-between">
          <span>Modal / Hari:</span>
          <span class="text-red-500">Rp {{ capitalPerDay.toLocaleString('id-ID') }}</span>
        </div>
        <div class="flex justify-between">
          <span>Modal / Bulan (×30):</span>
          <span class="text-red-500">Rp {{ capitalPerMonth.toLocaleString('id-ID') }}</span>
        </div>
        <div class="flex justify-between">
          <span>Keuntungan / Hari:</span>
          <span class="text-green-600">Rp {{ profitPerDay.toLocaleString('id-ID') }}</span>
        </div>
        <div class="flex justify-between">
          <span>Keuntungan / Bulan:</span>
          <span class="text-green-600">Rp {{ profitPerMonth.toLocaleString('id-ID') }}</span>
        </div>
        <div class="flex justify-between">
          <span>Batch / Hari:</span>
          <span class="text-gray-700">{{ batchesPerDay }} batch</span>
        </div>
        <div class="flex justify-between">
          <span>Pendapatan / Hari:</span>
          <span class="text-purple-600">Rp {{ revenuePerDay.toLocaleString('id-ID') }}</span>
        </div>
      </div>
    </div>

    <!-- Balik Modal -->
    <div class="flex justify-between text-sm font-semibold">
      <span>Perkiraan Balik Modal dalam:</span>
      <span class="text-purple-700">{{ paybackPeriod }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue'

const props = defineProps({
  product: Object,
  initialCapital: Number,
  price: { type: Number, required: true },
  target: { type: Number, required: true },
})
const emit = defineEmits(['update:price', 'update:target'])

const capital = computed(() => props.product.capital || 0)
const yieldPerBatch = computed(() => props.product.productionYield || 1)

const batchesPerDay = computed(() => Math.ceil(props.target / yieldPerBatch.value))
const capitalPerDay = computed(() => batchesPerDay.value * capital.value)
const capitalPerMonth = computed(() => capitalPerDay.value * 30)
const revenuePerDay = computed(() => props.price * props.target)
const profitPerDay = computed(() => revenuePerDay.value - capitalPerDay.value)
const profitPerMonth = computed(() => profitPerDay.value * 30)

const paybackDays = computed(() => {
  if (profitPerDay.value <= 0) return Infinity
  return Math.ceil(props.initialCapital / profitPerDay.value)
})

const paybackPeriod = computed(() => {
  const d = paybackDays.value
  if (!isFinite(d)) return '–'
  if (d <= 30) return `${d} hari`
  const m = Math.floor(d / 30), rd = d % 30
  if (m <= 12) return rd ? `${m} bulan ${rd} hari` : `${m} bulan`
  const y = Math.floor(m / 12), rm = m % 12
  return rm ? `${y} tahun ${rm} bulan` : `${y} tahun`
})
</script>
