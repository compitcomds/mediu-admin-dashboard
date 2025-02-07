<template>
  <div class="flex min-h-screen">
    <Sidenav v-if="showSidebar" />
    <div
      class="mt-10 flex-1 overflow-y-auto bg-gray-100 px-2 py-8 sm:px-8 lg:ml-64"
      :class="{ 'lg:ml-0': !showSidebar }"
    >
      <NavigationButton v-if="showSidebar" />
      <slot />
    </div>
  </div>
</template>

<script setup>
import { getUser } from "~/appwrite/login-admin";
import "@fortawesome/fontawesome-free/css/all.min.css";
const user = await getUser();
const route = useRoute();
const isAuthLoading = useState("isAuthLoading", () => true);

const showSidebar = computed(() => {
  return !route.path.includes("auth/login") && !!user && !isAuthLoading.value;
});
</script>
