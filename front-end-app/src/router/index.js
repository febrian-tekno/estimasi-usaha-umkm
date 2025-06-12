// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import HomePage from '@/views/HomePage.vue';
import notFoundRoutes from './notfound.routes';
import authRoutes from './auth.routes';
import AboutPage from '@/views/etc/AboutPage.vue';
import PrivacyPolicyPage from '@/views/etc/PrivacyPolicyPage.vue';
import TermsOfServicePage from '@/views/etc/TermsOfServicePage.vue';
import contactUsPage from '@/views/etc/contactUsPage.vue';
import AdminDashboardPage from '@/views/dashboard/AdminDashboardPage.vue';
import UserDashboardPage from '@/views/dashboard/UserDashboardPage.vue';
import productsRoutes from './products.routes';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about',
    component: AboutPage,
  },
  {
    path: '/privacy-policy',
    component: PrivacyPolicyPage,
  },
  {
    path: '/terms-of-service',
    component: TermsOfServicePage,
  },
  {
    path: '/contact',
    component: contactUsPage,
  },
  {
    path: '/dashboard',
    component: UserDashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/admin',
    component: AdminDashboardPage,
    meta: { requiresAuth: true, role: 'admin' },
  },
  ...productsRoutes,
  ...authRoutes,
  ...notFoundRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

// Hanya dua path ini yang diblok untuk authenticated user
const guestOnlyPaths = ['/auth/login', '/auth/register'];

router.beforeEach(async (to, from, next) => {
  const baseUrl = import.meta.env.VITE_USER_BASE_URL;
  const auth = useAuthStore();
  try {
    const res = await axios.get(`${baseUrl}/me`, { withCredentials: true });
    auth.user = res.data.data;
  } catch {
    auth.user = null;
  }

  // kalau sudah login tapi akses login/register → ke dashboard
  if (auth.user && guestOnlyPaths.includes(to.path)) {
    return next('/dashboard');
  }
  // kalau butuh auth tapi belum login → login
  if (to.meta.requiresAuth && !auth.user) {
    return next('/auth/login');
  }
  // role check
  if (to.meta.role && auth.user?.role !== to.meta.role) {
    return next('/unauthorized');
  }
  next();
});

export default router;
