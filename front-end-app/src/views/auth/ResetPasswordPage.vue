<template>
  <AppBar />

  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200/100 via-white/100 to-blue-200/100">
    <div class="min-h-[calc(100vh-4rem)] my-8 bg-white/80 p-5 rounded-xl shadow-xl w-full max-w-5xl flex justify-center overflow-hidden">
      <div class="w-full max-w-md p-6 md:p-10 mx-auto flex flex-col justify-start items-center space-y-6">

        <!-- Loading -->
        <IndikatorLoading v-if="mode === MODE.LOADING" text="Loading ..." />

        <!-- Success Message -->
        <StatusResult
          v-else-if="mode === MODE.SUCCESS"
          status="success"
          title="Password changed successfully!"
          description="Congratulations! Your account password has been changed."
          link-href="/auth/login"
          button-text="Go to Login Page"
        />

        <!-- Failed Message -->
        <StatusResult
          v-else-if="mode === MODE.FAILED"
          status="failed"
          title="Reset password link expired"
          description="Looks like the reset password link has expired. No worries, we can send the link again."
          link-href="/auth/reset-password"
          button-text="Resend Reset Password Link"
        />

        <!-- Password Reset Form -->
        <div v-else-if="mode === MODE.FORM_RESET" class="min-w-[25rem]">
          <div class="w-full text-left space-y-2">
            <h2 class="text-3xl font-bold">Reset Password</h2>
            <p class="text-gray-600 text-sm leading-relaxed">
              Create your new password
            </p>
            <br />
          </div>

          <form class="w-full space-y-4" @submit.prevent="submitNewPassword">
            <!-- New Password -->
            <div>
              <label class="block text-sm text-gray-700">New Password:</label>
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

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm text-gray-700">Confirm Password:</label>
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
                :class="{ 'border-red-500': confirmPassword && !isPasswordMatch }"
                required
              />
              <p v-if="confirmPassword && !isPasswordMatch" class="text-red-500 text-xs mt-1">
                Password mismatch
              </p>
            </div>

            <AppButton
              text="Create Password"
              color="yellow"
              :loading="loading"
              :disabled="!isFormResetValid || loading"
            />
          </form>
        </div>

        <!-- Email Input Form -->
        <div v-else-if="mode === MODE.FORM_EMAIL">
          <EmailForm
            title="Reset Password"
            description="We will send a password reset email to your email. <br />Check inbox, spam, or trash."
            buttonText="Send Link"
            v-model:email="email"
            :loading="loading"
            @submit="submitEmail"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

import AppBar from '../../components/AppBar.vue';
import AppButton from '../../components/AppButton.vue';
import IndikatorLoading from '../../components/IndikatorLoading.vue';
import EmailForm from '../../components/child/EmailForm.vue'
import StatusResult from '../../components/StatusResult.vue';

// Mode constants
const MODE = {
  FORM_EMAIL: 'form-email',
  FORM_RESET: 'form-reset',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILED: 'failed',
};

// Reactive States
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const mode = ref(MODE.FORM_EMAIL); // 'form' | 'loading' | 'form-reset' | 'success' | 'failed'

// Computed
const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
const isPasswordValid = computed(() => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password.value));
const isPasswordMatch = computed(() => password.value === confirmPassword.value);

const isFormValid = computed(() => isEmailValid.value && email.value.length > 0);
const isFormResetValid = computed(() => isPasswordValid.value && isPasswordMatch.value);

// Constants
const route = useRoute();
const baseUrlAuthBE = import.meta.env.VITE_AUTH_BASE_URL;


// Handlers
const submitEmail = async () => {
  if (!isFormValid.value || loading.value) return;
  loading.value = true;

  try {
    const { data } = await axios.post(`${baseUrlAuthBE}/reset-password`, { email: email.value }, { withCredentials: true });

    if (data.status === 'success') {
      await Swal.fire('Success!', 'Reset password link has been sent!', 'success');
    } else {
      await Swal.fire('Error', data.message || 'Failed to send.', 'error');
    }
  } catch (err) {
    await Swal.fire('Oops!', err.response?.data?.message || 'Something went wrong.', 'error');
  } finally {
    loading.value = false;
  }
};

const submitNewPassword = async () => {
  if (!isFormResetValid.value || loading.value) return;
  loading.value = true;

  try {
    const { token } = route.query;
    const { data } = await axios.post(
      `${baseUrlAuthBE}/reset-password/confirm`,
      { newPassword: password.value, token },
      { withCredentials: true }
    );

    mode.value = data.status === 'success' ? MODE.SUCCESS : MODE.FAILED;
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    mode.value = MODE.FAILED;
  } finally {
    loading.value = false;
  }
};

// Token validation on mount
onMounted(async () => {
  const { token } = route.query;
  if (token) {
    mode.value = MODE.LOADING;
    try {
      const { data } = await axios.post(
        `${baseUrlAuthBE}/reset-password/validate`,
        { token },
        { withCredentials: true }
      );
      mode.value = data.status === 'success' ? MODE.FORM_RESET : MODE.FAILED;
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      mode.value = MODE.FAILED;
    }
  }
});
</script>
