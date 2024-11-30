<template>
  <Dialog>
    <DialogTrigger
      class="bg-black text-white text-xl sticky font-semibold rounded-md px-1 py-2 w-full disabled:animate-pulse disabled:cursor-not-allowed"
    >
      Actual Confirm
    </DialogTrigger>
    <DialogContent class="p-0 max-h-[90vh]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>Confirm the order</DialogTitle>
      </DialogHeader>
      <ul
        class="flex flex-col gap-y-5 px-6 overflow-y-auto max-h-[70vh] overflow-x-clip mb-10"
      >
        <li v-for="item in items" class="border-b border-gray-200 pb-4">
          <h4 class="text-lg font-semibold text-gray-800">
            {{ item.title }} #{{ item.sku }}
          </h4>
          <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
          <div v-for="index in item.quantity" class="mb-2">
            <div class="grid grid-cols-6 gap-2">
              <input
                type="text"
                :id="generateInputId(item.variant_id, index)"
                placeholder="Batch Id"
                class="mt-1 lg:max-w-sm col-span-5 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
                v-on:keydown.enter.prevent="
                  verifyBatchId(item.variant_id, index)
                "
              />
              <button
                :id="generateBatchVerifyButtonId(item.variant_id, index)"
                @click="verifyBatchId(item.variant_id, index)"
                v-if="index > batchForm[item.variant_id]?.batches.length"
                type="button"
                class="bg-black text-white group disabled:cursor-not-allowed flex flex-wrap items-center gap-2 px-4 py-2 text-sm rounded-lg"
              >
                <span class="block group-disabled:hidden">Verify</span>
                <Loader class="group-disabled:block hidden" />
              </button>
              <p v-else class="flex items-center text-emerald-800">
                <CircleCheckBig />
              </p>
              <p
                :id="generateBatchErrorId(item.variant_id, index)"
                class="col-span-6 text-red-500 text-xs hidden"
              >
                Invalid Batch Id
              </p>
            </div>
          </div>
        </li>
      </ul>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { CircleCheckBig } from "lucide-vue-next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getOldestAvailableBatch } from "~/appwrite/inventory/get-inventory";

const { items } = defineProps<{
  items: any[];
}>();

const batchForm = ref<{
  [key: string]: {
    quantityRequired: number;
    batches: string[];
  };
}>({});

items.forEach((item) => {
  batchForm.value[item.variant_id] = {
    quantityRequired: item.quantity,
    batches: [],
  };
});

const verifyBatchId = async (variantId: string, index: number) => {
  const inputId = generateInputId(variantId, index);
  const input = document.getElementById(inputId) as HTMLInputElement;
  if (!input || !input.value) {
    alert("Please enter a valid value.");
    return;
  }
  const batchId = input.value;
  const batches = await getOldestAvailableBatch(variantId);
  console.log(batches);
};

const generateInputId = (variantId: string, index: number) => {
  return `batch-input-${variantId}-${index}`;
};

const toggleVerifyButtonSubmitting = ({
  variantId,
  index,
  show,
}: {
  variantId: string;
  index: number;
  show?: boolean;
}) => {
  const id = generateBatchVerifyButtonId(variantId, index);
  const button = document.getElementById(id) as HTMLButtonElement;
  if (!button) return;
  const toShow = show !== undefined ? show : !button.disabled;
  button.disabled = toShow;
};

const generateBatchVerifyButtonId = (variantId: string, index: number) => {
  return `batch-verify-button-${variantId}-${index}`;
};

const toggleBatchError = ({
  variantId,
  index,
  message,
  show,
}: {
  variantId: string;
  index: number;
  show?: boolean;
  message?: string;
}) => {
  const id = generateBatchErrorId(variantId, index);
  const element = document.getElementById(id);
  if (!element) return;
  const toShow =
    show !== undefined ? show : element.classList.contains("hidden");
  if (!toShow) {
    element.classList.add("hidden");
    return;
  }
  element.classList.remove("hidden");
  element.innerText = message || "Invalid batch id.";
};

const generateBatchErrorId = (variantId: string, index: number) => {
  return `batch-error-${variantId}-${index}`;
};
</script>
