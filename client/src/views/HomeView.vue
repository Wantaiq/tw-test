<script setup lang="ts">
  import ProductFilter from '@/components/ProductFilter.vue';
  import ProductGrid from '@/components/ProductGrid.vue';
  import ProductSort from '@/components/ProductSort.vue';
  import useProducts from '@/composables/useProducts';
  import useProductsStore from '@/stores/productsStore';
  import { storeToRefs } from 'pinia';
  import { watch } from 'vue';
  const { data } = useProducts();
  const { products } = storeToRefs(useProductsStore());

  watch(data, newData => {
    if (newData) {
      products.value = newData;
    }
  });

  const handleSort = (value: string) => {
    if (value === 'prAsc') {
      products.value = [...products.value].sort((a, b) => a.price - b.price);
    } else {
      products.value = [...products.value].sort((a, b) => a.price + b.price);
    }
  };
</script>

<template>
  <div class="flex flex-col gap-3 items-start px-5 mb-6">
    <ProductFilter />
    <ProductSort @selected-option="handleSort" />
  </div>
  <Suspense>
    <ProductGrid
      v-if="products.length"
      :products="products" />
    <template #fallback>Loading...</template>
  </Suspense>
</template>
