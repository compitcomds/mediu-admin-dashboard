<template>
  <ClientOnly>
    <TiptapEditor v-model="content" />
  </ClientOnly>
</template>

<script setup lang="ts">
const content = ref("");
</script>
