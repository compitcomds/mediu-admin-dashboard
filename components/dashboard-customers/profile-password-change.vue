<template>
  <!-- Password Change Section -->
  <div class="border-t border-gray-200 pt-6">
    <h3 class="mb-4 text-lg font-medium text-gray-900">Change Password</h3>
    <form @submit.prevent="handlePasswordChange" class="space-y-4">
      <div>
        <label class="flex items-center gap-2 text-sm font-medium text-gray-700"
          >Current Password
        </label>
        <input
          type="password"
          v-model="passwordForm.currentPassword"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#238878] focus:ring-[#238878]"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >New Password</label
        >
        <input
          type="password"
          v-model="passwordForm.newPassword"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#238878] focus:ring-[#238878]"
          required
        />
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="rounded-md bg-[#238878] px-4 py-2 text-white transition-colors hover:bg-[#1b6b5d]"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Updating..." : "Update Password" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { CircleHelp } from "lucide-vue-next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { updateUserPassword } from "~/appwrite/login-admin";

const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
});

const isSubmitting = ref(false);

const handlePasswordChange = async () => {
  try {
    isSubmitting.value = true;

    await updateUserPassword(
      passwordForm.value.newPassword,
      passwordForm.value.currentPassword,
    );

    passwordForm.value = {
      currentPassword: "",
      newPassword: "",
    };

    alert("Password updated successfully");
  } catch (error) {
    alert("Failed to update password");
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
