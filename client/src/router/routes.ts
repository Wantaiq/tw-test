import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ProductsView from '@/views/ProductsView.vue';

const routes = [
  {
    path: '/',
    name: 'products',
    component: ProductsView,
    meta: {
      layout: DefaultLayout,
    },
  },
];

export default routes;
