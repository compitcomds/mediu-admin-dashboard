<template>
  <Navbar />
  <template v-if="!isLoading">
    <slot />
  </template>
</template>

<script setup>
const isLoading = useState("isAuthLoading", () => true);
</script>
