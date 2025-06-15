<template>
  <transition name="fade-scale" appear>
    <div
      v-if="show"
      class="fixed bottom-4 right-4 z-50 sm:right-6 sm:bottom-6 md:right-10 md:bottom-10"
    >
      <div class="relative">
        <button
          @click="handleClose"
          class="absolute -top-4 -right-4 text-black bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-gray-300 transition"
          aria-label="Tutup"
        >
          ✕
        </button>

        <!-- Tombol WhatsApp -->
        <button
          @click="openWhatsapp"
          class="flex items-center gap-2 bg-green-600 rounded-xl px-4 py-3 text-sm md:text-base text-white font-medium hover:bg-green-700 transition-colors duration-200 shadow-md max-w-xs"
        >
          <img
            src="https://images.icon-icons.com/622/PNG/512/whatsapp-logo_icon-icons.com_57054.png"
            alt="WhatsApp"
            class="h-5 w-5 md:h-6 md:w-6"
          />
          <span>Hubungi kami</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, } from 'vue'

const show = ref(false)
let timer = null

onMounted(() => {
  show.value = true
})

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
})

function openWhatsapp() {
  const phoneNumber = '6283147623743'
  const pesan = 'Halo, saya ingin bertanya lebih lanjut mengenai jualapa.'
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(pesan)}`, '_blank')
}

function handleClose() {
  show.value = false

  if (timer) clearTimeout(timer)

  timer = setTimeout(() => {
    show.value = true
  }, 5 * 60 * 1000)
}
</script>

<style scoped>
.fade-scale-enter-active {
  transition: all 0.4s ease;
}
.fade-scale-leave-active {
  transition: all 0.2s ease;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.fade-scale-enter-to {
  opacity: 1;
  transform: scale(1);
}
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
