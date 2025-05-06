<script setup lang="ts">
import { type Models } from "appwrite";
import formatDate from "~/utils/formatData";
import deleteMembership from "~/appwrite/customer/teams/delete-membership";
import { toast } from "vue-sonner";

const props = defineProps<{
  member: Models.Membership;
  teamId: string;
  removeMemberFromTeam?: (memberId: string) => void;
}>();

const isDeleting = ref(false);

const deleteMember = async (memberId: string) => {
  isDeleting.value = true;
  try {
    await deleteMembership(props.teamId, memberId);
    if (props.removeMemberFromTeam) props.removeMemberFromTeam(memberId);
  } catch (error: any) {
    toast.error(
      error.message || "Something went wrong. Please try again later.",
      { richColors: true },
    );
  } finally {
    isDeleting.value = false;
  }
};
</script>

<template>
  <div class="flex items-center justify-between rounded-lg bg-gray-100 p-3">
    <div class="flex-grow">
      <div class="flex items-center space-x-3">
        <div>
          <p class="font-semibold text-gray-800">
            {{ member.userName }}
          </p>
          <p class="text-sm text-gray-600">{{ member.userEmail }}</p>
        </div>

        <div
          v-if="member.roles.length > 0"
          class="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
        >
          {{ member.roles[0] }}
        </div>
      </div>

      <div class="mt-2 text-xs text-gray-500">
        <p>
          Joined:
          {{
            member.joined
              ? formatDate(member.joined)
              : "The user has not accepted the invitation yet."
          }}
        </p>
      </div>
    </div>

    <button
      v-if="!member.roles.includes('owner')"
      @click="deleteMember(member.$id)"
      :disabled="isDeleting"
      class="ml-4 rounded-md bg-red-500 px-3 py-2 text-sm text-white transition-colors hover:bg-red-600 disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-80"
    >
      {{ isDeleting ? "Removing..." : "Remove" }}
    </button>
  </div>
</template>
