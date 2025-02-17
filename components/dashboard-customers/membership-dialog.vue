<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const props = defineProps<{
  defaultData?: any;
  onSubmit?: (data: any) => Promise<any>;
  showEmailMessage?: boolean;
}>();

const open = ref(false);
</script>

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

      <DashboardCustomersMembershipForm
        :onSubmit="props.onSubmit"
        :showEmailMessage="true"
      />
    </DialogContent>
  </Dialog>
</template>
