<template>
    <div style="min-height: 100vh; display: flex; flex-direction: column;">
    <AppBar />
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
    <div style="margin-top: -150px;">
        <svg width="500" height="400" viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="50%" text-anchor="middle" fill="#888" font-size="200px" font-family="Arial, sans-serif" dy=".3em">
            404
        </text>
        <text x="50%" y="70%" text-anchor="middle" fill="#aaa" font-size="24px" font-family="Arial, sans-serif">
            Halaman Tidak Ditemukan
        </text>
        <text x="50%" y="75%" text-anchor="middle" fill="#aaa" font-size="24px" font-family="Arial, sans-serif">
            Kayaknya kamu nyasar, nih 🧭
        </text>
        </svg>
    </div>
    </div>
    <FooterApp />
  </div>
</template>

<script setup>
import AppBar from '@/components/global/AppBar.vue';
import FooterApp from '@/components/global/FooterApp.vue';

</script>
