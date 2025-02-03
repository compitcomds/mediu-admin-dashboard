<template>
  <Dialog v-model:open="open">
    <DialogTrigger
      class="rounded-lg bg-[#185c50] px-4 py-2 text-white transition-colors hover:bg-[#134940]"
    >
      {{ !!props.defaultData ? "Edit User" : "Add A User" }}
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{
          !!props.defaultData ? "Edit User" : "Add A User"
        }}</DialogTitle>
        <DialogDescription class="sr-only">
          Allow access to users.
        </DialogDescription>
      </DialogHeader>
      <form
        v-if="!successEmailMessage"
        @submit.prevent="submitForm"
        class="flex flex-col gap-y-4"
      >
        <div>
          <label for="name" class="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#185c50] disabled:cursor-not-allowed"
            required
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#185c50] disabled:cursor-not-allowed"
            required
          />
        </div>

        <DashboardCustomersRoleSelector v-model="form.roles" />

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
      <DashboardCustomersInviteMessage
        v-if="successEmailMessage"
        :roles="form.roles"
      />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type FormData = {
  name: string;
  email: string;
  roles: string[];
};

const props = defineProps<{
  defaultData?: FormData;
  editing?: boolean;
  onSubmit?: (data: FormData) => Promise<any>;
  showEmailMessage?: boolean;
}>();

const initialData = !!props.defaultData
  ? { ...props.defaultData }
  : {
      name: "",
      email: "",
      roles: [],
    };

const form = ref<FormData>(initialData);
const open = ref(false);
const isSubmitting = ref(false);
const successEmailMessage = ref(false);

const submitForm = async () => {
  isSubmitting.value = true;
  try {
    if (props.onSubmit) await props.onSubmit(form.value);
    if (props.showEmailMessage) successEmailMessage.value = true;
  } catch (error: any) {
    alert(error.message || "Error adding user. Please try again later.");
  }
  isSubmitting.value = false;
};
</script>
