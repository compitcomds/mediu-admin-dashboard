<template>
  <Dialog v-model:open="open" v-if="!!props.customerWallet">
    <DialogTrigger
      class="rounded-md bg-black px-6 py-2 text-sm text-white hover:bg-black/80"
    >
      Update User Wallet
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit wallet amount</DialogTitle>
      </DialogHeader>

      <form @submit.prevent="updateUserWallet">
        <p class="mb-2">
          Current total amount: {{ props.customerWallet?.amount || 0 }}
        </p>
        <div class="mb-4">
          <label for="new-amount" class="block">New amount</label>
          <input
            id="new-amount"
            v-model="newAmount"
            placeholder="Enter new amount"
            class="block w-full border border-gray-500 p-2"
            type="number"
            step="0.01"
          />
        </div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="ml-auto block rounded-md bg-black px-6 py-2 text-white hover:bg-black/80 disabled:animate-pulse disabled:cursor-not-allowed"
        >
          <span v-if="isSubmitting">Saving...</span>
          <span v-else>Save changes</span>
        </button>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "vue-sonner";
import { type WalletType } from "~/appwrite/customer/get-wallet-amount";
import updateWallet from "~/appwrite/customer/update-wallet";

const props = defineProps<{
  customerWallet: WalletType | null;
}>();

const newAmount = ref(0);
const isSubmitting = ref(false);
const open = ref(false);

const emit = defineEmits(["update:customerWallet"]);

const updateUserWallet = async () => {
  if (!props.customerWallet) return;
  try {
    isSubmitting.value = true;
    const updateDetails = await updateWallet(
      props.customerWallet.$id,
      newAmount.value,
    );
    open.value = false;
    emit("update:customerWallet", updateDetails);
  } catch (error: any) {
    toast.error(error.message, { richColors: true });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
