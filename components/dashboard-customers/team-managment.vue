<template>
  <div class="mb-4 overflow-hidden rounded-lg bg-white">
    <div class="border-b bg-gray-50 p-4">
      <h2 class="text-xl font-semibold text-gray-800">{{ team?.name }}</h2>
      <div class="mt-1 flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <p>Team id: {{ team?.$id }}</p>
        <p>Created: {{ formatDate(team?.$createdAt) }}</p>

        <p>Last Updated: {{ formatDate(team?.$updatedAt) }}</p>
      </div>
    </div>

    <Collapsible>
      <CollapsibleTrigger
        class="flex w-full items-center justify-between p-4 hover:text-[#238878]"
      >
        Team Members ({{ team?.members?.length }})
        <ChevronsUpDown class="h-4 w-4" />
      </CollapsibleTrigger>

      <CollapsibleContent class="p-4">
        <div
          v-if="team?.members?.length === 0"
          class="py-4 text-center text-gray-500"
        >
          No members in this team
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="member in team?.members"
            :key="member.$id"
            class="flex items-center justify-between rounded-lg bg-gray-100 p-3"
          >
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
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script setup lang="ts">
import deleteMembership from "~/appwrite/customer/teams/delete-membership";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-vue-next";
import { type TeamWithMembersType } from "~/appwrite/customer/teams/get-teams";

const props = defineProps<{
  teamData: TeamWithMembersType;
}>();

const team = ref(props.teamData);
const isDeleting = ref(false);

// Format date to a more readable format
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const deleteMember = async (memberId: string) => {
  isDeleting.value = true;
  try {
    await deleteMembership(props.teamData.$id, memberId);
    team.value.members = team.value.members.filter(
      (member) => member.$id !== memberId,
    );
  } catch (error: any) {
    alert(error.message || "Something went wrong. Please try again later.");
  } finally {
    isDeleting.value = false;
  }
};
</script>
