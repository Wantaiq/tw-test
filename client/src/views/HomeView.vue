<script setup lang="ts">
  import ProductFilter from '@/components/ProductFilter.vue';
  import ProductGrid from '@/components/ProductGrid.vue';
  import ProductSort from '@/components/ProductSort.vue';
  import useProducts, { type ProductType } from '@/composables/useProducts';
  import { ref, watch, type Ref } from 'vue';

  const { data } = useProducts();
  const filteredProducts: Ref<[]> | Ref<ProductType[]> = ref([]);

  watch(data, newData => {
    if (newData) {
      filteredProducts.value = newData;
    }
  });

  const sortPreference = ref('');

  const handleSort = (value: string) => {
    sortPreference.value = value;
    if (sortPreference.value === 'prAsc') {
      filteredProducts.value = [...filteredProducts.value].sort(
        (a, b) => a.price - b.price,
      );
    } else {
      filteredProducts.value = [...filteredProducts.value].sort(
        (a, b) => a.price + b.price,
      );
    }
  };

  const handleStockFilter = (isChecked: boolean) => {
    if (isChecked) {
      filteredProducts.value = filteredProducts.value.filter(
        product => product.availabilityStatus !== 'Low Stock',
      );
    } else {
      filteredProducts.value = data.value || [];
    }

    if (sortPreference.value) {
      handleSort(sortPreference.value);
    }
  };
</script>

<template>
  <div class="flex flex-col gap-3 items-start px-5 mb-6">
    <ProductFilter @filter="handleStockFilter" />
    <ProductSort @selected-option="handleSort" />
  </div>
  <Suspense>
    <ProductGrid
      v-if="filteredProducts.length"
      :products="filteredProducts" />
    <template #fallback>Loading...</template>
  </Suspense>
</template>
