<template>
  <div v-if="item && item.item">
    <div class="relative border rounded-lg p-3 shadow-sm flex flex-col items-center">
    <img
      v-if="item.item && item.item.image"
      :src="baseServerUrl + item.item.image"
      alt="Item Image"
      class="w-full h-40 object-cover rounded mb-2"
    />
    <img
      v-else
      src="@/assets/images/default-image.jpeg"
      alt="Item Image"
      class="w-full h-40 object-cover rounded mb-2"
    />
    <div class="text-center text-sm font-medium space-y-1">
      <div class="text-black">{{ item.item.name }}</div>
      <div class="text-gray-600"> {{item.qty}} × {{ item.item.amount }}</div>
      <div class="text-orange-600 font-semibold">
        Rp {{ item.item.price?.toLocaleString("id-ID") || '-' }}
      </div>
    </div>
    <div class="absolute bottom-2 right-2 text-xs text-white bg-orange-500 rounded px-2 py-0.5">
      Rp. {{ (item.qty * item.item.price)?.toLocaleString('id-ID') }}
    </div>
  </div>
  </div>
  
</template>

<script setup>

const baseServerUrl = import.meta.env.VITE_SERVER_BASE_URL;
const props = defineProps(['item'])


</script>
