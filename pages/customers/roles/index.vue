<template>
  <div class="pt-3">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-semibold text-gray-800">Role Management</h2>
      <CustomersRolesFormDialog :onSubmit="addRole" />
    </div>

    <div class="grid gap-6">
      <CustomersRolesCard
        v-for="role in roles"
        :key="role.$id"
        :role="role"
        @delete="removeRole"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import getRoles from "~/appwrite/customer/role/get-roles";
import createRole from "~/appwrite/customer/role/create-role";

const roles = ref<any[]>([]);

const removeRole = (roleId: string) => {
  roles.value = roles.value.filter((role) => role.$id !== roleId);
};

const updateRole = (updatedRole: any) => {
  const index = roles.value.findIndex((role) => role.$id === updatedRole.$id);
  if (index !== -1) {
    roles.value[index] = { ...updatedRole };
  }
};

const addRole = async (newRole: any) => {
  const createdRole = await createRole(newRole);
  roles.value.push({ ...createdRole });
  return createdRole;
};

const fetchRoles = async () => {
  const fetchedRoles = await getRoles();
  roles.value = fetchedRoles.documents;
};

onMounted(async () => {
  await fetchRoles();
});
</script>
