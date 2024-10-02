<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-semibold text-center text-[#28574e]">Login</h1>
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
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#28574e] focus:border-transparent"
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
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#28574e] focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="mt-6 w-full bg-[#28574e] text-white py-2 rounded-md hover:bg-[#1f3b3e] transition duration-200 disabled:animate-pulse disabled:cursor-not-allowed"
        >
          Log In
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
const router = useRouter();
const isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    await loginAdminUser(email.value, password.value);
    router.replace("/");
  } catch (error) {
    alert(error.message);
  }
  isLoading.value = false;
};
</script>

<style lang="scss" scoped></style>
