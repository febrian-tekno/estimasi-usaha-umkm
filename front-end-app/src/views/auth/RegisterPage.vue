<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200/100 via-white/100 to-blue-200/100">
    <div class="bg-white/80 p-5 rounded-xl shadow-xl w-full max-w-5xl flex overflow-hidden">
      <div class="w-full md:w-1/2 p-10 flex flex-col justify-center space-y-6">
        <a href="/" class="text-sm text-gray-600 hover:underline">← Kembali ke Beranda</a>
        <AppLogo/>
        <h2 class="text-3xl font-bold">Create an Account!</h2>
        <p class="text-gray-500 text-sm">Join now to JualApa and start your bussiness</p>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <input
              v-model="username"
              type="username"
              placeholder="Username"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              :class="{ 'border-red-500': username && !isUsernameValid }"
              required
            />
            <p v-if="username && !isUsernameValid" class="text-red-500 text-xs mt-1">Username must be 3–20 characters and only use letters, numbers, underscores (_) or dots (.)</p>
          </div>

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

          <div>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              :class="{ 'border-red-500': confirmPassword  && !isPasswordMatch}"
              required
            />
            <p v-if="confirmPassword && !isPasswordMatch" class="text-red-500 text-xs mt-1">
              Password mismatch
            </p>
          </div>

          <!-- Button -->
          <AppButton
            :text="'Register'"
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
          Already have an Account? <span class="font-medium text-black hover:underline cursor-pointer"><a href="/auth/login">sign in</a></span>.
        </div>

        <p class="text-xs text-gray-400 text-center">Privacy Policy</p>
      </div>
      <SideBanner></SideBanner>
    </div>

  </div>
</template>

<script setup>
const urlRegisterBE = import.meta.env.VITE_USER_BASE_URL;
import { ref, computed} from 'vue';
import axios from 'axios';
import AppButton from '@/components/global/AppButton.vue';
import GoogleAuthButton from '@/components/auth/GoogleAuthButton.vue';
import SideBanner from '@/components/auth/SideBanner.vue';
import Swal from 'sweetalert2';
import AppLogo from '../../components/global/AppLogo.vue';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const loading = ref(false);

const isUsernameValid = computed(() => /^[a-zA-Z0-9._]{3,20}$/.test(username.value));
const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
const isPasswordValid = computed(() => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password.value));
const isPasswordMatch = computed(() => password.value === confirmPassword.value);
const isFormValid = computed(() => isUsernameValid.value&& isEmailValid.value && isPasswordValid.value && isPasswordMatch.value );

const handleSubmit = async () => {
  if (!isFormValid.value) return;

  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const res = await axios.post(urlRegisterBE, {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    if (res.data.status === 'success') {
      await Swal.fire({
        title: 'Success!',
        text: 'Check your email for verify your Account!',
        icon: 'success',
        confirmButtonText: 'Continue',
      });

    } else {
      await Swal.fire({
        title: 'Error',
        text: res.data.message || 'Register failed.',
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


</script>
