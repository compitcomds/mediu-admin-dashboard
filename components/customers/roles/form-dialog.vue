<template>
  <Dialog v-model:open="open">
    <DialogTrigger
      class="rounded-lg bg-[#185c50] px-4 py-2 text-white transition-colors hover:bg-[#134940]"
    >
      {{ !!props.defaultData ? "Edit Role" : "Create New Role" }}</DialogTrigger
    >
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{
          !!props.defaultData ? "Edit Role" : "Create New Role"
        }}</DialogTitle>
        <DialogDescription class="sr-only">
          Set the role name, description, and permissions here.
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="handleSubmit" class="max-w-2xl space-y-6">
        <div class="space-y-2">
          <label for="role" class="text-sm font-medium text-gray-700"
            >Role Name</label
          >
          <input
            id="role"
            v-model="formData.role"
            type="text"
            :disabled="props.editing"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#185c50] disabled:cursor-not-allowed"
            placeholder="Enter role name"
            required
          />
        </div>

        <!-- Description -->
        <div class="space-y-2">
          <label for="description" class="text-sm font-medium text-gray-700"
            >Description</label
          >
          <textarea
            id="description"
            v-model="formData.description"
            rows="3"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#185c50]"
            placeholder="Enter role description"
            required
          ></textarea>
        </div>

        <!-- Read Permissions -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Read Permissions</h3>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="permission in availablePermissions"
              :key="`read-${permission.value}`"
            >
              <div class="flex items-center space-x-2">
                <Checkbox
                  :id="`read-${permission.value}`"
                  :checked="formData.read.includes(permission.value)"
                  @update:checked="togglePermission('read', permission.value)"
                />
                <label
                  :for="`read-${permission.value}`"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {{ permission.title }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Permissions -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Edit Permissions</h3>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="permission in availablePermissions"
              :key="`edit-${permission.value}`"
            >
              <div class="flex items-center space-x-2">
                <Checkbox
                  :id="`edit-${permission.value}`"
                  :checked="formData.edit.includes(permission.value)"
                  @update:checked="togglePermission('edit', permission.value)"
                />
                <label
                  :for="`edit-${permission.value}`"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {{ permission.title }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="flex w-full items-center justify-center rounded-md bg-[#185c50] px-4 py-2 text-white hover:bg-[#134539] focus:outline-none focus:ring-2 focus:ring-[#185c50] focus:ring-offset-2 disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-80"
        >
          <span v-if="isSubmitting" class="mx-auto flex items-center gap-2"
            >Saving <Loader
          /></span>
          <span v-else>Save Role</span>
        </button>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";
import { availablePermissions } from "~/components/customers/roles/type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FormData {
  role: string;
  description: string;
  read: string[];
  edit: string[];
}

const props = defineProps<{
  defaultData?: FormData;
  editing?: boolean;
  onSubmit?: (data: FormData) => Promise<any>;
}>();

const open = ref(false);
const isSubmitting = ref(false);

const initialData = !!props.defaultData
  ? { ...props.defaultData }
  : {
      role: "",
      description: "",
      read: [],
      edit: [],
    };

const formData = ref<FormData>(initialData);

const togglePermission = (type: "read" | "edit", value: string) => {
  const permissions = formData.value[type];
  const index = permissions.indexOf(value);

  if (index === -1) {
    permissions.push(value);
  } else {
    permissions.splice(index, 1);
  }
};

const closeAndReset = () => {
  if (!props.editing) {
    formData.value = {
      role: "",
      description: "",
      read: [],
      edit: [],
    };
  }
  open.value = false;
};

const handleSubmit = async () => {
  if (!props.onSubmit) {
    return;
  }
  isSubmitting.value = true;
  try {
    const createdRole = await props.onSubmit(formData.value);
    closeAndReset();
  } catch (error: any) {
    alert(error.message);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
