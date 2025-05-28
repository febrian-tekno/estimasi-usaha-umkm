import { createRouter, createWebHistory } from 'vue-router';
import notFoundRoutes from './notfound.routes';
import LandingPage from '../views/LandingPage.vue';
import authRoutes from './auth.routes';
import AboutPage from '../views/AboutPage.vue';
import ProductsPage from '../views/ProductsPage.vue';
import PrivacyPolicyPage from '../views/PrivacyPolicyPage.vue';
import TermsOfServicePage from '../views/TermsOfServicePage.vue';
import contactUsPage from '../views/contactUsPage.vue';

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
  ...authRoutes,
  ...notFoundRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
