import { createRouter, createWebHistory } from 'vue-router';
import notFoundRoutes from './notfound.routes';
import LandingPage from '../views/LandingPage.vue';
import authRoutes from './auth.routes';
import AboutPage from '../views/AboutPage.vue';
import ProductsPage from '../views/ProductsPage.vue';
import PrivacyPolicyPage from '../views/PrivacyPolicyPage.vue';
import TermsOfServicePage from '../views/TermsOfServicePage.vue';
import contactUsPage from '../views/contactUsPage.vue';
import AdminDashboardPage from '../views/dashboard/AdminDashboardPage.vue';
import UserDashboardPage from '../views/dashboard/UserDashboardPage.vue';
import AddNewProducts from '../components/AddNewProducts.vue';
import AddIngredient from '../components/AddIngredient.vue';

const routes = [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path: '/about',
    component: AboutPage,
  },
  {
    path: '/products',
    component: ProductsPage,
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
    component: AdminDashboardPage,
  },
  {
    path: '/dashboard-user',
    component: UserDashboardPage,
  },
  {
    path: '/add-product',
    component: AddNewProducts,
  },
  {
    path: '/add-ingredient',
    component: AddIngredient,
  },

  ...authRoutes,
  ...notFoundRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
