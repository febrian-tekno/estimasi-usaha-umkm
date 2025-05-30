<template>
  <button
    class="w-full flex items-center justify-center border border-gray-300 rounded py-2 hover:bg-gray-100"
    @click="redirectToGoogleAuth"
  >
    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="w-5 h-5 mr-2" />
    Log in with Google
  </button>
</template>

<script setup>
const googleAuthUrl = import.meta.env.VITE_GOOGLE_AUTH_URL;
const redirectToGoogleAuth = () => {
  window.location.href = googleAuthUrl;
};
</script>
