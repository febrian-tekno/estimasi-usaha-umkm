<template>
  <div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg shadow-lg w-[400px] p-6 relative">
      <button 
        @click="closeModal" 
        class="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold" 
        aria-label="Close modal"
      >
        &times;
      </button>

      <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="name" class="block font-medium mb-1">Nama</label>
          <input 
            v-model="form.name" 
            id="name" 
            type="text" 
            class="w-full border border-gray-300 rounded px-3 py-2" 
            required 
            autocomplete="off"
          />
        </div>

        <div>
          <label for="amount" class="block font-medium mb-1">Jumlah</label>
          <input 
            v-model="form.amount" 
            id="amount" 
            type="text" 
            class="w-full border border-gray-300 rounded px-3 py-2" 
            required 
            placeholder="Contoh: 1 bungkus, 2 lusin, 3 kg"
            autocomplete="off"
          />
        </div>

        <div>
          <label for="price" class="block font-medium mb-1">Harga</label>
          <input 
            v-model.number="form.price" 
            id="price" 
            type="number" 
            min="0" 
            class="w-full border border-gray-300 rounded px-3 py-2" 
            required 
          />
        </div>

        <div>
          <label for="image" class="block font-medium mb-1">Upload Gambar (opsional)</label>
          <input id="image" type="file" accept="image/*" @change="handleFileChange" />
          <div v-if="previewImage" class="mt-2">
            <img :src="previewImage" alt="Preview" class="w-20 h-20 object-cover rounded" />
          </div>
        </div>

        <div class="flex justify-end space-x-2">
          <button type="button" @click="closeModal" class="btn btn-outline">Batal</button>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const props = defineProps({
  title: { type: String, default: 'Tambah Item Baru' },
  url: { type: String, required: true },
})

const emit = defineEmits(['close', 'success'])

const form = ref({
  name: '',
  amount: '',
  price: 0,
})

const selectedFile = ref(null)
const previewImage = ref(null)
const loading = ref(false)

watch(previewImage, (newVal, oldVal) => {
  if (oldVal) URL.revokeObjectURL(oldVal)
})
onUnmounted(() => {
  if (previewImage.value) URL.revokeObjectURL(previewImage.value)
})

function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    previewImage.value = URL.createObjectURL(file)
  } else {
    selectedFile.value = null
    previewImage.value = null
  }
}

async function handleSubmit() {
  if (!form.value.name || !form.value.amount || form.value.price <= 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Validasi Gagal',
      text: 'Semua field wajib diisi dan jumlah/harga harus lebih dari 0!',
    })
    return
  }

  loading.value = true

  try {
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('amount', form.value.amount)
    formData.append('price', form.value.price)
    if (selectedFile.value) {
      formData.append('image', selectedFile.value)
    }

    await axios.post(`${props.url}`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    await Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Data berhasil ditambahkan!',
      timer: 1500,
      showConfirmButton: false,
    })

    emit('success')
    closeModal()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal Menambahkan',
      text: error.response?.data?.message || error.message,
    })
  } finally {
    loading.value = false
  }
}

function closeModal() {
  resetForm()
  emit('close')
}

function resetForm() {
  form.value = { name: '', amount: '', price: 0 }
  selectedFile.value = null
  if (previewImage.value) URL.revokeObjectURL(previewImage.value)
  previewImage.value = null
  loading.value = false
}
</script>

