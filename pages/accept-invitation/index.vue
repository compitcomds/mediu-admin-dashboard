<template>
  <div v-if="!error" class="flex min-h-[40vh] items-center justify-center">
    <Loader v-if="!success" />
    <div v-else>
      <MailCheck :size="50" class="text-[#238878]" />

      <h1 class="mb-2 text-xl text-[#238878]">
        Invitation Accepted Successfully!
      </h1>
      <p>You can continue to the dashboard</p>
      <nuxt-link to="/" class="text-[#238878] underline hover:no-underline"
        >Dashboard</nuxt-link
      >
    </div>
  </div>
  <div v-else class="flex min-h-[90vh] flex-col items-center justify-center">
    <h1 class="text-2xl font-bold text-red-500">Invalid Invitation</h1>
    <p class="text-gray-500">Please check the link you received</p>
  </div>
</template>

<script setup lang="ts">
import { MailCheck } from "lucide-vue-next";
import acceptInvitation from "~/appwrite/customer/teams/accept-invitation";

const route = useRoute();
const success = ref(false);
const error = ref(false);

onMounted(async () => {
  try {
    await acceptInvitation(
      route.query.teamId as string,
      route.query.membershipId as string,
      route.query.userId as string,
      route.query.secret as string,
    );
    success.value = true;

    window.location.href = "/profile?from=invite";
  } catch (e) {
    error.value = true;
  }
});
</script>
