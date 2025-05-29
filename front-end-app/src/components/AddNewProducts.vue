<template>
  <div class="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-bold mb-6">Add New Product</h1>

    <!-- Image + Title -->
    <div class="flex flex-col md:flex-row gap-6 mb-8">
      <div class="w-full md:w-1/3">
        <label class="block mb-2 font-semibold">Product Image</label>
        <input type="file" @change="onImageChange" class="block w-full" />
        <img
          v-if="imagePreview"
          :src="imagePreview"
          alt="Preview"
          class="mt-4 rounded border object-contain w-full h-40"
        />
      </div>

      <div class="flex-1 flex flex-col justify-start">
        <label class="block mb-2 font-semibold">Title</label>
        <input
          v-model="title"
          type="text"
          placeholder="Enter product title"
          class="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label class="block mt-6 font-semibold">Jumlah Porsi (per produksi)</label>
        <input
          v-model.number="porsi"
          type="number"
          min="1"
          class="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Misal: 10 porsi"
        />

        <label class="block mt-6 font-semibold">Harga Jual Disarankan (per porsi)</label>
        <input
          v-model.number="hargaJual"
          type="number"
          min="0"
          class="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Masukkan harga jual"
        />
      </div>
    </div>

    <!-- Steps Pembuatan -->
    <section class="mb-10">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-xl font-semibold">Steps Pembuatan</h2>
        <button
          @click="addStep"
          class="text-white bg-blue-600 hover:bg-blue-700 rounded px-3 py-1 select-none"
          title="Add Step"
        >
          +
        </button>
      </div>

      <div v-for="(step, idx) in steps" :key="idx" class="flex items-center gap-3 mb-2">
        <div class="w-6 text-right text-gray-500 select-none">{{ idx + 1 }}.</div>
        <input
          v-model="steps[idx]"
          type="text"
          class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Describe this step"
        />
        <button
          v-if="steps.length > 1"
          @click="removeStep(idx)"
          class="text-red-600 font-bold px-2 select-none"
          title="Remove Step"
        >
          ×
        </button>
      </div>
    </section>

    <!-- Tips (optional) -->
    <section class="mb-10">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-xl font-semibold">Tips (Optional)</h2>
        <button @click="addTip" class="btn btn-sm btn-primary" title="Add Tip">＋</button>
      </div>

      <div v-for="(tip, idx) in tips" :key="idx" class="flex items-center gap-3 mb-2">
        <div class="w-6 text-right text-gray-400 select-none">{{ idx + 1 }}.</div>
        <input
          v-model="tips[idx]"
          type="text"
          class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Optional tip"
        />
        <button
          v-if="tips.length > 1"
          @click="removeTip(idx)"
          class="text-red-600 font-bold px-2 select-none"
          title="Remove Tip"
        >
          ×
        </button>
      </div>
    </section>

    <!-- Ingredients -->
    <section class="mb-10">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Ingredients</h2>
        <button @click="addIngredient" class="text-white bg-blue-600 hover:bg-blue-700 rounded px-3 py-1 select-none" title="Add Ingredient">
          +
        </button>
      </div>

      <IngredientRow
        v-for="(ingredient, idx) in ingredients"
        :key="idx"
        :modelValue="ingredient"
        :index="idx"
        :ingredientDB="ingredientDB"
        @update:modelValue="val => ingredients[idx] = val"
        @remove="() => removeIngredient(idx)"
      />
    </section>

    <!-- Packing -->
    <section class="mb-10">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Packing</h2>
        <button
          @click="addPacking"
          class="text-white bg-blue-600 hover:bg-blue-700 rounded px-3 py-1 select-none"
          title="Add Packing"
        >
          +
        </button>
      </div>

      <div v-for="(pack, idx) in packings" :key="idx" class="flex items-center gap-4 mb-3 border rounded p-3">
        <div class="w-6 text-center text-gray-500 select-none">{{ idx + 1 }}</div>

        <select v-model="pack.packingId" @change="onPackingChange(idx)" class="flex-1 border rounded px-2 py-1">
          <option value="">-- Select Packing --</option>
          <option v-for="item in packingDB" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>

        <div v-if="selectedPacking(idx)" class="flex items-center gap-2 min-w-[120px]">
          <img :src="selectedPacking(idx).image" alt="img" class="w-10 h-10 object-cover rounded" />
          <div class="text-sm text-gray-600">
            Rp {{ formatPrice(selectedPacking(idx).price) }}
          </div>
        </div>

        <input
          type="number"
          min="1"
          v-model.number="pack.qty"
          class="w-20 border rounded px-2 py-1"
          placeholder="Qty"
        />

        <div class="w-28 text-right font-semibold">
          Rp {{ formatPrice(pack.qty * (selectedPacking(idx)?.price || 0)) }}
        </div>

        <button @click="removePacking(idx)" class="text-red-500 hover:text-red-700 font-bold px-2" title="Remove Packing">
          ×
        </button>
      </div>
    </section>

    <!-- Peralatan -->
    <section class="mb-10">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Peralatan</h2>
        <button @click="addPeralatan" class="text-white bg-blue-600 hover:bg-blue-700 rounded px-3 py-1 select-none" title="Add Equipment">
          +
        </button>
      </div>

      <div v-for="(alat, idx) in peralatan" :key="idx" class="flex items-center gap-4 mb-3 border rounded p-3">
        <div class="w-6 text-center text-gray-500 select-none">{{ idx + 1 }}</div>

        <select v-model="alat.peralatanId" @change="onPeralatanChange(idx)" class="flex-1 border rounded px-2 py-1">
          <option value="">-- Select Equipment --</option>
          <option v-for="item in peralatanDB" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>

        <div v-if="selectedPeralatan(idx)" class="flex items-center gap-2 min-w-[120px]">
          <img :src="selectedPeralatan(idx).image" alt="img" class="w-10 h-10 object-cover rounded" />
          <div class="text-sm text-gray-600">
            Rp {{ formatPrice(selectedPeralatan(idx).price) }}
          </div>
        </div>

        <button
          @click="removePeralatan(idx)"
          class="text-red-500 hover:text-red-700 font-bold px-2"
          title="Remove Equipment"
        >
          ×
        </button>
      </div>
    </section>

    <!-- Summary Biaya & Margin -->
    <section class="border-t pt-4 flex justify-between items-center text-lg font-semibold">
      <div>Total Biaya Produksi:</div>
      <div>Rp {{ formatPrice(totalBiaya) }}</div>
    </section>

    <section class="border-t pt-4 mt-2 flex justify-between items-center text-lg font-semibold">
      <div>Margin Keuntungan:</div>
      <div :class="marginClass">Rp {{ formatPrice(margin) }}</div>
    </section>

    <button
      class="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded"
      @click="submit"
    >
      Submit Produk
    </button>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import IngredientRow from './IngredientRow.vue'

