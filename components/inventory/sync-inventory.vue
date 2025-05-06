<template>
  <div
    v-if="
      !!props.inventoryQuantity &&
      !!props.batches &&
      totalBatchesQuantity !== props.inventoryQuantity
    "
  >
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            @click="syncInventory()"
            :disabled="isSubmitting"
            class="rounded-md bg-zinc-200 px-2 py-1.5 text-xs hover:bg-zinc-300 disabled:animate-pulse disabled:cursor-not-allowed sm:text-base md:px-3 lg:ml-4"
          >
            <span v-if="!isSubmitting">Sync Inventory</span>
            <span v-else class="flex items-center gap-1 px-2"
              >Syncing <Loader
            /></span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" class="max-w-xl">
          <p>
            This button is shown when the total product inventory is different
            than the sum of quantities in batches. Click this button to sync
            them up and make them same. Note that the total sum of quantities in
            batches is considered as the final source of truth.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>

<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import { toast } from "vue-sonner";

const props = defineProps<{
  batches: any[];
  inventoryQuantity?: number;
  variantId: string;
}>();

const totalBatchesQuantity = computed(() =>
  props.batches.reduce((prev, curr) => prev + curr.quantity, 0),
);
const emit = defineEmits(["update-inventory"]);

const isSubmitting = ref(false);

const syncInventory = async () => {
  isSubmitting.value = true;
  try {
    await axios.put(`/api/inventory/${props.variantId}`, {
      absolute: totalBatchesQuantity.value,
    });
    toast.success("Inventory Synced Successfully.", { richColors: true });
    emit("update-inventory", totalBatchesQuantity.value);
  } catch (error: any) {
    toast.error(
      error.message ||
        "Unable to sync the inventory at the moment. Please try again later.",
      { richColors: true },
    );
  } finally {
    isSubmitting.value = false;
  }
};
</script>
