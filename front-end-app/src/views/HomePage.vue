  <template>
    <section class="bg-gradient-to-br from-orange-10 to-white min-h-screen">
      <!-- App Bar -->
      <AppBar></AppBar>

      <!-- Hero Section -->
      <div class="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Estimasi Cepat & Akurat untuk Usaha <span class="text-orange-500">Kuliner</span>-mu
          </h1>
          <p class="text-gray-600 mb-6">
            JualApa adalah platform pintar yang dirancang untuk membantu pelaku UMKM kuliner menghitung estimasi modal, harga jual, dan potensi keuntungan. Dengan berbagai resep makanan,  minuman, dan jajanan populer!
          </p>
          <div class="flex gap-4 mb-6">
            <a href="/auth/register" class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 font-semibold">Mulai Sekarang</a>
            <a href="/about" class="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-100 font-semibold">Pelajari Lebih Lanjut</a>
          </div>
        </div>
        <div>
          <img src="/src/assets/images/sidebanner.jpg" alt="UMKM Illustration" class="w-full rounded-xl shadow-md" />
        </div>
      </div>

          <!-- About Section -->
      <div class="container mx-auto bg-gradient-to-br from-blue-50 to-white py-16 px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img src="/src/assets/images/sidebanner.jpg" alt="Tentang Kami" class="w-full rounded-xl shadow-md" />
        </div>
        <div>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Apa itu JualApa?</h2>
          <p class="text-gray-600 mb-4">
            JualApa adalah alat bantu digital yang dikembangkan untuk mempercepat proses perhitungan estimasi bisnis kuliner. Dengan fitur yang mudah digunakan, pengguna dapat:
          </p>
          <ul class="list-disc pl-5 text-gray-600 mb-4">
            <li>Menghitung kebutuhan modal awal</li>
            <li>Menentukan harga jual yang kompetitif</li>
            <li>Memperkirakan potensi keuntungan</li>
          </ul>
          <a href="/about" class="text-orange-600 font-semibold hover:underline">Baca Selengkapnya →</a>
        </div>
      </div>

              <!-- fitur section-->
    <section class="py-16" style="background: linear-gradient(to bottom, white 0%, #FED7AA 50%, #FED7AA 50%, white 100%);">
      <div class="max-w-5xl mx-auto px-4 text-center">
        <h2 class="text-xl md:text-2xl font-bold text-orange-600 mb-6">
          Mulai bisnis pertama anda dengan <span class="text-gray-800">JualApa</span>
        </h2>
        <p class="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-10">
          JualApa membantu UMKM memilih produk terbaik berdasarkan modal dan kategori. Semua didukung oleh data pasar, estimasi laba, serta fitur-fitur yang memudahkan dalam perencanaan usaha.
        </p>

        <div class="grid grid-cols-3 gap-4 md:gap-8 text-center">
          <!-- Fitur 1 -->
          <div class="flex flex-col items-center scale-90 md:scale-100">
            <div class="text-orange-500 text-3xl md:text-5xl mb-3">
              📊
            </div>
            <h3 class="font-semibold text-gray-800 text-sm md:text-base mb-1">Estimasi Berdasarkan Data</h3>
            <p class="text-gray-600 text-xs md:text-sm max-w-xs">Data pasar aktual digunakan untuk memberi saran produk paling potensial.</p>
          </div>

          <!-- Fitur 2 -->
          <div class="flex flex-col items-center scale-90 md:scale-100">
            <div class="text-orange-500 text-3xl md:text-5xl mb-3">
              💰
            </div>
            <h3 class="font-semibold text-gray-800 text-sm md:text-base mb-1">Sesuai Modal UMKM</h3>
            <p class="text-gray-600 text-xs md:text-sm max-w-xs">Rekomendasi produk disesuaikan dengan dana yang kamu miliki.</p>
          </div>

          <!-- Fitur 3 -->
          <div class="flex flex-col items-center scale-90 md:scale-100">
            <div class="text-orange-500 text-3xl md:text-5xl mb-3">
              ⚙️
            </div>
            <h3 class="font-semibold text-gray-800 text-sm md:text-base mb-1">Penggunaan Mudah</h3>
            <p class="text-gray-600 text-xs md:text-sm max-w-xs">Antarmuka sederhana dan ramah pemula untuk mempercepat perencanaan usaha.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Coba Sekarang -->
    <section class="py-12 bg-white text-center">
      <div class="max-w-md mx-auto px-6">
        <h2 class="text-3xl font-semibold text-gray-900 mb-2">
          Yuk, coba sekarang juga!
        </h2>
        <p class="text-gray-600 text-base">
          Gunakan filter di bawah ini untuk menemukan produk yang sesuai dengan kebutuhan bisnis kamu.
        </p>
      </div>
    </section>

      <!-- Gabungan Filter dan Rekomendasi Produk -->
    <section class="container mx-auto shadow px-6 py-12 rounded-xl ">
      <h2 class="text-2xl font-bold text-orange-500 mb-6 text-center">Filter Produk yang sesuai</h2>
      <!-- Filter -->
      <ProductsFilter/>

      <!-- Rekomendasi Produk -->
    <div >
      <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Rekomendasi Produk</h2>
          <a href="/products" class="text-orange-500 hover:underline text-sm font-semibold">Show All</a>
      </div>
      <div> 
        <IndikatorLoading v-if="loading" :text="'fetch data produk...'"/>
        <ErrorMessage  v-else-if="error" :text="errorRes"/>
        <ProductsList v-else  :products="products"/>
      </div>
    </div>
    </section>

    <!-- Search Section -->
    <div class="container mx-auto px-6 py-12 relative">
      <h2 class="text-xl font-semibold text-gray-800 mb-4 text-center">Masih belum menemukan yang cocok?</h2>
      <SearchBarProducts/>
    </div>

    <!-- SVG Separator -->
    <div class="overflow-hidden">
      <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="#f9fafb" fill-opacity="1" d="M0,32L48,58.7C96,85,192,139,288,160C384,181,480,171,576,160C672,149,768,139,864,144C960,149,1056,171,1152,176C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>


    <section class="bg-gray-50 py-16 px-4">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-xl md:text-3xl font-bold text-orange-600 mb-6">Statistik UMKM di Indonesia tahun 2025</h2>
        <p class="text-gray-600 mb-10 max-w-2xl mx-auto text-sm md:text-base">
          Berikut beberapa data penting tentang perkembangan UMKM di Indonesia yang bisa jadi pertimbangan Anda sebelum memulai usaha.
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


    <div class="relative">
      <svg class="absolute top-0 w-full" viewBox="0 0 1440 100">
        <path fill="#FED7AA" d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"></path>
      </svg>
    </div>

