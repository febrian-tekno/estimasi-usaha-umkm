<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Input Harga Jual -->
    <div>
      <label class="block text-sm font-semibold mb-1">Harga Jual (Rp)</label>
      <input
        v-model.number="localPrice"
        type="number"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>

    <!-- Input Target Penjualan/Hari -->
    <div>
      <label class="block text-sm font-semibold mb-1">Target Penjualan / Hari</label>
      <input
        v-model.number="localTarget"
        type="number"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

/**
 * Props:
 * - price         : Number (initial harga jual)
 * - dailyTarget   : Number (initial target penjualan/hari)
 *
 * Emits:
 * - 'update:price'       → men-update harga jual di parent
 * - 'update:dailyTarget' → men-update target penjualan di parent
 */
const props = defineProps({
  price: {
    type: Number,
    default: 0
  },
  dailyTarget: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:price', 'update:dailyTarget'])

// lokal state dari masing-masing input, di‐inisialisasi dari props
const localPrice = ref(props.price)
const localTarget = ref(props.dailyTarget)

// Watch untuk emit ke parent ketika user mengubah value
watch(localPrice, (val) => {
  emit('update:price', val)
})
watch(localTarget, (val) => {
  emit('update:dailyTarget', val)
})
</script>
