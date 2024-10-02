<template>
  <Navbar />
  <template v-if="!isLoading">
    <slot />
  </template>
</template>

<script setup>
import { getUser } from "~/appwrite/login-admin";

const router = useRouter();
const route = useRoute();
const isLoggedInUser = ref(false);
const isLoading = ref(false);

watch(
  () => route.fullPath,
  async (newPath) => {
    if (isLoggedInUser.value || newPath === "/auth/login") return;
    isLoading.value = true;
    if (await getUser()) {
      isLoggedInUser.value = true;
    } else {
      isLoggedInUser.value = false;
      router.replace("/auth/login");
    }
    isLoading.value = false;
  },
  { deep: true, immediate: true }
);
</script>
