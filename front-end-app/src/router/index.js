import { createRouter, createWebHistory } from 'vue-router';
import notFoundRoutes from './notfound.routes';
import HomePage from '../views/HomePage.vue';
import authRoutes from './auth.routes';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  ...authRoutes,
  ...notFoundRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
