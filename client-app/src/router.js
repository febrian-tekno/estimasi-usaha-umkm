import { createRouter, createWebHistory } from 'vue-router';
import ResepPage from './views/ResepPage.vue';
import NotFound from './views/NotFound.vue'
import DefaultPage from './views/DefaultPage.vue';

const routes = [
  { path: '/', component: DefaultPage},
  { path: '/resep/:id', component: ResepPage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
