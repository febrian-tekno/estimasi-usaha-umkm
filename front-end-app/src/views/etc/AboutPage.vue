<template>
  <AppBar/>
  <div class="bg-white text-gray-800">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-orange-300 to-peach-200 text-black py-20 text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Memberdayakan Wirausaha Pemula</h1>
      <p class="text-lg max-w-2xl mx-auto">Mengubah cara orang memulai usaha kecil dengan rekomendasi, data, dan panduan yang jelas dan terpercaya.</p>
    </section>

    <!-- Visi & Misi -->
  <section class="space-y-16 px-10 py-16">
    <h2 class="font-bold text-4xl text-gray-800">Tentang JualApa</h2>

  <!-- Baris 1: Visi -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-1 items-center">
  <div>
    <img src="https://cdn-icons-png.flaticon.com/512/5537/5537491.png" alt="Ilustrasi Visi" class="w-full max-w-sm max-h-sm rounded-xl m-auto shadow-md" />
  </div>
  <div>
    <h2 class="text-2xl font-bold mb-4 ">Visi Kami</h2>
    <p class="text-lg text-gray-700">
      Menjadi solusi utama bagi siapa saja yang ingin memulai bisnis makanan/minuman dengan modal terbatas secara cerdas dan efisien.
    </p>
  </div>
</div>


  <!-- Baris 2: Misi -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    <div class="order-2 md:order-1">
      <h2 class="text-2xl font-bold mb-4">Misi Kami</h2>
      <p class="text-lg text-gray-700">
        Kami berkomitmen menyediakan panduan lengkap, data akurat, dan simulasi nyata agar pengguna dapat memulai usaha dengan percaya diri.
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
    <div class="container mx-auto  py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <img src="@/assets/images/logo.jpg" alt="Tentang Kami" class="w-full rounded-xl shadow-md" />
      </div>
      <div>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Apa itu JualApa?</h2>
        <p class="text-gray-600 mb-4 text-justify">
          JualApa adalah alat bantu digital yang dikembangkan untuk mempercepat proses perhitungan estimasi bisnis kuliner.
        </p>
        <p class="text-gray-600 mb-4 text-justify">
          JualApa berperan sebagai platform web untuk pelajar, mahasiswa, dan siapa pun yang ingin membuka usaha makanan atau
          minuman dengan modal kecil. Kami memberi rekomendasi produk lengkap dengan resep, rincian biaya, simulasi harga jual,
          hingga margin keuntungan.
        </p>
        <p class="text-gray-600 mb-2">Dengan fitur yang mudah digunakan, pengguna dapat:</p>
        <ul class="list-disc pl-5 text-gray-600">
          <li>Menghitung kebutuhan modal awal</li>
          <li>Menentukan harga jual yang kompetitif</li>
          <li>Memperkirakan potensi keuntungan</li>
        </ul>
      </div>
    </div>


    <!-- Statistik -->
    <section class="py-16 px-6 bg-white text-center grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <p class="text-4xl font-extrabold text-indigo-600">1000+</p>
        <p class="mt-2">ide usaha Produk makanan dan minuman</p>
      </div>
      <div>
        <p class="text-4xl font-extrabold text-indigo-600">10.000+</p>
        <p class="mt-2">Pengguna Aktif</p>
      </div>
      <div>
        <p class="text-4xl font-extrabold text-indigo-600">50+</p>
        <p class="mt-2">Contributor jualApa</p>
      </div>
      <div>
        <p class="text-4xl font-extrabold text-indigo-600">500+</p>
        <p class="mt-2">Ide Usaha Terverifikasi ahli</p>
      </div>
    </section>

    <section class="py-16 px-6 bg-gray-50">
      <h2 class="text-3xl font-bold text-center mb-10">Fitur Unggulan JualApa</h2>
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
        <div class="bg-white p-6 rounded-lg shadow">
          🔍 Temukan ide usaha makanan/minuman lengkap dengan resep dan bahan baku.
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          💰 Dapatkan estimasi modal awal, biaya harian, hingga potensi keuntungan.
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          🛒 Simulasikan harga bahan dan alat dari data marketplace terkini.
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          ⭐ Tandai produk favorit dan akses statistik produk terpopuler.
        </div>
      </div>
    </section>


    <!-- Tim Kami -->
    <section class="py-16 px-10 bg-white">
      <h2 class="text-3xl font-bold text-center mb-10">Tim di Balik Inovasi JualApa</h2>
      <div class="flex justify-center">
        <div class="text-center">
          <img src="@/assets/images/defaultPictureUser.jpg" class="w-28 h-28 rounded-[30%] mx-auto mb-4 shadow-md" />
          <p class="font-semibold">Putra Febrian</p>
          <p class="text-sm text-gray-500">Founder</p>
        </div>
      </div>
    </section>


    <!-- Call to Action -->
    <section class="py-16 bg-gradient-to-r from-orange-300 to-orange-200 text-black text-center">
      <h2 class="text-3xl font-bold mb-4">Siap Memulai Usaha Pertamamu?</h2>
      <p class="mb-6 text-lg">Bergabung sekarang dan temukan ide jualan terbaik sesuai modal dan minatmu!</p>
      <a href="/auth/register" class="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">Gabung Sekarang</a>    
    </section>

  </div>
  <FooterApp/>
</template>

<script setup>
import AppBar from '@/components/global/AppBar.vue';
import FooterApp from '@/components/global/FooterApp.vue';

</script>