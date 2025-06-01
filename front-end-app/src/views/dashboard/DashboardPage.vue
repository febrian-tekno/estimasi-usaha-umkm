<template>
  <template v-if="auth.isAdmin">
    <AdminDashboardPage/>
  </template>
    <template v-else>
      <UserDashboardPage/>
    </template>
</template>

<script setup>
import AdminDashboardPage from './AdminDashboardPage.vue';
import UserDashboardPage from './UserDashboardPage.vue';

import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();


</script>