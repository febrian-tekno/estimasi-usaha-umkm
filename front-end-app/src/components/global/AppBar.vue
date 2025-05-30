<template>
  <header class="sticky top-0 bg-white shadow-md z-50">
    <nav class="flex justify-between items-center p-4 relative">
      <!-- Hamburger -->
      <button
        @click="toggleMobileMenu"
        ref="menuButtonRef"
        class="md:hidden p-2 border rounded transition-transform duration-300"
        aria-label="Toggle menu"
      >
        <svg
          :class="{ 'transform rotate-90': isMobileMenuOpen }"
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
      <div v-if="!isMobileSearchActive" class="flex items-center space-x-3">
        <img src="https://th.bing.com/th/id/OIP.sF-UQHgTnXPwRSfmt8QKRwAAAA?rs=1&pid=ImgDetMain" alt="Logo" class="w-8 h-8" />
        <a href="/" class="text-xl font-bold text-gray-800 hover:text-orange-500">JualApa</a>
      </div>

      <!-- Desktop menu -->
      <div class="hidden md:flex space-x-4">
        <a href="/" class="text-gray-700 hover:text-orange-500">Beranda</a>
        <a href="/products" class="text-gray-700 hover:text-orange-500">Produk</a>
        <a href="/about" class="text-gray-700 hover:text-orange-500">Tentang</a>
      </div>

      <!-- Right controls -->
      <div class="flex items-center">
        <!-- Search Desktop -->
        <div class="hidden sm:flex ml-4 w-64 relative">
          <input
            v-model="searchKeyword"
            @keyup.enter="handleSearch"
            type="text"
            placeholder="Cari produk..."
            class="w-full h-8 px-3 py-1 text-sm border rounded-md pr-8"
          />
          <button
            @click="handleSearch"
            class="absolute right-2 top-1.5 text-gray-500 hover:text-orange-500"
            aria-label="Cari"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>
        </div>

        <!-- Search Mobile -->
        <div class="w-full flex sm:hidden " ref="mobileSearchWrapperRef">
          <template v-if="isMobileSearchActive">
            <div class="relative w-full flex items-center gap-2">
              <button
                @click="isMobileSearchActive = false"
                class="text-gray-500 hover:text-orange-500"
                aria-label="Tutup pencarian"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <input
                ref="mobileSearchInputRef"
                v-model="searchKeyword"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Cari produk..."
                class="h-8 pl-3 pr-8 py-1 text-sm border rounded-xl w-full focus:outline-none"
              />
              <button
                @click="handleSearch"
                class="absolute right-1 top-1.5 text-gray-500 hover:text-orange-500"
                aria-label="Cari"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
              </button>
            </div>
          </template>
          <template v-else>
            <button
              @click.stop="showMobileSearch"
              ref="mobileSearchButtonRef"
              class="h-full flex items-center justify-center bg-white rounded-md"
              aria-label="Buka pencarian"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
            </button>
          </template>
        </div>

        <!-- Auth Buttons -->
        <template v-if="!auth.isLogin">
          <a href="/auth/login" class="text-orange-500 font-semibold hover:underline ml-4">Masuk</a>
        </template>
        <template v-else>
          <a href="/dashboard" class="px-4 py-1 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-xl hover:bg-blue-100 ml-4">
            Dashboard
          </a>
        </template>
      </div>
    </nav>
  </header>

  <!-- Mobile Menu -->
  <div
    v-if="isMobileMenuOpen"
    ref="menuPanelRef"
    class="fixed top-16 left-0 right-0 bg-white shadow-md p-4 md:hidden z-50 transition-all duration-300"
  >
    <a href="/home" class="block py-1 text-gray-700 hover:text-white hover:bg-orange-500">Beranda</a>
    <a href="/products" class="block py-1 text-gray-700 hover:text-white hover:bg-orange-500">Produk</a>
    <a href="/about" class="block py-1 text-gray-700 hover:text-white hover:bg-orange-500">Tentang</a>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const auth = useAuthStore();
const router = useRouter();

const isMobileMenuOpen = ref(false);
const isMobileSearchActive = ref(false);
const searchKeyword = ref("");

const menuPanelRef = ref(null);
const menuButtonRef = ref(null);
const mobileSearchWrapperRef = ref(null);
const mobileSearchInputRef = ref(null);
const mobileSearchButtonRef = ref(null);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

function showMobileSearch() {
  isMobileSearchActive.value = true;
  nextTick(() => {
    mobileSearchInputRef.value?.focus();
  });
}

function handleSearch() {
  if (!searchKeyword.value.trim()) return;
  router.push(`/products/search?q=${encodeURIComponent(searchKeyword.value.trim())}`);
}

function handleClickOutsideMenu(e) {
  const clickedOutsideMenu = menuPanelRef.value && !menuPanelRef.value.contains(e.target);
  const clickedOutsideButton = menuButtonRef.value && !menuButtonRef.value.contains(e.target);
  if (isMobileMenuOpen.value && clickedOutsideMenu && clickedOutsideButton) {
    closeMobileMenu();
  }
}

function globalClickHandler(e) {
  handleClickOutsideMenu(e);
}

onMounted(() => {
  document.addEventListener('click', globalClickHandler);
  auth.fetchCurrentUser();
});

onBeforeUnmount(() => {
  document.removeEventListener('click', globalClickHandler);
});
</script>
