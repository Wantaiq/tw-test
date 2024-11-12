<script setup lang="ts">
  import type { ProductType } from '@/composables/useProducts';
  import ProductCard from './ProductCard.vue';

  type ProductGridPropsType = Omit<ProductType, 'availabilityStatus'>[];
  const props = defineProps<{ products: ProductGridPropsType }>();
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2
      justify-items-center">
    <ProductCard
      v-for="product in props.products"
      :key="product.id"
      :description="product.description"
      :price="product.price"
      :title="product.title"
      :thumbnail="product.thumbnail"
      :id="product.id" />
  </div>
</template>
