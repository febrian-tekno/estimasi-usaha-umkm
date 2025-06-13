<template>
  <AppBar />

  <div class="m-8">
    <a @click.prevent="goBack" href="#" class="text-xl hover:underline">
  <i class="fas fa-arrow-left mr-1"></i>Kembali
</a>
  </div>

  <div class="flex justify-between items-center px-6">
    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 ml-4 sm:ml-6 md:ml-12">
      Buat Estimasi Produk
    </h1>
    <div class="flex m-4 gap-2">
      <!-- ACTION BUTTONS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <button class="btn btn-secondary text-sm" @click="showIngredientForm = true">➕ Add Ingredient</button>
      <button class="btn btn-secondary text-sm" @click="showPackingForm = true">➕ Add Packing</button>
      <button class="btn btn-secondary text-sm" @click="showToolsForm = true">➕ Add Tools</button>
    </div>

    <!-- MODALS -->
    <Teleport to="body">
      <FormModal
        v-if="showIngredientForm"
        title="Add Ingredient"
        :url="`${baseUrl}/v1/ingredients`"
        @close="showIngredientForm = false"
        @success="render"
      />
      <FormModal
        v-if="showPackingForm"
        title="Add Packaging"
        :url="`${baseUrl}/v1/packages`"
        @close="showPackingForm = false"
        @success="render"
      />
      <FormModal
        v-if="showToolsForm"
        title="Add Tools"
        :url="`${baseUrl}/v1/tools`"
        @close="showToolsForm = false"
        @success="render"
      />
    </Teleport>
    </div>
  </div>

  <div class="flex flex-col lg:flex-row gap-6 p-6 bg-white max-w-7xl mx-auto rounded-lg shadow-sm">
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
        <div v-if="!store.previewImage" class="text-center">
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

      <!-- Category -->
      <div>
        <label class="block font-medium text-blue-900">Kategori *</label>
        <div class="mt-1 flex gap-4">
          <button
            type="button"
            :class="store.form.rawCategory === 'food'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-gray-600'"
            class="px-4 py-2 rounded focus:outline-none"
            @click="store.form.rawCategory = 'food'"
          >
            Food
          </button>
          <button
            type="button"
            :class="store.form.rawCategory === 'drink'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-gray-600'"
            class="px-4 py-2 rounded focus:outline-none"
            @click="store.form.rawCategory = 'drink'"
          >
            Drink
          </button>
        </div>
      </div>

      <!-- Tags -->
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

      <!-- Capital & Profit -->
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
  </div>

  <div class="m-4 space-y-6 bg-white max-w-7xl mx-auto p-6 rounded-lg shadow-sm">
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
          class="w-full border border-gray-300 rounded-md px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-orange-500"
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

    <!-- Tips (Opsional) -->
    <div>
      <label class="block font-medium text-blue-900">Tips (opsional)</label>
      <div
        v-for="(tip, index) in store.form.tips"
        :key="index"
        class="flex items-start gap-2 mt-2"
      >
        <textarea
          v-model="store.form.tips[index]"
          placeholder="Enter tip..."
          class="w-full border border-gray-300 rounded-md px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-orange-500"
        ></textarea>
        <button
          @click="store.removeTip(index)"
          type="button"
          class="text-red-600 hover:text-red-800 px-2 py-1"
        >
          Remove
        </button>
      </div>
      <button
        @click="store.addTip"
        type="button"
        class="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Add Tip
      </button>
    </div>

    <!-- Item Groups: Ingredients / Packaging / Tools -->
    <div v-for="(group, idx) in store.itemGroups" :key="idx" class="space-y-4">
      <h3 class="text-lg font-semibold text-blue-900">{{ group.label }}</h3>

      <div
        v-for="(item, i) in store.form[group.key]"
        :key="i"
        class="flex flex-col md:flex-row items-center gap-3"
      >
        <!-- Dropdown: panggil updateItemPrice juga saat user memilih -->
        <vue-select-next
          :key="group.key + '-' + i"
          v-model="store.form[group.key][i].selected"
          :options="group.options"
          :filterable="false"
          :remote="true"
          label="displayName"
          placeholder="Search and select..."
          @search="handleSearch(group.key)"
          @open="() => store.fetchOptions(group.key)"
          @update:modelValue="() => updateItemPrice(group.key, i)"
          class="w-full md:w-1/2"
        />

        <!-- Qty: panggil updateItemPrice saat qty berubah -->
        <input
          type="number"
          min="1"
          v-model.number="store.form[group.key][i].qty"
          @input="() => updateItemPrice(group.key, i)"
          placeholder="Qty"
          class="w-full md:w-24 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <!-- Tampilkan harga per baris -->
        <div class="text-blue-900 w-full md:w-32">
          Rp {{ formatCurrency(store.form[group.key][i].price) }}
        </div>

        <!-- Hapus baris -->
        <button
          @click="() => store.removeItem(group.key, i)"
          type="button"
          class="text-red-500 hover:text-red-700 font-bold text-xl"
        >
          ×
        </button>
      </div>

      <!-- Tombol Add Item -->
      <button
        @click="() => store.addItem(group.key)"
        type="button"
        class="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Add {{ group.label.slice(0, -1) }}
      </button>

      <!-- Tampilkan Total per Group -->
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
      <p>Margin per day: Rp {{ formatCurrency(store.profitPerDay) }}</p>
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

  <!-- Modals -->
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

  <FooterApp />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product.js'
import VueSelectNext from 'vue-select-next'
import '../../../node_modules/vue-select-next/dist/style.css'
import AppBar from '@/components/global/AppBar.vue'
import FooterApp from '@/components/global/FooterApp.vue'
import FormModal from '@/components/dashboard/FormModal.vue'

const router = useRouter()
const store = useProductStore()

const baseUrl = import.meta.env.VITE_API_BASE_URL

const showIngredientForm = ref(false)
const showPackingForm = ref(false)
const showToolsForm = ref(false)

// Inisialisasi agar ada 1 baris ingredients & packaging (supaya dropdown langsung muncul)
onMounted(() => {
  store.addItem('ingredients')
  store.addItem('packaging')
})

// Modal visibility
const showProductionModal = ref(false)
const showInitialModal = ref(false)

// tagsInput
const tagsInput = ref('')

// formatCurrency helper
function formatCurrency(value) {
  return Number(value).toLocaleString('id-ID', { minimumFractionDigits: 0 })
}

// goBack
function goBack() {
  router.back()
}

// onSubmit
function onSubmit() {
  store.submitProduct(router, tagsInput.value)
}

// handleSearch
function handleSearch(groupKey) {
  return (searchText, loading) => {
    store.onSearch(searchText, loading, groupKey)
  }
}

// updateItemPrice (dipanggil dari template)
function updateItemPrice(groupKey, index) {
  store.updateItemPrice(groupKey, index)
}
</script>

<style scoped>
/* Semua styling di-handle oleh Tailwind; tidak ada CSS tambahan */
</style>
