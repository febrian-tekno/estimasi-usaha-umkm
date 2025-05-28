<template>
  <AppBar/>
  <div class="bg-white text-gray-800">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20 text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Memberdayakan Wirausaha Pemula</h1>
      <p class="text-lg max-w-2xl mx-auto">Mengubah cara orang memulai usaha kecil dengan rekomendasi, data, dan panduan yang jelas dan terpercaya.</p>
    </section>

    <!-- Visi & Misi -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-16">
      <div class="flex flex-col justify-center">
        <h2 class="text-2xl font-bold mb-4">Visi Kami</h2>
        <p class="text-lg">Menjadi solusi utama bagi siapa saja yang ingin memulai bisnis makanan/minuman dengan modal terbatas secara cerdas dan efisien.</p>
      </div>
      <div class="flex flex-col justify-center">
        <h2 class="text-2xl font-bold mb-4">Misi Kami</h2>
        <p class="text-lg">Kami berkomitmen menyediakan panduan lengkap, data akurat, dan simulasi nyata agar pengguna dapat memulai usaha dengan percaya diri.</p>
      </div>
    </section>

    <!-- Cara Kerja -->
    <section class="bg-indigo-50 py-16 px-10 text-center">
      <h2 class="text-3xl font-bold mb-8">Cara Kerja JualApa</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-left">
        <div class="bg-white rounded-2xl shadow p-6">
          <h3 class="font-bold text-xl mb-2">1. Temukan Ide</h3>
          <p>Cari ide usaha berdasarkan kategori, modal, dan lokasi.</p>
        </div>
        <div class="bg-white rounded-2xl shadow p-6">
          <h3 class="font-bold text-xl mb-2">2. Simulasikan</h3>
          <p>Lihat detail bahan, biaya produksi, harga jual, dan margin.</p>
        </div>
        <div class="bg-white rounded-2xl shadow p-6">
          <h3 class="font-bold text-xl mb-2">3. Bandingkan</h3>
          <p>Bandingkan beberapa ide berdasarkan hasil dan preferensi.</p>
        </div>
        <div class="bg-white rounded-2xl shadow p-6">
          <h3 class="font-bold text-xl mb-2">4. Mulai Usaha</h3>
          <p>Gunakan panduan lengkap untuk langsung mulai jualan.</p>
        </div>
      </div>
    </section>

    <!-- Tentang JualApa -->
    <section class="p-10 bg-gray-100 text-center">
      <h2 class="text-3xl font-bold mb-6">Apa Itu JualApa?</h2>
      <p class="text-lg max-w-4xl mx-auto">
        JualApa adalah platform web untuk pelajar, mahasiswa, dan siapa pun yang ingin membuka usaha makanan atau minuman dengan modal kecil. Kami memberi rekomendasi produk lengkap dengan resep, rincian biaya, simulasi harga jual, hingga margin keuntungan.
      </p>
    </section>

    <!-- Statistik -->
    <section class="py-16 px-6 bg-white text-center grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <p class="text-4xl font-extrabold text-indigo-600">98%</p>
        <p class="mt-2">Tingkat Keberhasilan Rekomendasi</p>
      </div>
      <div>
        <p class="text-4xl font-extrabold text-indigo-600">10.000+</p>
        <p class="mt-2">Pengguna Aktif</p>
      </div>
      <div>
        <p class="text-4xl font-extrabold text-indigo-600">85%</p>
        <p class="mt-2">Usaha Bertahan >3 Bulan</p>
      </div>
      <div>
        <p class="text-4xl font-extrabold text-indigo-600">500+</p>
        <p class="mt-2">Ide Usaha Terverifikasi</p>
      </div>
    </section>

    <!-- Fitur Unggulan -->
    <section class="py-16 px-8 bg-gray-50 text-center">
      <h2 class="text-3xl font-bold mb-10">Fitur Unggulan JualApa</h2>
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-lg">
        <div>🔍 Cari dan telusuri ide usaha makanan/minuman</div>
        <div>📋 Lihat resep dan bahan secara lengkap</div>
        <div>💰 Estimasi biaya awal dan operasional harian</div>
        <div>🍽️ Hitung hasil produksi, harga jual, dan margin keuntungan</div>
        <div>🛒 Simulasi harga bahan dan peralatan berdasarkan data marketplace</div>
        <div>💸 Filter rekomendasi berdasarkan modal yang tersedia</div>
        <div>🏠 Pilihan model usaha: rumahan, gerobak, atau keliling</div>
        <div>✅ Tanda verifikasi produk oleh ahli</div>
        <div>⭐ Tandai produk favorit</div>
        <div>👁️ Statistik jumlah dilihat</div>
      </div>
    </section>

    <!-- Tim Kami -->
    <section class="py-16 px-10 bg-white">
      <h2 class="text-3xl font-bold text-center mb-10">Tim di Balik Inovasi JualApa</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div>
          <img src="/src/assets/images/sidebanner.jpg" class="w-28 h-28 rounded-[30%] mx-auto mb-4 shadow-md" />
          <p class="font-semibold">Anisa Putri</p>
          <p class="text-sm text-gray-500">CEO</p>
        </div>
        <div>
          <img src="/src/assets/images/sidebanner.jpg" class="w-28 h-28 rounded-[30%] mx-auto mb-4 shadow-md" />
          <p class="font-semibold">Rian Maulana</p>
          <p class="text-sm text-gray-500">CTO</p>
        </div>
        <div>
          <img src="/src/assets/images/sidebanner.jpg" class="w-28 h-28 rounded-[30%] mx-auto mb-4 shadow-md" />
          <p class="font-semibold">Dewi Ayu</p>
          <p class="text-sm text-gray-500">Head of Product</p>
        </div>
        <div>
          <img src="/src/assets/images/sidebanner.jpg" class="w-28 h-28 rounded-[30%] mx-auto mb-4 shadow-md" />
          <p class="font-semibold">Bagas Nugroho</p>
          <p class="text-sm text-gray-500">Community Manager</p>
        </div>
      </div>
    </section>

    <!-- Testimoni -->
    <section class="bg-gray-50 py-16 px-8">
      <h2 class="text-3xl font-bold text-center mb-10">Testimoni Pengguna</h2>
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div class="bg-white shadow-lg p-6 rounded-xl">
          <p>"Saya mulai jualan es kopi dengan bantuan JualApa. Untungnya stabil!"</p>
          <p class="mt-4 font-semibold">— Dinda, Mahasiswi</p>
        </div>
        <div class="bg-white shadow-lg p-6 rounded-xl">
          <p>"Panduan dan simulasinya sangat membantu. Gak bingung mulai dari mana."</p>
          <p class="mt-4 font-semibold">— Agus, Karyawan</p>
        </div>
        <div class="bg-white shadow-lg p-6 rounded-xl">
          <p>"Akhirnya punya usaha sendiri dari ide yang saya temukan di JualApa."</p>
          <p class="mt-4 font-semibold">— Riko, Pelajar</p>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-indigo-600 text-white text-center">
      <h2 class="text-3xl font-bold mb-4">Siap Memulai Usaha Pertamamu?</h2>
      <p class="mb-6 text-lg">Bergabung sekarang dan temukan ide jualan terbaik sesuai modal dan minatmu!</p>
      <button class="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">Gabung Sekarang</button>
    </section>
  </div>
  <FooterApp/>
</template>

<script setup>
import AppBar from '../components/AppBar.vue';
import FooterApp from '../components/FooterApp.vue';

</script>