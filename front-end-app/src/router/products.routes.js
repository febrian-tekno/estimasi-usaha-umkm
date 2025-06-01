import ProductsPage from '@/views/products/ProductsPage.vue';
import DetailsProduct from '@/views/products/DetailsProduct.vue';
import AddNewProducts from '@/views/products/AddNewProducts.vue';

export default [
  {
    path: '/products/search',
    component: ProductsPage,
  },
  {
    path: '/products/add',
    component: AddNewProducts,
    meta: { requiresAuth: true },
  },
  {
    path: '/products/:id',
    component: DetailsProduct,
  },
];
