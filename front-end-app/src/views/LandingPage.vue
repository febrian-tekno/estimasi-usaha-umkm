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
            UMKM Estimator adalah platform pintar yang dirancang untuk membantu pelaku UMKM kuliner menghitung estimasi modal, harga jual, dan potensi keuntungan. Cocok untuk makanan ringan, minuman dingin, dan jajanan populer!
          </p>
          <div class="flex gap-4 mb-6">
            <button class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 font-semibold">Mulai Sekarang</button>
            <button class="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-100 font-semibold">Pelajari Lebih Lanjut</button>
          </div>
        </div>
        <div>
          <img src="/src/assets/images/sidebanner.jpg" alt="UMKM Illustration" class="w-full rounded-xl shadow-md" />
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



      <!-- Gabungan Filter dan Rekomendasi Produk -->
    <section class="container mx-auto shadow px-6 py-12 rounded-xl mt-12 ">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Filter Produk yang sesuai</h2>

      <!-- Filter -->
      <div class="grid md:grid-cols-4 gap-4 mb-10">
        <select class="w-full px-4 py-2 border rounded-lg">
          <option disabled selected>Sortir Berdasarkan</option>
          <option>Keuntungan Tertinggi</option>
          <option>Modal Terendah</option>
          <option>Paling Populer</option>
        </select>
        <input type="number" placeholder="Modal Maksimal" class="w-full px-4 py-2 border rounded-lg" />
        <select class="w-full px-4 py-2 border rounded-lg">
          <option disabled selected>Kategori</option>
          <option>Makanan Ringan</option>
          <option>Minuman Dingin</option>
        </select>
        <button class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">Terapkan Filter</button>
      </div>

      <!-- Rekomendasi Produk -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Rekomendasi Produk</h2>
      <button class="text-orange-500 hover:underline text-sm font-semibold">Show All</button>
    </div>
      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="i in 9" :key="i" class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
          <img src="/src/assets/images/sidebanner.jpg" alt="Produk" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-800">Tahu Crispy Renyah</h3>
            <p class="text-sm text-gray-500">Rp 1.500 / pcs</p>
            <div class="flex items-center justify-between mt-2 text-sm text-gray-500">
              <span class="text-green-600 font-medium">✔ Tervalidasi</span>
              <span class="flex items-center gap-1"><i class="fa fa-star text-yellow-400"></i> 92</span>
              <span class="flex items-center gap-1"><i class="fa fa-eye"></i> 301</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-8">
      <nav class="inline-flex items-center space-x-1">
        <button class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-orange-100">Prev</button>
        <button class="px-3 py-1 rounded-md border border-gray-300 bg-orange-500 text-white">1</button>
        <button class="px-3 py-1 rounded-md border border-gray-300 hover:bg-orange-100">2</button>
        <button class="px-3 py-1 rounded-md border border-gray-300 hover:bg-orange-100">3</button>
        <span class="px-2 py-1 text-gray-500">...</span>
        <button class="px-3 py-1 rounded-md border border-gray-300 hover:bg-orange-100">10</button>
        <button class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-orange-100">Next</button>
      </nav>
    </div>

    </section>

    <!-- Search Again Section (Dibuat ke Tengah dan Lebar) -->
    <div class="container mx-auto px-6 py-12">
      <h2 class="text-xl font-semibold text-gray-800 mb-4 text-center">Masih belum menemukan yang cocok?</h2>
      <div class="flex justify-center gap-3">
        <input
          type="text"
          placeholder="Cari Produk.."
          class="w-full max-w-2xl px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
        />
        <button class="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">Cari</button>
      </div>
    </div>

    <!-- SVG Separator -->
    <div class="overflow-hidden">
      <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="#f9fafb" fill-opacity="1" d="M0,32L48,58.7C96,85,192,139,288,160C384,181,480,171,576,160C672,149,768,139,864,144C960,149,1056,171,1152,176C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>


    <section class="bg-gray-50 py-16 px-4">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-orange-600 mb-6">Statistik UMKM di Indonesia tahun 2025</h2>
        <p class="text-gray-600 mb-10 max-w-2xl mx-auto">
          Berikut beberapa data penting tentang perkembangan UMKM di Indonesia yang bisa jadi pertimbangan Anda sebelum memulai usaha.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div class="bg-white shadow rounded-2xl p-6">
            <p class="text-3xl font-bold text-orange-500">65 Juta+</p>
            <p class="text-gray-600 mt-2">Jumlah UMKM di Indonesia</p>
          </div>
          <div class="bg-white shadow rounded-2xl p-6">
            <p class="text-3xl font-bold text-orange-500">61%</p>
            <p class="text-gray-600 mt-2">Kontribusi ke PDB Nasional</p>
          </div>
          <div class="bg-white shadow rounded-2xl p-6">
            <p class="text-3xl font-bold text-orange-500">97%</p>
            <p class="text-gray-600 mt-2">Tenaga Kerja Diserap UMKM</p>
          </div>
          <div class="bg-white shadow rounded-2xl p-6">
            <p class="text-3xl font-bold text-orange-500">Kuliner</p>
            <p class="text-gray-600 mt-2">Kategori UMKM Terpopuler</p>
          </div>
        </div>
      </div>
    </section>


    <div class="relative">
      <svg class="absolute top-0 w-full" viewBox="0 0 1440 100">
        <path fill="#FED7AA" d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"></path>
      </svg>
    </div>


      <!-- About Section -->
      <div class="container mx-auto bg-orange-50 py-16 px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img src="/src/assets/images/sidebanner.jpg" alt="Tentang Kami" class="w-full rounded-xl shadow-md" />
        </div>
        <div>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Apa itu UMKM Estimator?</h2>
          <p class="text-gray-600 mb-4">
            UMKM Estimator adalah alat bantu digital yang dikembangkan untuk mempercepat proses perhitungan estimasi bisnis kuliner. Dengan fitur yang mudah digunakan, pengguna dapat:
          </p>
          <ul class="list-disc pl-5 text-gray-600 mb-4">
            <li>Menghitung kebutuhan modal awal</li>
            <li>Menentukan harga jual yang kompetitif</li>
            <li>Memperkirakan potensi keuntungan</li>
          </ul>
          <button class="text-orange-600 font-semibold hover:underline">Baca Selengkapnya →</button>
        </div>
      </div>

      <FooterApp></FooterApp>

    </section>
  </template>

<script setup>
import AppBar from '../components/AppBar.vue';
import FooterApp from '../components/FooterApp.vue';

</script>
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
  </style>
