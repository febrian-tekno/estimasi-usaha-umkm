<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
      <h2 class="text-xl font-bold mb-4">{{ title }}</h2>

      <form @submit.prevent="handleSubmit" v-if="!loading">
        <input
          type="text"
          v-model="formData.name"
          placeholder="Name"
          class="w-full border px-3 py-2 rounded mb-3"
          required
        />
        <input
          type="number"
          v-model="formData.amount"
          placeholder="Amount"
          class="w-full border px-3 py-2 rounded mb-3"
          required
        />
        <input
          type="number"
          v-model="formData.price"
          placeholder="Price"
          class="w-full border px-3 py-2 rounded mb-3"
          required
        />
        <div class="flex justify-end gap-2">
          <button type="button" @click="close" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Update
          </button>
        </div>
      </form>

      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  id: String,
  url: String,
  title: String,
  isOpen: Boolean,
})

const emit = defineEmits(['close', 'success'])

const formData = ref({ name: '', amount: '', price: '' })
const loading = ref(false)

const fetchData = async () => {
  if (props.id && props.url) {
    loading.value = true
    try {
      const res = await axios.get(`${props.url}/${props.id}`)
      formData.value = {
        name: res.data.data.name,
        amount: res.data.data.amount,
        price: res.data.data.price,
      }
    } catch (err) {
      console.error('Error fetching data', err)
    } finally {
      loading.value = false
    }
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    await axios.put(`${props.url}/${props.id}`, formData.value)
    emit('success')
    close()
  } catch (err) {
    console.error('Update failed:', err)
  } finally {
    loading.value = false
  }
}

const close = () => {
  emit('close')
}

// Fetch data setiap modal dibuka
watch(() => props.isOpen, (newVal) => {
  if (newVal) fetchData()
})
</script>
