<template>
  <AppBar />
  <div class="m-8">
    <a @click.prevent="goBack" href="#" class="text-xl hover:underline">← Kembali</a>
  </div>

  <h1 class="text-3xl ml-12 font-bold">Tambah Produk</h1>

  <div class="flex flex-col lg:flex-row gap-6 p-6 bg-white max-w-7xl mx-auto">
    <!-- Left: Image Upload -->
    <div class="flex-1 flex flex-col items-center">
      <label
        for="imageUpload"
        class="w-72 h-72 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer flex justify-center items-center text-gray-500 text-center"
      >
        <input
          type="file"
          id="imageUpload"
          @change="store.onFileChange"
          accept="image/*"
          hidden
        />
        <div v-if="!store.previewImage">
          <p>Click to upload image</p>
        </div>
        <img
          v-if="store.previewImage"
          :src="store.previewImage"
          alt="Preview"
          class="w-full h-full object-cover rounded-lg"
        />
      </label>
    </div>

    <!-- Right: Form -->
    <div class="flex-1 space-y-6">
      <!-- Title -->
      <div>
        <label for="title" class="block font-medium text-blue-900">Title *</label>
        <input
          v-model="store.form.title"
          type="text"
          id="title"
          placeholder="Enter product title"
          class="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <!-- Category (radio/button enum) -->
      <div>
        <label class="block font-medium text-blue-900">Kategori *</label>
        <div class="mt-1 flex gap-4">
          <button
            :class="store.form.rawCategory === 'food' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'"
            @click="store.form.rawCategory = 'food'"
            type="button"
            class="px-4 py-2 rounded"
          >
            Food
          </button>
          <button
            :class="store.form.rawCategory === 'drink' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'"
            @click="store.form.rawCategory = 'drink'"
            type="button"
            class="px-4 py-2 rounded"
          >
            Drink
          </button>
        </div>
      </div>

      <!-- Tags (comma‐separated input) -->
      <div>
        <label for="tagsInput" class="block font-medium text-blue-900">Tags</label>
        <input
          v-model="tagsInput"
          type="text"
          id="tagsInput"
          placeholder="Pisahkan dengan koma, contoh: fresh, homemade, spicy"
          class="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <p class="text-sm text-gray-500">Contoh: "fresh, homemade, spicy"</p>
      </div>

      <!-- Sales Target & Price -->
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <label for="dailySalesTarget" class="block font-medium text-blue-900">Daily Sales Target *</label>
          <input
            v-model.number="store.form.dailySalesTarget"
            type="number"
            min="1"
            id="dailySalesTarget"
            class="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div class="flex-1">
          <label for="estimatedSellingPrice" class="block font-medium text-blue-900">Estimated Selling Price *</label>
          <input
            v-model.number="store.form.estimatedSellingPrice"
            type="number"
            min="0"
            id="estimatedSellingPrice"
            class="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <!-- Production Yield -->
      <div>
        <label for="productionYield" class="block font-medium text-blue-900">Production Yield *</label>
        <input
          v-model.number="store.form.productionYield"
          type="number"
          min="1"
          id="productionYield"
          placeholder="Jumlah unit yang dihasilkan per produksi"
          class="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <!-- Capital & Profit (readonly) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block font-medium text-blue-900">Capital (modal)</label>
          <input
            :value="formatCurrency(store.capital)"
            type="text"
            readonly
            class="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2"
          />
          <p class="text-sm text-gray-500">Modal tanpa peralatan (ingredients + packaging)</p>
        </div>
        <div>
          <label class="block font-medium text-blue-900">Profit/Hari</label>
          <input
            :value="formatCurrency(store.profitPerDay)"
            type="text"
            readonly
            class="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2"
          />
          <p class="text-sm text-gray-500">Estimasi keuntungan per hari</p>
        </div>
      </div>
    </div>

    <!-- Modal Production -->
    <div
      v-if="showProductionModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      @click.self="showProductionModal = false"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 class="text-xl font-bold text-blue-900 mb-4">Production Modal</h2>
        <p>
          <strong>Packaging + Ingredients combined price:</strong>
          Rp {{ formatCurrency(store.productionModalTotal) }}
        </p>
        <button
          @click="showProductionModal = false"
          class="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Close
        </button>
      </div>
    </div>

    <!-- Modal Initial -->
    <div
      v-if="showInitialModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      @click.self="showInitialModal = false"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 class="text-xl font-bold text-blue-900 mb-4">Initial Modal</h2>
        <p>
          <strong>All items (Packaging + Ingredients + Tools):</strong>
          Rp {{ formatCurrency(store.initialModalTotal) }}
        </p>
        <button
          @click="showInitialModal = false"
          class="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>

  <div class="m-4 space-y-6">
    <!-- Steps -->
    <div>
      <label class="block font-medium text-blue-900">Steps</label>
      <div
        v-for="(step, index) in store.form.steps"
        :key="index"
        class="flex items-start gap-2 mt-2"
      >
        <textarea
          v-model="store.form.steps[index]"
          placeholder="Describe step..."
          class="w-full border border-gray-300 rounded-md px-3 py-2 resize-y focus:ring-2 focus:ring-orange-500"
        ></textarea>
        <button
          @click="store.removeStep(index)"
          type="button"
          class="text-red-600 hover:text-red-800 px-2 py-1"
        >
          Remove
        </button>
      </div>
      <button
        @click="store.addStep"
        type="button"
        class="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Add Step
      </button>
    </div>

    <!-- Item Groups -->
    <div v-for="(group, idx) in store.itemGroups" :key="idx" class="space-y-2">
      <h3 class="text-lg font-semibold text-blue-900">{{ group.label }}</h3>

      <div
        v-for="(item, i) in store.form[group.key]"
        :key="i"
        class="flex flex-col md:flex-row items-center gap-3"
      >
        <vue-select-next
          v-model="store.form[group.key][i].selected"
          :options="group.options"
          :filterable="false"
          :remote="true"
          label="displayName"
          :reduce="option => option._id"
          placeholder="Search and select..."
          @search="(search, loading) => store.onSearch(search, loading, group.key)"
          @open="() => store.fetchOptions(group.key)"
          class="w-full md:w-1/2"
        />
        <input
          type="number"
          min="1"
          v-model.number="store.form[group.key][i].qty"
          @input="store.updateItemPrice(group.key, i)"
          placeholder="Qty"
          class="w-full md:w-24 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <div class="text-blue-900">Rp {{ formatCurrency(item.price) }}</div>
        <button
          @click="store.removeItem(group.key, i)"
          type="button"
          class="text-red-500 hover:text-red-700 font-bold text-xl"
        >
          ×
        </button>
      </div>

      <button
        @click="store.addItem(group.key)"
        type="button"
        class="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Add {{ group.label.slice(0, -1) }}
      </button>

      <div class="text-right font-medium text-blue-800 mt-1">
        Total {{ group.label }}: Rp {{ formatCurrency(store.getTotalPrice(group.key)) }}
      </div>
    </div>

    <!-- Modal Triggers -->
    <div class="flex flex-col md:flex-row gap-4">
      <button
        @click="showProductionModal = true"
        type="button"
        class="flex-1 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Production Modal
      </button>
      <button
        @click="showInitialModal = true"
        type="button"
        class="flex-1 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Initial Modal
      </button>
    </div>

    <!-- Margin Info -->
    <div class="text-blue-800 space-y-1 font-semibold">
      <p>Margin per day: Rp {{ formatCurrency(store.marginPerDay) }}</p>
      <p>Margin per month: Rp {{ formatCurrency(store.marginPerMonth) }}</p>
    </div>

    <!-- Error Message -->
    <p v-if="store.errorMessage" class="mt-2 text-red-600 font-semibold">
      {{ store.errorMessage }}
    </p>

    <!-- Submit Button -->
    <button
      @click="onSubmit"
      :disabled="store.isSubmitting"
      class="mt-4 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50"
    >
      {{ store.isSubmitting ? 'Submitting...' : 'Create Product' }}
    </button>
  </div>

  <FooterApp />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product.js'
import VueSelectNext from 'vue-select-next'
import '../../../node_modules/vue-select-next/dist/style.css'
import AppBar from '@/components/global/AppBar.vue'
import FooterApp from '@/components/global/FooterApp.vue'

const router = useRouter()
const store = useProductStore()

// Untuk modal visibility di komponen ini saja
const showProductionModal = ref(false)
const showInitialModal = ref(false)

// Untuk input tags (string, nantinya di‐convert ke array sebelum submit)
const tagsInput = ref('')

// Helper format rupiah
function formatCurrency(value) {
  return value.toLocaleString('id-ID', { minimumFractionDigits: 0 })
}

// Go back
function goBack() {
  router.back()
}

// Submit: panggil action di store, kirim router & tagsInput.value
function onSubmit() {
  store.submitProduct(router, tagsInput.value)
}
</script>
