<template>
  <div class="p-6 bg-white border rounded shadow-sm">
    <h2 class="text-xl font-semibold mb-4">Tambah Bahan Baru</h2>

    <div
      v-for="(item, idx) in newIngredients"
      :key="idx"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 relative"
    >
      <!-- Nama Bahan -->
      <div class="w-full">
        <label class="text-sm font-medium text-gray-700">Nama Bahan</label>
        <input
          v-model="item.name"
          placeholder="Contoh: Coklat Bubuk"
          class="w-full border px-2 py-1 rounded"
        />
      </div>

      <!-- Jumlah -->
      <div class="w-full">
        <label class="text-sm font-medium text-gray-700">Jumlah</label>
        <input
          v-model.number="item.qty"
          type="number"
          placeholder="220"
          class="w-full border px-2 py-1 rounded"
        />
      </div>

      <!-- Satuan -->
      <div class="w-full">
        <label class="text-sm font-medium text-gray-700">Satuan</label>
        <select v-model="item.unit" class="w-full border px-2 py-1 rounded mb-1">
          <option disabled value="">Pilih Satuan</option>
          <option v-for="unit in satuanList" :key="unit" :value="unit">{{ unit }}</option>
          <option value="_custom">+ Tambah satuan baru</option>
        </select>
        <input
          v-if="item.unit === '_custom'"
          v-model="item.customUnit"
          @blur="confirmCustomUnit(item)"
          placeholder="Masukkan satuan baru"
          class="w-full border mt-1 px-2 py-1 rounded"
        />
      </div>

      <!-- Harga -->
      <div class="w-full">
        <label class="text-sm font-medium text-gray-700">Harga Total (Rp)</label>
        <input
          v-model.number="item.price"
          type="number"
          placeholder="20000"
          class="w-full border px-2 py-1 rounded"
        />
      </div>

      <!-- Harga per Satuan -->
      <div class="w-full">
        <label class="text-sm font-medium text-gray-700">
          Harga / {{ item.unit === '_custom' ? item.customUnit : item.unit || '-' }}
        </label>
        <div class="text-sm text-gray-900 mt-2 font-semibold">
          Rp {{ formatPrice(perUnitPrice(item)) }}
        </div>
      </div>

      <!-- Tombol Tambah -->
      <button
        @click="addRow(idx + 1)"
        class="absolute -top-3 right-10 text-green-600 hover:text-green-800"
        title="Tambah Baris"
      >
        ➕
      </button>

      <!-- Tombol Hapus -->
      <button
        v-if="newIngredients.length > 1"
        @click="removeRow(idx)"
        class="absolute -top-3 -right-2 text-red-600 hover:text-red-800"
        title="Hapus Baris"
      >
        ❌
      </button>
    </div>

    <div class="flex justify-end mt-4 gap-4 flex-wrap">
      <button
        @click="submitIngredients"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Simpan Bahan
      </button>
    </div>
  </div>

  <!-- Tambah Satuan Modal -->
<div v-if="showUnitModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white p-6 rounded-lg w-80 shadow-md">
    <h3 class="text-lg font-semibold mb-4">Tambah Satuan Baru</h3>
    <input
      v-model="newUnitInput"
      placeholder="Masukkan satuan baru (cth: pack, saset)"
      class="w-full border px-3 py-2 rounded mb-4"
    />
    <div class="flex justify-end gap-2">
      <button @click="showUnitModal = false" class="text-gray-600 hover:underline">Batal</button>
      <button
        @click="addNewUnit"
        class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Tambah
      </button>
    </div>
  </div>
</div>

</template>


<script setup>
import { reactive, ref } from 'vue'

const satuanList = ref(['gram', 'kg', 'ml', 'bks', 'butir'])

const newIngredients = reactive([
  { name: '', qty: 0, unit: '', customUnit: '', price: 0 }
])

function addRow(index) {
  newIngredients.splice(index, 0, { name: '', qty: 0, unit: '', customUnit: '', price: 0 })
}

function removeRow(index) {
  newIngredients.splice(index, 1)
}

function confirmCustomUnit(item) {
  if (item.customUnit && !satuanList.value.includes(item.customUnit)) {
    satuanList.value.push(item.customUnit)
    item.unit = item.customUnit
    item.customUnit = ''
  }
}

function perUnitPrice(item) {
  if (!item.qty || !item.price) return 0
  return Math.round(item.price / item.qty)
}

function formatPrice(val) {
  if (!val) return '0'
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function submitIngredients() {
  const validItems = newIngredients.filter(i => i.name && i.qty > 0 && i.unit && i.price > 0)

  if (!validItems.length) {
    alert('Isi setidaknya satu bahan dengan lengkap.')
    return
  }

  console.log('Bahan yang disimpan:', validItems)
  alert('Berhasil menyimpan bahan baru.')
}
</script>
