<template>
    <AppBar></AppBar>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200/100 via-white/100 to-blue-200/100">
    <div class="bg-white/80 p-5 rounded-xl shadow-xl w-full max-w-5xl flex overflow-hidden">
      <SideBanner></SideBanner>
      <div class="w-full md:w-1/2 p-10 flex flex-col justify-center space-y-6">
        <AppLogo />
        <h2 class="text-3xl font-bold">WELCOME BACK!</h2>
        <p class="text-gray-500 text-sm">Please enter log in details below</p>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              :class="{ 'border-red-500': email && !isEmailValid }"
              required
            />
            <p v-if="email && !isEmailValid" class="text-red-500 text-xs mt-1">Invalid email format</p>
          </div>

          <div>
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              :class="{ 'border-red-500': password && !isPasswordValid }"
              required
            />
            <p v-if="password && !isPasswordValid" class="text-red-500 text-xs mt-1">
              Password must be at least 8 characters and contain both letters and numbers
            </p>
          </div>

          <div class="text-right text-sm text-gray-500 hover:underline cursor-pointer">
            <a href="/auth/reset-password">Forgot Password?</a>
          </div>

          <!-- Button -->
          <AppButton
            :text="'Log In'"
            color="yellow"
            :loading="loading"
            :disabled="!isFormValid"
          />
        </form>

        <div class="flex items-center my-2">
          <div class="flex-grow border-t border-gray-300"></div>
          <span class="mx-4 text-gray-500 text-sm">or continue</span>
          <div class="flex-grow border-t border-gray-300"></div>
        </div>
        
        <GoogleAuthButton />

        <div class="text-center text-sm text-gray-600">
          Don’t have an account? <span class="font-medium text-black hover:underline cursor-pointer"> <a href="/auth/register">sign up</a></span>.
        </div>

        <p class="text-xs text-gray-400 text-center">Privacy Policy</p>
      </div>
    </div>
  </div>
  <FooterApp></FooterApp>
</template>

<script setup>
const urlLoginBE = 'http://localhost:3000/api/v1/auth/sessions'
import { ref, computed, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import AppLogo from '../../components/global/AppLogo.vue';
import AppBar from '../../components/global/AppBar.vue';
import AppButton from '../../components/global/AppButton.vue';
import GoogleAuthButton from '../../components/auth/GoogleAuthButton.vue';
import FooterApp from '../../components/global/FooterApp.vue';
import SideBanner from '../../components/auth/SideBanner.vue';
import Swal from 'sweetalert2';

const route = useRoute();

const email = ref('');
const password = ref('');
const loading = ref(false);

const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
const isPasswordValid = computed(() => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password.value));
const isFormValid = computed(() => isEmailValid.value && isPasswordValid.value);

const handleSubmit = async () => {
  if (!isFormValid.value) return;

  loading.value = true;

  try {
    const res = await axios.post(urlLoginBE, {
      email: email.value,
      password: password.value,
    },{
      withCredentials: true,
    });

    if (res.data.status === 'success') {
      await Swal.fire({
        title: 'Success!',
        text: 'Login successful!',
        icon: 'success',
        confirmButtonText: 'Continue',
      });
      window.location.href = '/';

    } else {
      await Swal.fire({
        title: 'Error',
        text: res.data.message || 'Login failed.',
        icon: 'error',
      });
    }
  } catch (err) {
    await Swal.fire({
      title: 'Oops!',
      text: err.response?.data?.message || 'Something went wrong.',
      icon: 'error',
    });
  } finally {
    loading.value = false;
  }
};

// Ini bagian tambahan untuk cek query dari Google login redirect
onMounted(() => {
  const { provider, status, message } = route.query;
  if (provider && status === 'success') {
    Swal.fire({
      title: 'Login Success!',
      text: message || 'You have successfully logged in.',
      icon: 'success',
      confirmButtonText: 'Continue',
    }).then(() => {
      window.location.href = '/';
    })
  } else if (provider && status === 'failed') {
    Swal.fire({
      title: 'Login Failed',
      text: message || 'Failed to login.',
      icon: 'error',
      confirmButtonText: 'OK',
    }).then(() => {
      window.location.href = '/auth/login';
    });;
  }
});

</script>
