<template>
  <div
    class="flex flex-col gap-3 gap py-6 rounded-lg bg-neutral-800 border border-neutral-700
      md:max-w-80">
    <div
      v-if="$slots.image"
      class="border-b border-slate-400 px-6 self-center min-w-full flex justify-center
        items-center">
      <slot name="image" />
    </div>
    <div
      v-if="$slots.title"
      class="mt-2 px-6 py-2">
      <slot name="title" />
    </div>
    <div
      v-if="$slots.body"
      class="mt-2 px-6">
      <slot name="body" />
    </div>
    <div
      v-if="$slots.footer"
      class="mt-auto px-6">
      <slot name="footer" />
    </div>
  </div>
</template>
