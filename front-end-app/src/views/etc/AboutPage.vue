<template>
  <AppBar/>
  <div class="text-gray-800"  >
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-orange-300 to-peach-200 text-black py-20 text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Memberdayakan Wirausaha Makanan & Minuman</h1>
      <p class="text-lg max-w-2xl mx-auto">Platform komunitas untuk membuat perhitungan estimasi usaha kuliner secara mudah, akurat, dan terpercaya.</p>
    </section>

    <!-- Visi & Misi -->
    <section class="space-y-16 px-10 py-16">
      <h2 class="font-bold text-4xl text-gray-800">Tentang JualApa</h2>

      <!-- Baris 1: Visi -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/5537/5537491.png" alt="Ilustrasi Visi" class="w-full max-w-sm rounded-xl m-auto shadow-md" />
        </div>
        <div>
          <h2 class="text-2xl font-bold mb-4">Visi Kami</h2>
          <p class="text-lg text-gray-700">
            Menjadi platform utama bagi pelaku UMKM makanan dan minuman untuk mendapatkan data bahan, estimasi modal, dan panduan usaha yang akurat melalui kontribusi komunitas.
          </p>
        </div>
      </div>

      <!-- Baris 2: Misi -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div class="order-2 md:order-1">
          <h2 class="text-2xl font-bold mb-4">Misi Kami</h2>
          <p class="text-lg text-gray-700">
            Menyediakan database bahan baku, kemasan, dan peralatan yang terus diperbarui oleh komunitas, lengkap dengan simulasi biaya produksi dan potensi keuntungan, agar pemula dapat memulai usaha kuliner dengan percaya diri.
          </p>
        </div>
        <div class="order-1 md:order-2">
          <img src="https://static.vecteezy.com/system/resources/previews/027/076/588/non_2x/target-icon-transparent-free-png.png" alt="Ilustrasi Misi" class="w-full ml-auto max-w-sm rounded-xl shadow-md" />
        </div>
      </div>
    </section>

    <!-- Cara Kerja -->
    <section class="bg-indigo-50 py-16 px-10 text-center">
      <h2 class="text-3xl font-bold mb-8">Cara Kerja JualApa</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-left">
        <div class="bg-white rounded-2xl shadow p-6">
          <h3 class="font-bold text-xl mb-2">1. Eksplor Ide</h3>
          <p>Cari ide usaha makanan/minuman yang sudah diinput komunitas, lengkap dengan resep dan bahan baku.</p>
        </div>
        <div class="bg-white rounded-2xl shadow p-6">
          <h3 class="font-bold text-xl mb-2">2. Simulasikan Biaya</h3>
          <p>Hitung modal produksi per batch berdasarkan kontribusi harga bahan, kemasan, dan alat dari komunitas.</p>
        </div>
        <div class="bg-white rounded-2xl shadow p-6">
          <h3 class="font-bold text-xl mb-2">3. Bandingkan & Revisi</h3>
          <p>Bandingkan beberapa ide, dapatkan masukan, dan revisi estimasi sesuai pengalaman pengguna lain.</p>
        </div>
        <div class="bg-white rounded-2xl shadow p-6">
          <h3 class="font-bold text-xl mb-2">4. Mulai & Verifikasi</h3>
          <p>Gunakan panduan lengkap untuk memulai usaha dan dapatkan label terverifikasi dari admin untuk kredibilitas.</p>
        </div>
      </div>
    </section>

    <!-- Tentang JualApa Detail -->
    <div class="container mx-auto bg-white w-full py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <img src="@/assets/images/logo.jpg" alt="Tentang Kami" class="w-full rounded-xl shadow-md" />
      </div>
      <div>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Apa itu JualApa?</h2>
        <p class="text-gray-600 mb-4 text-justify">
          JualApa adalah platform komunitas berbasis web yang membantu pelaku UMKM makanan dan minuman membuat perhitungan estimasi modal dan keuntungan secara praktis.
        </p>
        <p class="text-gray-600 mb-4 text-justify">
          Pengguna dapat menemukan data bahan baku, kemasan, dan alat yang telah diinput oleh komunitas. Setiap entri dilengkapi gambar, rincian harga, serta tips penggunaan. Admin melakukan verifikasi untuk memastikan kualitas data.
        </p>
        <p class="text-gray-600 mb-2">Dengan fitur yang mudah digunakan, pengguna dapat:</p>
        <ul class="list-disc pl-5 text-gray-600">
          <li>Memasukkan dan memperbarui data bahan, kemasan, dan alat secara crowdsourced</li>
          <li>Melakukan simulasi biaya produksi dan potensi keuntungan per batch maupun per bulan</li>
          <li>Melihat estimasi usaha milik pengguna lain sebagai referensi dan inspirasi</li>
        </ul>
      </div>
    </div>

    <!-- Statistik -->
    <section class="py-16 px-6 bg-white text-center grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <p class="text-4xl font-extrabold text-indigo-600">1500+</p>
        <p class="mt-2">Ide Usaha Makanan & Minuman</p>
      </div>
      <div>
        <p class="text-4xl font-extrabold text-indigo-600">12.000+</p>
        <p class="mt-2">Pengguna Aktif</p>
      </div>
      <div>
        <p class="text-4xl font-extrabold text-indigo-600">100+</p>
        <p class="mt-2">Kontributor Komunitas</p>
      </div>
      <div>
        <p class="text-4xl font-extrabold text-indigo-600">700+</p>
        <p class="mt-2">Ide Usaha Terverifikasi</p>
      </div>
    </section>

    <!-- Fitur Unggulan -->
    <section class="py-16 px-6 bg-gray-50">
      <h2 class="text-3xl font-bold text-center mb-10">Fitur Unggulan JualApa</h2>
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
        <div class="bg-white p-6 rounded-lg shadow">
          🔍 Temukan ide usaha makanan/minuman lengkap dengan resep dan data bahan komunitas.
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          💰 Simulasikan perhitungan modal, biaya harian, dan potensi keuntungan.
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          🛠️ Akses database kemasan dan alat dapur dengan gambar dan detail harga.
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          ⭐ Lihat ide usaha terpopuler, rating komunitas, dan label terverifikasi.
        </div>
      </div>
    </section>

    <!-- Tim Kami -->
    <section class="py-16 px-10 bg-white">
      <h2 class="text-3xl font-bold text-center mb-10">Tim di Balik JualApa</h2>
      <div class="flex justify-center">
        <div class="text-center">
          <img src="@/assets/images/defaultPictureUser.jpg" class="w-28 h-28 rounded-[30%] mx-auto mb-4 shadow-md" />
          <p class="font-semibold">Putra Febrian</p>
          <p class="text-sm text-gray-500">Founder & Pengembang</p>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-gradient-to-r from-orange-300 to-orange-200 text-black text-center">
      <h2 class="text-3xl font-bold mb-4">Siap Mewujudkan Ide Usaha Kuliner?</h2>
      <p class="mb-6 text-lg">Bergabunglah dengan komunitas kami dan mulai hitung estimasi usaha makanan & minuman sekarang juga!</p>
      <a href="/auth/register" class="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">Gabung Sekarang</a>
    </section>

  </div>
  <FooterApp/>
</template>

<script setup>
import AppBar from '@/components/global/AppBar.vue';
import FooterApp from '@/components/global/FooterApp.vue';
</script>
