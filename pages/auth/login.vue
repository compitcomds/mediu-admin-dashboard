<template>
  <div class="flex h-screen items-center justify-center bg-gray-100">
    <div class="w-96 rounded-lg bg-white p-8 shadow-md">
      <h1 class="text-center text-2xl font-semibold text-[#28574e]">Login</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mt-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#28574e]"
          />
        </div>
        <div class="mt-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#28574e]"
          />
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="mt-6 w-full rounded-md bg-[#28574e] py-2 text-white transition duration-200 hover:bg-[#1f3b3e] disabled:animate-pulse disabled:cursor-not-allowed"
        >
          <span v-if="!isLoading">Log In</span>
          <span v-else class="flex items-center justify-center gap-1"
            >Logging in <Loader
          /></span>
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account?
        <a href="https://mediu.in/auth/register" class="text-[#28574e]"
          >Sign Up</a
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { loginAdminUser } from "~/appwrite/login-admin";

const email = ref("");
const password = ref("");
const isLoading = ref(false);

const route = useRoute();
const router = useRouter();

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    const back = route.query?.back;
    await loginAdminUser(email.value, password.value);
    await reloadNuxtApp({
      path: back ? `${back}` : "/",
    });
  } catch (error) {
    alert(error.message);
  }
  isLoading.value = false;
};
</script>

<style lang="scss" scoped></style>
