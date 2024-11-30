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
import '@fortawesome/fontawesome-free/css/all.min.css';

const route = useRoute();
</script>

<style>
html,
body {
  background-color: white !important;
}
</style>
