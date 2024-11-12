<script setup lang="ts">
  const emit = defineEmits(['filter']);
  const handleStockFilter = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('filter', target.checked);
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
