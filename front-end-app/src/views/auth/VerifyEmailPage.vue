<template>
  <AppBar></AppBar>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-white to-blue-200">
    <div class="min-h-[calc(100vh-4rem)] my-8 bg-white/80 p-5 rounded-xl shadow-xl w-full max-w-5xl flex justify-center overflow-hidden">
      <div class="w-full max-w-md p-6 md:p-10 mx-auto flex flex-col justify-start items-center space-y-6">

        <!-- Conditional Rendering -->
        <template v-if="mode === MODE.LOADING">
          <IndikatorLoading text="Verifying your account..." />
        </template>

        <template v-else-if="mode === MODE.SUCCESS">
          <StatusResult
            status="success"
            title="Account Verified!"
            description="Congratulations! Your account has been verified."
            link-href="/auth/login"
            button-text="Go to Login Page"
          />
        </template>

        <template v-else-if="mode === MODE.FAILED">
          <StatusResult
            status="failed"
            title="Email verification link expired"
            description="The verification link has expired or is invalid."
            link-href="/auth/email-verify"
            button-text="Resend verification link"
          />
        </template>

        <template v-else>
          <EmailForm
            title="Verify your Account!"
            description="We will send an email verification to your email. <br />
              Check inbox, spam, and trash folders."
            buttonText="Send Link"
            v-model:email="email"
            :loading="loading"
            @submit="submitEmail"
          />
        </template>
        
      </div>
    </div>
  </div>
  <FooterApp></FooterApp>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

import AppBar from '../../components/AppBar.vue';
import IndikatorLoading from '../../components/IndikatorLoading.vue';
import FooterApp from '../../components/FooterApp.vue';
import StatusResult from '../../components/StatusResult.vue';
import EmailForm from '../../components/child/EmailForm.vue'

// Mode constants
const MODE = {
  FORM: 'form',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILED: 'failed',
};

const email = ref('');
const loading = ref(false);
const mode = ref(MODE.FORM);

const route = useRoute();
const baseUrlAuthBE = import.meta.env.VITE_AUTH_BASE_URL;

const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
const isFormValid = computed(() => isEmailValid.value && email.value.length > 0);

// Swal helper
const showAlert = async ({ title, text, icon = 'info' }) => {
  await Swal.fire({ title, text, icon, confirmButtonText: 'OK' });
};

const submitEmail = async () => {
  if (!isFormValid.value || loading.value) return;

  loading.value = true;

  try {
    const res = await axios.post(
      `${baseUrlAuthBE}/email-verify/resend`,
      { email: email.value },
      { withCredentials: true }
    );

    if (res.data.status === 'success') {
      await showAlert({
        title: 'Success!',
        text: 'Verification link sent!',
        icon: 'success',
      });
    } else {
      await showAlert({
        title: 'Error',
        text: res.data.message || 'Failed to send.',
        icon: 'error',
      });
    }
  } catch (err) {
    await showAlert({
      title: 'Oops!',
      text: err.response?.data?.message || 'Something went wrong.',
      icon: 'error',
    });
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const { token } = route.query;
  if (token) {
    mode.value = MODE.LOADING;
    try {
      const res = await axios.post(
        `${baseUrlAuthBE}/email-verify`,
        { token },
        { withCredentials: true }
      );
      mode.value = res.data.status === 'success' ? MODE.SUCCESS : MODE.FAILED;
    } catch {
      mode.value = MODE.FAILED;
    }
  }
});
</script>
