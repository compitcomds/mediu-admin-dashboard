<template>
  <div class="mx-auto max-w-2xl p-6">
    <div
      v-if="fromInvite"
      class="mb-10 rounded-md border-l-4 border-yellow-400 bg-yellow-100 p-4 text-yellow-700"
    >
      <p class="text-sm">
        <strong>Note:</strong> If you are a new user, please continue by setting
        your password (you need to write your password in both the fields i.e.
        the current password and new password).
      </p>
    </div>

    <!-- Header -->
    <h1 class="mb-6 text-2xl font-semibold text-gray-900">Profile Settings</h1>
    <!-- User Info Display -->
    <div class="space-y-6">
      <div class="mb-6 flex items-center space-x-6">
        <img
          :src="userData.avatar || '/api/placeholder/80/80'"
          alt="Profile avatar"
          class="h-20 w-20 rounded-full border-2 border-[#238878] object-cover"
        />
        <div>
          <h2 class="text-xl font-medium text-gray-900">
            {{ userData.name }}
          </h2>
          <p class="text-gray-500">{{ userData.email }}</p>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <p class="mt-1 text-gray-900">{{ userData.email }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <p class="mt-1 text-gray-900">{{ userData.phone || "N/A" }}</p>
        </div>
      </div>

      <DashboardCustomersProfilePasswordChange />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUserAvatar } from "~/appwrite/login-admin";

const userData = await getUserAvatar();
const route = useRoute();
const fromInvite = route.query?.from === "invite";
</script>
