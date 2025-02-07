<template>
  <div class="rounded-lg p-4">
    <MailCheck :size="40" class="text-[#238878]" />
    <h2 class="text-lg font-bold text-[#238878]">Invitation Sent</h2>
    <p class="mt-2">The user has been sent an email to join for the roles:</p>
    <ul class="mt-2 list-inside list-disc">
      <li v-for="role in roles" :key="role" class="text-gray-900">
        {{ role }}
      </li>
    </ul>
    <p class="mt-2">
      The user needs to click the sent link in each email to accept that
      particular role.
    </p>
  </div>
</template>

<script setup lang="ts">
import { MailCheck } from "lucide-vue-next";

defineProps<{ roles: string[] }>();
</script>
