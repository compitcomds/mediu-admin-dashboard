<template>
  <nuxt-link :to="props.to" :class="props.class || ''">
    <slot />
  </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps<{
  to: string;
  class?: string;
}>();
</script>
