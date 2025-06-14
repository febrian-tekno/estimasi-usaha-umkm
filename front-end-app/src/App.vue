<template>
  <div>
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div class="loader"></div>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { ref,  } from 'vue'
import { useRouter } from 'vue-router'

const isLoading = ref(false)
const router = useRouter()

router.beforeEach((to, from, next) => {
  isLoading.value = true
  next()
})

router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})
</script>

<style>
  .loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid orange;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 0.8s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>
