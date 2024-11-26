<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <AttachSidebar v-if="!route.path.includes('auth/login')">
      <NuxtPage />
    </AttachSidebar>
    <NuxtPage v-else />
  </NuxtLayout>
</template>

<script setup>
const route = useRoute();
</script>

<style>
html,
body {
  background-color: white !important;
}
</style>
