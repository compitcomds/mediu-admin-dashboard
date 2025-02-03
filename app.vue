<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
    rel="stylesheet"
  />

  <NuxtLoadingIndicator />
  <NuxtLayout>
    <AttachSidebar
      v-if="!route.path.includes('auth/login') && !!user && !isAuthLoading"
    >
      <NuxtPage />
    </AttachSidebar>
    <NuxtPage v-else />
  </NuxtLayout>
</template>

<script setup>
import { getUser } from "~/appwrite/login-admin";
import "@fortawesome/fontawesome-free/css/all.min.css";
const user = await getUser();
const route = useRoute();
const isAuthLoading = useState("isAuthLoading", () => true);
</script>

<style>
html,
body {
  font-family: "Inter", serif;
  font-optical-sizing: auto;
  font-style: normal;
  background-color: white !important;
}
</style>
