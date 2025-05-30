import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ProductsPage from '../views/ProductsPage.vue';
// import notFoundRoutes from './notfound.routes';
// import authRoutes from './auth.routes';
// import AboutPage from '../views/AboutPage.vue';
// import PrivacyPolicyPage from '../views/etc/PrivacyPolicyPage.vue';
// import TermsOfServicePage from '../views/etc/TermsOfServicePage.vue';
// import contactUsPage from '../views/contactUsPage.vue';
// import AdminDashboardPage from '../views/dashboard/AdminDashboardPage.vue';
// import UserDashboardPage from '../views/dashboard/UserDashboardPage.vue';
// import AddNewProducts from '../components/products/AddNewProducts.vue';
// import AddIngredient from '../components/ingredients/AddIngredient.vue';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  // {
  //   path: '/about',
  //   component: AboutPage,
  // },
  {
    path: '/products',
    component: ProductsPage,
  },
  // {
  //   path: '/privacy-policy',
  //   component: PrivacyPolicyPage,
  // },
  // {
  //   path: '/terms-of-service',
  //   component: TermsOfServicePage,
  // },
  // {
  //   path: '/contact',
  //   component: contactUsPage,
  // },
  // {
  //   path: '/dashboard',
  //   component: AdminDashboardPage,
  // },
  // {
  //   path: '/dashboard-user',
  //   component: UserDashboardPage,
  // },
  // {
  //   path: '/add-product',
  //   component: AddNewProducts,
  // },
  // {
  //   path: '/add-ingredient',
  //   component: AddIngredient,
  // },

  // ...authRoutes,
  // ...notFoundRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
