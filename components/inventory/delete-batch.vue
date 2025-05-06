<template>
  <button
    @click="deleteBatch()"
    title="Delete Batch"
    :disabled="isDeleting"
    class="rounded-md border-2 border-red-500 p-1 text-red-500 transition hover:bg-red-500 hover:text-white disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-red-500"
  >
    <span class="sr-only">Delete Batch</span><Trash :size="16" />
  </button>
</template>

<script setup lang="ts">
import { Trash } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { deleteBatchFromInventory } from "~/appwrite/inventory/delete-batch";

const props = defineProps<{ batchId: string }>();
const batches = defineModel<any[]>({ default: [], required: true });
const isDeleting = ref(false);

const deleteBatch = async () => {
  if (!confirm("Are you sure you want to delete the batch?")) return;
  isDeleting.value = true;
  try {
    await deleteBatchFromInventory(props.batchId);
    toast.success("Successfully deleted the batch!", { richColors: true });
    const index = batches.value.findIndex(
      (batch) => batch.$id === props.batchId,
    );
    if (index !== -1) batches.value.splice(index, 1);
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || error.message || "Something went wrong!",
      { richColors: true },
    );
  } finally {
    isDeleting.value = false;
  }
};
</script>
