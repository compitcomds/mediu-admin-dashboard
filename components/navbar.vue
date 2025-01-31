<template>
  <div
    class="fixed z-50 flex w-full items-center justify-between border-b bg-[#238878] px-4 py-4 lg:px-10"
  >
    <div class="flex max-w-16 items-center space-x-2">
      <nuxt-link to="/"
        ><img
          src="https://ccdstest.b-cdn.net/Medi%20u/logos/logo_white.png"
          alt="Mediu Logo"
          class=""
      /></nuxt-link>
    </div>

    <div v-if="!!user" class="hidden items-center space-x-4 lg:flex">
      <p
        class="flex items-center gap-1 rounded-l-full rounded-r-full bg-[#185c50] px-6 py-1 text-white"
      >
        <span class="text-sm text-gray-300">Today's Orders: </span
        >{{ orders.today }}
      </p>
      <button
        @click="handleLogout"
        class="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-500"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SquareArrowOutUpRight } from "lucide-vue-next";
import axios from "axios";
import { logout } from "~/appwrite/login-admin";
import { getUser } from "~/appwrite/login-admin";

const user = ref<any>(null);
const orders = ref({
  total: 0,
  today: 0,
});

const handleLogout = async () => {
  await logout();
  localStorage.clear();
  reloadNuxtApp();
  window.location.href = "/auth/login";
};

const checkUser = async () => {
  try {
    user.value = await getUser();
    nextTick(() => getOrdersCount());
  } catch (error) {}
};

const getOrdersCount = async () => {
  if (!user.value) return;
  const { data } = await axios.get("/api/orders/count");
  orders.value = data;
};

onMounted(() => {
  checkUser();
});
</script>

<style scoped></style>
