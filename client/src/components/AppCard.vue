<template>
  <div
    class="flex flex-col gap p-6 rounded-lg bg-neutral-800 border border-neutral-700
      md:max-w-80">
    <div v-if="$slots.image">
      <slot name="image" />
    </div>
    <div
      v-if="$slots.title"
      class="mt-2">
      <slot name="title" />
    </div>
    <div
      v-if="$slots.body"
      class="mt-2">
      <slot name="body" />
    </div>
    <div
      v-if="$slots.footer"
      class="mt-2">
      <slot name="footer" />
    </div>
  </div>
</template>
