<template>
  <div class="rounded-lg border border-gray-200 p-6 shadow-sm">
    <div class="flex items-start justify-between">
      <div>
        <h3 class="text-lg font-medium text-gray-900">{{ role.role }}</h3>
        <p class="mt-2 text-sm text-gray-600">{{ role.description }}</p>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <CustomersRolesFormDialog
          :default-data="role"
          :editing="true"
          :onSubmit="updateUserRole"
        />
        <button
          :disabled="isDeleting"
          class="flex h-full items-center justify-center rounded-md border border-red-200 bg-red-50 px-4 text-red-600 hover:bg-red-100 hover:text-red-700 disabled:animate-none disabled:cursor-not-allowed disabled:opacity-80"
          @click="deleteUserRole"
          title="Delete role"
        >
          <span v-if="isDeleting"><Loader /></span>
          <span v-else><Trash2 class="h-4 w-4" /></span>
          <span class="sr-only">{{
            isDeleting ? "Deleting..." : "Delete role"
          }}</span>
        </button>
      </div>
    </div>

    <Collapsible class="mt-6">
      <CollapsibleTrigger class="flex w-full items-center justify-between">
        <span class="text-sm font-medium">View Permissions</span>
        <ChevronDown
          class="ui-expanded:rotate-180 h-4 w-4 transition-transform"
        />
      </CollapsibleTrigger>
      <CollapsibleContent class="pt-4">
        <div class="space-y-6">
          <template
            v-for="section in availablePermissions"
            :key="section.section"
          >
            <div class="space-y-4">
              <h4 class="font-medium text-gray-900">{{ section.section }}</h4>
              <div class="grid gap-6 md:grid-cols-2">
                <!-- Read Permissions -->
                <div class="space-y-3">
                  <h5 class="text-sm font-medium text-gray-700">Read Access</h5>
                  <ul class="space-y-2">
                    <template
                      v-for="permission in section.children"
                      :key="permission.read"
                    >
                      <li
                        class="flex items-center gap-2"
                        v-if="permission.read"
                      >
                        <Check
                          v-if="role.read.includes(permission.read)"
                          class="h-4 w-4 text-green-500"
                        />
                        <X v-else class="h-4 w-4 text-gray-300" />
                        <span class="text-sm text-gray-600">{{
                          permission.title
                        }}</span>
                      </li>
                    </template>
                  </ul>
                </div>

                <!-- Edit Permissions -->
                <div class="space-y-3">
                  <h5 class="text-sm font-medium text-gray-700">Edit Access</h5>
                  <ul class="space-y-2">
                    <template
                      v-for="permission in section.children"
                      :key="permission.edit"
                    >
                      <li
                        class="flex items-center gap-2"
                        v-if="permission.edit"
                      >
                        <Check
                          v-if="role.edit.includes(permission.edit)"
                          class="h-4 w-4 text-green-500"
                        />
                        <X v-else class="h-4 w-4 text-gray-300" />
                        <span class="text-sm text-gray-600">{{
                          permission.title
                        }}</span>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>
          </template>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script setup lang="ts">
import { Check, X, ChevronDown, Trash2 } from "lucide-vue-next";
import { availablePermissions } from "./type";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import updateRole from "~/appwrite/customer/role/update-role";
import deleteRole from "~/appwrite/customer/role/delete-role";

interface RoleData {
  $id: string;
  role: string;
  description: string;
  read: string[];
  edit: string[];
}

const props = defineProps<{
  role: RoleData;
}>();

const emit = defineEmits<{
  delete: [role: string];
  success: [role: any];
}>();

const isDeleting = ref(false);

const deleteUserRole = async () => {
  try {
    isDeleting.value = true;
    await deleteRole(props.role.$id);
    emit("delete", props.role.$id);
  } catch (error: any) {
    alert(`Error deleting role: ${error.message}`);
  } finally {
    isDeleting.value = false;
  }
};

const updateUserRole = async (role: any) => {
  const updatedRole = await updateRole(props.role.$id, {
    description: role.description,
    read: role.read,
    edit: role.edit,
  });
  emit("success", updatedRole);
  return updatedRole;
};
</script>
