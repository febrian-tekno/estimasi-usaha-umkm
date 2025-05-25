<!-- eslint-disable no-unused-vars -->

<template>
  <nav class="bg-white shadow-md px-6 py-4 flex items-center justify-between">
    <!-- Logo dan Judul -->
    <div class="flex items-center space-x-3">
      <img src="https://th.bing.com/th/id/OIP.sF-UQHgTnXPwRSfmt8QKRwAAAA?rs=1&pid=ImgDetMain" alt="Logo" class="w-8 h-8" />
      <span class="text-xl font-bold text-gray-800">JualApa</span>
    </div>

    <!-- Navigation (hidden on small screens) -->
    <div class="hidden md:flex space-x-6">
      <a href="/" class="text-gray-700 hover:text-blue-600">Home</a>
      <a href="/features" class="text-gray-700 hover:text-blue-600">Features</a>
      <a href="/pricing" class="text-gray-700 hover:text-blue-600">Pricing</a>
      <a href="/about" class="text-gray-700 hover:text-blue-600">About</a>
    </div>

    <!-- Action buttons -->
     <div v-if="!isLogin">
        <div class="hidden md:flex items-center space-x-4">
              <a href="/auth/login" class="px-4 py-2 text-sm font-medium text-white bg-yellow-400 rounded-md hover:bg-yellow-500">
                Login
              </a>
        </div>
     </div>

     <div v-if="isLogin">
        <div class="hidden md:flex items-center space-x-4">
              <a href="/auth/dashboard" class="px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-md hover:bg-blue-500">
                Dashboard
              </a>
        </div>
     </div>

    <!-- Hamburger (for mobile) -->
    <div class="md:hidden">
      <button @click="toggleMobileMenu" class="text-gray-600 hover:text-gray-900 focus:outline-none">
        <!-- icon hamburger -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <div v-show="isMobileMenuOpen" class="md:hidden px-6 pb-4 space-y-2 bg-white shadow">
    <a href="/" class="block text-gray-700 hover:text-blue-600">Home</a>
    <a href="/features" class="block text-gray-700 hover:text-blue-600">Features</a>
    <a href="/pricing" class="block text-gray-700 hover:text-blue-600">Pricing</a>
    <a href="/about" class="block text-gray-700 hover:text-blue-600">About</a>
    <a href="/auth/login" class="block text-white text-center bg-yellow-400 hover:bg-yellow-500 rounded-md py-2">
      Login
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import axios from 'axios';

const isMobileMenuOpen = ref(false);
const isLogin = ref(false);

const baseUrlUserBE = import.meta.env.VITE_USER_BASE_URL;

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

onMounted( async () => {
  try {
    const res = await axios.get(
        `${baseUrlUserBE}/me`,
        { withCredentials: true }
      );
      res.data.status === 'success' ? isLogin.value = true : isLogin.value = false
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    isLogin.value = false;
  }
})
</script>
