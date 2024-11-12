<script setup lang="ts">
  import AppSelect from './AppSelect.vue';

  const emit = defineEmits(['selectedOption']);
  const sortOptions = [
    {
      name: 'Price Asc',
      value: 'prAsc',
      selected: false,
    },
    {
      name: 'Price desc',
      value: 'prDesc',
      selected: true,
    },
  ];

  const handleSelect = (selectedValue: string) => {
    emit('selectedOption', selectedValue);
  };
</script>

<template>
  <AppSelect @selected="handleSelect">
    <template #options>
      <option
        v-for="option in sortOptions"
        :key="option.name"
        :selected="option.selected"
        :value="option.value">
        {{ option.name }}
      </option>
    </template>
  </AppSelect>
</template>
