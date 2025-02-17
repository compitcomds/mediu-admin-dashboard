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
          <template v-for="member in team?.members" :key="member.$id">
            <DashboardCustomersMemberRow
              :member="member"
              :team-id="props.teamData.$id"
              :remove-member-from-team="removeMemberFromTeam"
            />
          </template>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-vue-next";
import { type TeamWithMembersType } from "~/appwrite/customer/teams/get-teams";
import formatDate from "~/utils/formatData";

const props = defineProps<{
  teamData: TeamWithMembersType;
}>();

const team = ref(props.teamData);

const removeMemberFromTeam = (memberId: string) => {
  team.value.members = team.value.members.filter(
    (member) => member.$id !== memberId,
  );
};
</script>
