<script lang="ts" setup>
  import type { ProductType } from '@/composables/useProducts';
  import AppCard from './AppCard.vue';

  const props = defineProps<Omit<ProductType, 'availabilityStatus'>>();
  const { description, price, thumbnail, title } = props;
</script>

<template>
  <AppCard>
    <template #image>
      <img
        :src="thumbnail"
        :alt="title" />
    </template>
    <template #title>
      <h1 class="text-lg font-semibold">{{ title }}</h1>
    </template>
    <template #body>
      <p>{{ description }}</p>
    </template>
    <template #footer>
      <p class="py-1 px-2 text-sm font-semibold bg-red-400 w-fit rounded">
        € {{ price }}
      </p>
    </template>
  </AppCard>
</template>
