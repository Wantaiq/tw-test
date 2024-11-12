<script setup lang="ts">
  import useProductsStore from '@/stores/productsStore';
  import { storeToRefs } from 'pinia';
  const { products } = storeToRefs(useProductsStore());

  const handleStockFilter = (event: Event) => {
    const eventTarget = event.target as HTMLInputElement;
    if (eventTarget.checked) {
      products.value.filter(product => {
        console.log(product.availabilityStatus === 'In Stock');
        return product.availabilityStatus === 'In Stock';
      });
    } else {
    }
  };
</script>

<template>
  <label for="showOnlyInStock">Show only available items</label>
  <input
    type="checkbox"
    id="showOnlyInStock"
    name="showOnlyStocked"
    @change="handleStockFilter" />
</template>