<!-- Section: Kenapa Harus JualApa -->
      <section class=" bg-orange-50 py-16">
        <div class="max-w-5xl mx-auto px-6 text-center">
          <h2 class="text-2xl md:text-3xl font-bold text-black-600 mb-6">
            Kenapa Harus <span class="text-orange-500">JualApa?</span>
          </h2>
          <p class="text-gray-600 mb-10 max-w-2xl mx-auto">
            Karena setiap langkah bisnis harus berbasis data, bukan hanya tebakan. JualApa memberikan dasar perhitungan yang jelas untuk membuat keputusan yang tepat.
          </p>
          <div class="grid md:grid-cols-3 gap-6 text-left">
            <div class="bg-white shadow-lg p-6 rounded-xl">
              <h3 class="font-semibold text-black-700 mb-2">📈 Perhitungan Realistis</h3>
              <p class="text-sm text-gray-600">Estimasi berdasarkan data nyata, bukan perkiraan asal.</p>
            </div>
            <div class="bg-white shadow-lg p-6 rounded-xl">
              <h3 class="font-semibold text-black-700 mb-2">🔍 Transparan & Fleksibel</h3>
              <p class="text-sm text-gray-600">Bisa disesuaikan dengan kondisi modal dan kategori usahamu.</p>
            </div>
            <div class="bg-white shadow-lg p-6 rounded-xl">
              <h3 class="font-semibold text-black-700 mb-2">🚀 Fokus pada UMKM</h3>
              <p class="text-sm text-gray-600">Didesain khusus untuk pebisnis pemula dan pelaku usaha skala kecil-menengah.</p>
            </div>
          </div>
        </div>
      </section>

      <FooterApp></FooterApp>

    </section>
  </template>

<script setup>
import { ref, onMounted, watch} from 'vue';
import axios from 'axios';

import AppBar from '@/components/global/AppBar.vue';
import FooterApp from '@/components/global/FooterApp.vue';
import SearchBarProducts from '@/components/products/SearchBarProducts.vue';
import ProductsFilter from '@/components/products/ProductsFilter.vue';
import IndikatorLoading from '@/components/global/IndikatorLoading.vue';
import ErrorMessage from '@/components/etc/ErrorMessage.vue';
import ProductsList from '@/components/products/ProductsList.vue';
import { useSearchStore } from '@/stores/search.js';

const searchStore = useSearchStore();
const products = ref([]);
const loading = ref(false);
const error = ref(false);
const errorRes = ref('');

const baseProductsUrl = import.meta.env.VITE_PRODUCTS_BASE_URL
async function fetchProducts(query) {
  loading.value = true;
  console.log(query)
  try {
    const response = await axios.get(`${baseProductsUrl}?${query}`, {
      withCredentials: true,
    });
    products.value = response.data.data;
    error.value = false;
  } catch (err) {
    error.value = true;
    errorRes.value = err.response?.data?.message || err.message || 'Terjadi kesalahan';
  } finally {
    loading.value = false;
  }
}

// Watch queryParams dan panggil fetchProducts setiap berubah
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

