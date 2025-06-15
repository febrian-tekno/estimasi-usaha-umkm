<template>
  <button @click="logOutHandle"
          class="text-1xl bg-red-500 px-5 py-2 rounded font-bold text-gray-800 mb-8 flex items-center gap-2">
    <i class="fas fa-sign-out-alt"></i>
    <span class="hidden sm:inline">Log out</span>
  </button>
</template>


<script setup>
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

// eslint-disable-next-line no-unused-vars
const authStore = useAuthStore();
const router = useRouter()

const baseUrlAuth = import.meta.env.VITE_AUTH_BASE_URL

async function logOutHandle() {
  const auth = useAuthStore();
  const result = await Swal.fire({
    title: 'Yakin ingin logout?',
    text: 'Kamu akan keluar dari akun ini.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Lanjutkan',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
  });

  if (!result.isConfirmed) return;

  try {
    await axios.delete(`${baseUrlAuth}/sessions`, {
      withCredentials: true,
    });
    delete axios.defaults.headers.common.Authorization;

    // Hapus state user di pinia
    auth.user = null;
    auth.isLogin = false;
    auth.isAdmin = false;

    router.push('/')

    Swal.fire('Berhasil Logout', '', 'success');
  } catch (error) {
    Swal.fire('Gagal Logout', 'Terjadi kesalahan saat logout', 'error');
    console.error(error);
  }
}

</script>