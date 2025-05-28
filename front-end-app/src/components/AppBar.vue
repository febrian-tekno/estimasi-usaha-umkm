<template>
  <header class="sticky top-0 bg-white shadow-md z-50">
    <nav class="flex justify-between items-center p-4 relative">
      <!-- Hamburger -->
      <button
        @click="toggleMobileMenu"
        ref="buttonRef"
        class="md:hidden p-2 border rounded transition-transform duration-300"
        aria-label="Toggle menu"
      >
        <svg
          :class="{'transform rotate-90': isMobileMenuOpen}"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 transition-transform duration-300 ease-in-out"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <img src="https://th.bing.com/th/id/OIP.sF-UQHgTnXPwRSfmt8QKRwAAAA?rs=1&pid=ImgDetMain" alt="Logo" class="w-8 h-8" />
        <a href="/" class="text-xl font-bold text-gray-800 hover:text-orange-500">JualApa</a>
      </div>

      <!-- Desktop menu -->
      <div class="hidden md:flex space-x-4">
        <a href="/home" class="text-gray-700 hover:text-orange-500">Beranda</a>
        <a href="/products" class="text-gray-700 hover:text-orange-500">Produk</a>
        <a href="/about" class="text-gray-700 hover:text-orange-500">Tentang</a>
      </div>

    <div class="flex">

      <!-- Search Bar untuk Desktop -->
      <div class="hidden sm:flex ml-4 w-64">
        <input
          type="text"
          placeholder="Cari produk..."
          class="w-full h-8 px-3 py-1 text-sm border rounded-md"
        />
      </div>

      <!-- Search Bar untuk Mobile -->
      <div class="ml-4 flex sm:hidden"> 
        <button class="h-full flex items-center justify-center bg-white rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
        </button>
      </div>



      <!-- Auth Buttons -->
      <div class="md:flex items-center space-x-4 ml-4">
        <template v-if="!isLogin">
          <a href="/auth/login" class="text-orange-500 font-semibold hover:underline">Masuk</a>
        </template>
        <template v-else-if="isLogin">
          <a href="/auth/dashboard" class="px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-md hover:bg-blue-500">Dashboard</a>
        </template>
      </div>
      </div>
      
    </nav>
  </header>

  <!-- Mobile menu -->
  <div
    v-if="isMobileMenuOpen"
    ref="menuRef"
    class="fixed top-16 left-0 right-0 bg-white shadow-md p-4 md:hidden z-50 transition-all duration-300"
  >
    <a href="/home" class="block py-1 text-gray-700 hover:text-white hover:bg-orange-500">Beranda</a>
    <a href="/products" class="block py-1 text-gray-700 hover:text-white hover:bg-orange-500">Produk</a>
    <a href="/about" class="block py-1 text-gray-700 hover:text-white hover:bg-orange-500">Tentang</a>
  </div>
  
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';

const isMobileMenuOpen = ref(false);
const isLogin = ref(false);
const menuRef = ref(null);
const buttonRef = ref(null);

const baseUrlUserBE = import.meta.env.VITE_USER_BASE_URL;

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

// Detect click outside
const handleClickOutside = (e) => {
  const clickedOutsideMenu = menuRef.value && !menuRef.value.contains(e.target);
  const clickedOutsideButton = buttonRef.value && !buttonRef.value.contains(e.target);
  if (isMobileMenuOpen.value && clickedOutsideMenu && clickedOutsideButton) {
    closeMobileMenu();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  axios.get(`${baseUrlUserBE}/me`, { withCredentials: true })
    .then((res) => {
      isLogin.value = res.data.status === 'success';
    })
    .catch(() => {
      isLogin.value = false;
    });
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
