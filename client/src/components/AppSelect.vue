<script setup lang="ts">
  const emit = defineEmits(['selected']);

  const handleSelected = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('selected', target.value);
  };
</script>

<template>
  <select
    @change="handleSelected"
    class="text-neutral-900">
    <slot name="options" />
  </select>
</template>
