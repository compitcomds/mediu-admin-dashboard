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

const handleSubmit = async () => {
  const { date, quantity, batchId } = form.value;
  if (!date || !quantity || !batchId) {
    alert("All the fields are required. Please enter the values for all.");
    return;
  }
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
  }
};
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger
      class="bg-black text-white px-2 md:px-3 py-1.5 rounded-md lg:ml-4"
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
            class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none disabled:bg-gray-200 disabled:cursor-not-allowed"
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
          class="bg-black text-white px-2 md:px-3 py-1.5 rounded-md"
        >
          Submit
        </button>
      </form>
    </DialogContent>
  </Dialog>
</template>
