<script setup lang="ts">
import createVariantInventory from "~/appwrite/inventory/create-inventory";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const open = ref(false);

const props = defineProps<{ variantId: string }>();
const model = defineModel<any[]>();
const form = ref<{
  date: Date | null;
  quantity: number;
  batchId: string;
}>({
  date: null,
  quantity: 0,
  batchId: "",
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  const { date, quantity, batchId } = form.value;
  if (!date || !quantity || !batchId) {
    alert("All the fields are required. Please enter the values for all.");
    return;
  }
  isSubmitting.value = true;
  try {
    const createdBatch = await createVariantInventory({
      batchId,
      quantity,
      expiryDate: date,
      variantId: props.variantId,
    });
    if (model.value) model.value.push(createdBatch);
    open.value = false;
    form.value = { date: null, quantity: 0, batchId: "" };
    alert("Successfully created the batch.");
  } catch (error: any) {
    alert(error.message);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger
      class="rounded-md bg-black px-2 py-1.5 text-xs text-white sm:text-base md:px-3 lg:ml-4"
      >Add Batch</DialogTrigger
    >
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Batch</DialogTitle>
      </DialogHeader>
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
        <div>
          <label for="variant-id">Variant Id</label>
          <input
            type="text"
            id="variant-id"
            :value="props.variantId"
            disabled
            class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
          />
        </div>
        <div>
          <label for="batch-id">Batch Id</label>
          <input
            id="batch-id"
            type="text"
            v-model="form.batchId"
            required
            class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          />
        </div>
        <div>
          <label for="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            v-model="form.quantity"
            required
            class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          />
        </div>
        <div>
          <label for="expiry-date">Expiry Date</label>
          <input
            id="expiry-date"
            type="datetime-local"
            v-model="form.date"
            required
            class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="rounded-md bg-black px-2 py-1.5 text-white md:px-3"
        >
          <span v-if="!isSubmitting">Submit</span>
          <span v-else class="flex items-center justify-center gap-2"
            >Submitting <Loader
          /></span>
        </button>
      </form>
    </DialogContent>
  </Dialog>
</template>
