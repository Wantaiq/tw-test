<script setup lang="ts">
  import ProductFilter from '@/components/ProductFilter.vue';
  import ProductGrid from '@/components/ProductGrid.vue';
  import ProductSort from '@/components/ProductSort.vue';
  import useProductFilters from '@/composables/useProductsSort';
  import useProductsApi, {
    type ProductType,
  } from '@/composables/useProductsApi';
  import { ref, watch } from 'vue';

  const { loadMoreQuery } = useProductsApi();
  const {
    data: queriedProductPages,
    fetchNextPage,
    hasNextPage,
  } = loadMoreQuery();
  const { sortByPrice } = useProductFilters();

  const extractProductsFromPages = () => {
    return (
      queriedProductPages.value?.pages.reduce<ProductType[] | []>(
        (prev, curr) => {
          return [...curr.products, ...prev];
        },
        [],
      ) || []
    );
  };

  const filteredProducts = ref(extractProductsFromPages());
  const sortPreference = ref('');
  const stockFilterPreference = ref(false);

  const handleSort = (value: string) => {
    sortPreference.value = value;
    if (sortPreference.value === 'prAsc') {
      filteredProducts.value = sortByPrice(filteredProducts.value, true);
    } else if (sortPreference.value === 'prDesc') {
      filteredProducts.value = sortByPrice(filteredProducts.value, false);
    }
  };

  const handleStockFilter = (isChecked: boolean) => {
    stockFilterPreference.value = isChecked;
    if (stockFilterPreference.value) {
      filteredProducts.value = filteredProducts.value.filter(
        product => product.availabilityStatus !== 'Low Stock',
      );
    } else {
      filteredProducts.value = extractProductsFromPages();
    }

    if (sortPreference.value) {
      handleSort(sortPreference.value);
    }
  };

  watch(queriedProductPages, newData => {
    if (newData) {
      filteredProducts.value = extractProductsFromPages();
      handleStockFilter(stockFilterPreference.value);
    }
  });
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
  <button
    class="bg-blue-400 text-neutral-300 p-2 rounded block mx-auto mt-6"
    v-if="hasNextPage"
    @click="() => fetchNextPage()">
    Load more
  </button>
</template>
