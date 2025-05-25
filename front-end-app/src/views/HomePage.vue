<template>
  <AppBar></AppBar>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
    <h1 class="text-4xl font-bold mb-4">Selamat Datang di Aplikasi Resep!</h1>
    <p class="text-lg mb-6 text-center max-w-xl">
      Temukan berbagai resep masakan favoritmu dengan mudah. Gunakan menu navigasi untuk menjelajahi lebih banyak halaman.
    </p>
    <RouterLink
      to="/auth/login"
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      login
    </RouterLink>
  </div>
</template>

<script setup>
import AppBar from '../components/AppBar.vue';


</script>

<style scoped>
/* tambahan gaya jika perlu */
</style>
