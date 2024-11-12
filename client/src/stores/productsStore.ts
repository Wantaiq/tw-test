import type { ProductType } from '@/composables/useProducts';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

const useProductsStore = defineStore('products', () => {
  const products: Ref<ProductType[]> | Ref<[]> = ref([]);

  return { products };
});

export default useProductsStore;
