<template>
  <section class=" min-h-screen" style="background-color: #f3ecdc;">
    <!-- App Bar -->
    <AppBar />

    <!-- Hero Section -->
    <div class="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Estimasi Cepat & Akurat untuk Usaha <span class="text-orange-500">Kuliner</span>-mu
        </h1>
        <p class="text-gray-600 mb-6">
          JualApa adalah platform komunitas yang dirancang untuk membantu pelaku UMKM kuliner menghitung estimasi modal,
          harga jual, dan potensi keuntungan berdasarkan data bahan, kemasan, dan alat yang diinput komunitas.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 text-center">
          <a href="/products/add"
            class="bg-orange-500 text-white px-5 py-2.5 rounded-md hover:bg-orange-600 font-semibold">
            Mulai Sekarang
          </a>
          <a href="/about"
            class="border border-orange-500 text-orange-500 px-5 py-2.5 rounded-md hover:bg-orange-100 font-semibold">
            Pelajari Lebih Lanjut
          </a>
        </div>

      </div>
      <div>
        <img src="/src/assets/images/heroImageHomePage.jpg" alt="UMKM Illustration" class="rounded-lg shadow-md" />
      </div>
    </div>

    <!-- About Section -->
    <div class="container mx-auto  py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <img src="/src/assets/images/sidebanner.jpg" alt="Tentang Kami" class="w-full rounded-xl shadow-md" />
      </div>
      <div>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Apa itu JualApa?</h2>
        <p class="text-gray-600 mb-4">
          JualApa adalah platform komunitas berbasis web yang membantu pelaku UMKM makanan dan minuman membuat
          perhitungan estimasi modal dan potensi keuntungan secara praktis.
        </p>
        <ul class="list-disc pl-5 text-gray-600 mb-4">
          <li>Memasukkan dan memperbarui data bahan, kemasan, dan alat oleh komunitas</li>
          <li>Melakukan simulasi biaya produksi per batch dan estimasi laba per bulan</li>
          <li>Melihat ide usaha terpopuler dan terverifikasi sebagai referensi</li>
        </ul>
        <a href="/about" class="text-orange-600 font-semibold hover:underline">Baca Selengkapnya →</a>
      </div>
    </div>

    <!-- Fitur Section -->
    <section class="py-16"
      style="background: linear-gradient(to bottom, white 0%, #FED7AA 50%, #FED7AA 50%, white 100%);">
      <div class="max-w-5xl mx-auto px-4 text-center">
        <h2 class="text-xl md:text-2xl font-bold text-orange-600 mb-6">
          Mulai bisnis pertama anda dengan <span class="text-gray-800">JualApa</span>
        </h2>
        <p class="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-10">
          JualApa membantu UMKM memilih produk kuliner terbaik berdasarkan modal dan kategori. Data diperoleh dari
          kontribusi komunitas, lengkap dengan estimasi laba dan fitur perencanaan usaha.
        </p>

        <div class="grid grid-cols-3 gap-4 md:gap-8 text-center">
          <!-- Fitur 1 -->
          <div class="flex flex-col items-center scale-90 md:scale-100">
            <div class="text-orange-500 text-3xl md:text-5xl mb-3">
              📊
            </div>
            <h3 class="font-semibold text-gray-800 text-sm md:text-base mb-1">Estimasi Berdasarkan Komunitas</h3>
            <p class="text-gray-600 text-xs md:text-sm max-w-xs">Data bahan, kemasan, dan alat diinput pengguna untuk
              akurasi nyata.</p>
          </div>

          <!-- Fitur 2 -->
          <div class="flex flex-col items-center scale-90 md:scale-100">
            <div class="text-orange-500 text-3xl md:text-5xl mb-3">
              💰
            </div>
            <h3 class="font-semibold text-gray-800 text-sm md:text-base mb-1">Sesuai Modal UMKM</h3>
            <p class="text-gray-600 text-xs md:text-sm max-w-xs">Rekomendasi produk disesuaikan dengan dana yang kamu
              miliki.</p>
          </div>

          <!-- Fitur 3 -->
          <div class="flex flex-col items-center scale-90 md:scale-100">
            <div class="text-orange-500 text-3xl md:text-5xl mb-3">
              ⚙️
            </div>
            <h3 class="font-semibold text-gray-800 text-sm md:text-base mb-1">Antarmuka Ramah Pemula</h3>
            <p class="text-gray-600 text-xs md:text-sm max-w-xs">Desain sederhana agar perencanaan usaha lebih cepat dan
              mudah.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Coba Sekarang Section -->
    <section class="py-12 bg-white text-center">
      <div class="max-w-md mx-auto px-6">
        <h2 class="text-3xl font-semibold text-gray-900 mb-2">
          Yuk, coba sekarang juga!
        </h2>
        <p class="text-gray-600 text-base">
          Gunakan filter di bawah ini untuk menemukan ide usaha kuliner yang sesuai dengan kebutuhan bisnis kamu.
        </p>
      </div>
    </section>

    <!-- Gabungan Filter dan Rekomendasi Produk -->
    <section class="container mx-auto bg-white mt-12 shadow px-6 py-12 rounded-xl">
      <h2 class="text-2xl font-bold text-orange-500 mb-6 text-center">Filter Produk Kuliner</h2>
      <!-- Filter -->
      <ProductsFilter />

      <!-- Rekomendasi Produk -->
      <div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Rekomendasi Produk</h2>
          <a href="/products/search" class="text-orange-500 hover:underline text-sm font-semibold">Tampilkan Semua</a>
        </div>
        <div>
          <IndikatorLoading v-if="loading" :text="'memuat data produk...'" />
          <ErrorMessage v-else-if="error" :text="errorRes" />
          <ProductsList v-else :products="products" />
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <div class="container mx-auto px-6 py-12 relative">
      <h2 class="text-xl font-semibold text-gray-800 mb-4 text-center">Masih belum menemukan yang cocok?</h2>
      <SearchBarProducts />
    </div>

    <!-- SVG Separator -->
    <div class="overflow-hidden">
      <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="#f9fafb" fill-opacity="1"
          d="M0,32L48,58.7C96,85,192,139,288,160C384,181,480,171,576,160C672,149,768,139,864,144C960,149,1056,171,1152,176C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path>
      </svg>
    </div>

    <!-- Statistik UMKM -->
    <section class="bg-gray-50 py-16 px-4">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-xl md:text-3xl font-bold text-orange-600 mb-6">Statistik UMKM di Indonesia 2025</h2>
        <p class="text-gray-600 mb-10 max-w-2xl mx-auto text-sm md:text-base">
          Berikut beberapa data penting tentang perkembangan UMKM di Indonesia yang bisa menjadi referensi sebelum
          memulai usaha kuliner.
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div class="bg-white shadow rounded-2xl p-4 md:p-6">
            <p class="text-2xl md:text-3xl font-bold text-orange-500">64,2 Juta+</p>
            <p class="text-gray-600 mt-1 md:mt-2 text-xs md:text-sm">Jumlah UMKM di Indonesia</p>
          </div>
          <div class="bg-white shadow rounded-2xl p-4 md:p-6">
            <p class="text-2xl md:text-3xl font-bold text-orange-500">60%</p>
            <p class="text-gray-600 mt-1 md:mt-2 text-xs md:text-sm">Kontribusi UMKM ke PDB Nasional</p>
          </div>
          <div class="bg-white shadow rounded-2xl p-4 md:p-6">
            <p class="text-2xl md:text-3xl font-bold text-orange-500">97%</p>
            <p class="text-gray-600 mt-1 md:mt-2 text-xs md:text-sm">Tenaga Kerja yang Diserap UMKM</p>
          </div>
          <div class="bg-white shadow rounded-2xl p-4 md:p-6">
            <p class="text-2xl md:text-3xl font-bold text-orange-500">Kuliner & Retail</p>
            <p class="text-gray-600 mt-1 md:mt-2 text-xs md:text-sm">Kategori UMKM Terpopuler</p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <h2 class="text-center m-24">ini section testimoni</h2>
    </section>

    <section class="bg-orange-50 py-16">
      <div class="max-w-5xl mx-auto px-6 text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-black-600 mb-6">
          Kenapa Harus <span class="text-orange-500">JualApa?</span>
        </h2>
        <p class="text-gray-600 mb-10 max-w-2xl mx-auto">
          Karena setiap langkah bisnis kuliner harus berbasis data komunitas, bukan hanya tebakan. JualApa memberikan
          dasar perhitungan yang jelas untuk membuat keputusan yang tepat.
        </p>
        <div class="grid md:grid-cols-3 gap-6 text-left">
          <div class="bg-white shadow-lg p-6 rounded-xl">
            <h3 class="font-semibold text-black-700 mb-2">📈 Perhitungan Realistis</h3>
            <p class="text-sm text-gray-600">Estimasi berdasarkan data komunitas yang diverifikasi.</p>
          </div>
          <div class="bg-white shadow-lg p-6 rounded-xl">
            <h3 class="font-semibold text-black-700 mb-2">🔍 Transparan & Fleksibel</h3>
            <p class="text-sm text-gray-600">Bisa disesuaikan dengan modal dan kategori kulinermu.</p>
          </div>
          <div class="bg-white shadow-lg p-6 rounded-xl">
            <h3 class="font-semibold text-black-700 mb-2">🚀 Fokus pada UMKM Kuliner</h3>
            <p class="text-sm text-gray-600">Didesain khusus untuk pebisnis pemula dan pelaku usaha kuliner skala
              kecil-menengah.</p>
          </div>
        </div>
      </div>
    </section>
    <ContactWhatsapp />
    <FooterApp />
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

