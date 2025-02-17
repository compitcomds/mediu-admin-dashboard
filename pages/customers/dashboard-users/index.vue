<template>
  <div class="pt-3">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-semibold text-gray-800">
        Dashboard User Management
      </h2>
      <DashboardCustomersMembershipDialog
        :onSubmit="addUser"
        :showEmailMessage="true"
      />
    </div>
    <div>
      <DashboardCustomersTeamManagment
        v-for="team in teams"
        :team-data="team"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import addUserToTeam from "~/appwrite/customer/teams/add-user-to-team";
import {
  getTeamsWithMembers,
  type TeamWithMembersType,
} from "~/appwrite/customer/teams/get-teams";

const teams = ref<TeamWithMembersType[]>([]);

onMounted(async () => {
  teams.value = await getTeamsWithMembers();
});

const addUser = async (data: any) => {
  const roles = data.roles;
  if (roles.length === 0) {
    throw new Error("Please select at least one role.");
  }
  for (const role of roles) {
    await addUserToTeam(role, data);
  }
};
</script>