const ingredientDB = [
  { id: 'coklat', name: 'Coklat Bubuk', price: 1500, unit: 'gram', image: 'https://i.imgur.com/abc123.jpg' },
  { id: 'gula', name: 'Gula Pasir', price: 12000, unit: 'kg', image: 'https://i.imgur.com/xyz456.jpg' },
  // tambah bahan lain
]

const packingDB = [
  { id: 'plastik', name: 'Plastik Pembungkus', price: 500, image: 'https://i.imgur.com/plastik.jpg' },
  { id: 'kotak', name: 'Kotak Kertas', price: 2500, image: 'https://i.imgur.com/kotak.jpg' },
]

const peralatanDB = [
  { id: 'mixer', name: 'Mixer', price: 2500000, image: 'https://i.imgur.com/mixer.jpg' },
  { id: 'oven', name: 'Oven', price: 5000000, image: 'https://i.imgur.com/oven.jpg' },
]

const title = ref('')
const imagePreview = ref(null)
const porsi = ref(1)
const hargaJual = ref(0)

const steps = reactive([''])
const tips = reactive([])

const ingredients = reactive([
  { ingredientId: '', qty: 0, unit: '' }
])

const packings = reactive([
  { packingId: '', qty: 1 }
])

const peralatan = reactive([
  { peralatanId: '' }
])

function addStep() {
  steps.push('')
}
function removeStep(idx) {
  steps.splice(idx, 1)
}

function addTip() {
  tips.push('')
}
function removeTip(idx) {
  tips.splice(idx, 1)
}

function addIngredient() {
  ingredients.push({ ingredientId: '', qty: 0, unit: '' })
}
function removeIngredient(idx) {
  ingredients.splice(idx, 1)
}

function addPacking() {
  packings.push({ packingId: '', qty: 1 })
}
function removePacking(idx) {
  packings.splice(idx, 1)
}

function addPeralatan() {
  peralatan.push({ peralatanId: '' })
}
function removePeralatan(idx) {
  peralatan.splice(idx, 1)
}

function onPackingChange(idx) {
  // reset qty jika kosong
  if (!packings[idx].qty) packings[idx].qty = 1
}

function onPeralatanChange(idx) {}

function selectedPacking(idx) {
  return packingDB.find(p => p.id === packings[idx].packingId)
}
function selectedPeralatan(idx) {
  return peralatanDB.find(p => p.id === peralatan[idx].peralatanId)
}

const totalBiayaIngredients = computed(() => {
  return ingredients.reduce((acc, ing) => {
    const data = ingredientDB.find(i => i.id === ing.ingredientId)
    if (!data) return acc
    return acc + (ing.qty || 0) * data.price
  }, 0)
})

const totalBiayaPacking = computed(() => {
  return packings.reduce((acc, p) => {
    const data = packingDB.find(i => i.id === p.packingId)
    if (!data) return acc
    return acc + (p.qty || 1) * data.price
  }, 0)
})

const totalBiayaPeralatan = computed(() => {
  return peralatan.reduce((acc, p) => {
    const data = peralatanDB.find(i => i.id === p.peralatanId)
    if (!data) return acc
    return acc + data.price
  }, 0)
})

const totalBiaya = computed(() => {
  return totalBiayaIngredients.value + totalBiayaPacking.value + totalBiayaPeralatan.value
})

const margin = computed(() => {
  const totalPenjualan = (hargaJual.value || 0) * (porsi.value || 1)
  return totalPenjualan - totalBiaya.value
})

const marginClass = computed(() => {
  return margin.value >= 0 ? 'text-green-600' : 'text-red-600'
})

function onImageChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    imagePreview.value = reader.result
  }
  reader.readAsDataURL(file)
}

function formatPrice(val) {
  if (!val) return '0'
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function submit() {
  // contoh submit ke backend
  alert('Submit data produk...')
  // validasi dll bisa ditambah
}
</script>

<style scoped>
body {
  background-color: #f9fafb;
}
</style>
