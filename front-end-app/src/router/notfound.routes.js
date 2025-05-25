import NotFound from '../views/NotFound.vue';

export default [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];