import AppBar from '@/components/global/AppBar.vue';
import FooterApp from '@/components/global/FooterApp.vue';
import SearchBarProducts from '@/components/products/SearchBarProducts.vue';
import ProductsFilter from '@/components/products/ProductsFilter.vue';
import IndikatorLoading from '@/components/global/IndikatorLoading.vue';
import ErrorMessage from '@/components/etc/ErrorMessage.vue';
import ProductsList from '@/components/products/ProductsList.vue';
import ContactWhatsapp from '@/components/contacts/ContactWhatsapp.vue';
import { useSearchStore } from '@/stores/search.js';

const searchStore = useSearchStore();
const products = ref([]);
const loading = ref(false);
const error = ref(false);
const errorRes = ref('');

const baseProductsUrl = import.meta.env.VITE_PRODUCTS_BASE_URL;

async function fetchProducts(query) {
  loading.value = true;
  try {
    const response = await axios.get(`${baseProductsUrl}?${query}`, {
      withCredentials: true,
    });
    const result = response.data.data;
    products.value = result.products;
    error.value = false;
  } catch (err) {
    error.value = true;
    errorRes.value = err.response?.data?.message || err.message || 'Terjadi kesalahan';
  } finally {
    loading.value = false;
  }
}

watch(
  () => searchStore.queryParams,
  (newQuery) => {
    fetchProducts(newQuery);
  },
  { immediate: true }
);

onMounted(() => {
  fetchProducts(searchStore.queryParams);
});
</script>
