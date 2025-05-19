import { createRouter, createWebHistory } from 'vue-router';
import notFoundRoutes from './notfound';
import HomePage from '../views/HomePage.vue';
import SignInPage from '../views/LoginPage.vue';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: SignInPage,
  },
  ...notFoundRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
