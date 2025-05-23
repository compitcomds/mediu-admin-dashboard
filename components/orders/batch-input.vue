<template>
  <ul class="flex flex-col gap-y-5 px-6">
    <li
      v-for="(batch, variantId) in batchForm"
      class="border-b border-gray-200 pb-4"
    >
      <h4 class="text-lg font-semibold text-gray-800">
        {{ batch.title }}
        <nuxt-link
          class="inline-flex items-center gap-1 text-sm hover:underline"
          :to="`/inventory/${variantId}`"
          target="_blank"
          >#{{ batch.sku }} <SquareArrowOutUpRight :size="13"
        /></nuxt-link>
      </h4>
      <p class="text-gray-600">Quantity: {{ batch.quantityRequired }}</p>
      <div v-for="index in batch.batchesInput.length" class="mb-2">
        <div class="grid grid-cols-6 gap-2">
          <input
            type="text"
            :id="generateInputId(variantId, index)"
            v-model="batch.batchesInput[index - 1]"
            placeholder="Batch Id"
            class="col-span-5 mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200 lg:max-w-sm"
            v-on:keydown.enter.prevent="verifyBatchId(variantId, index)"
            :disabled="
              !!batch.batchesSatisfied[index - 1] &&
              batch.batchesSatisfied[index - 1] ===
                batch.batchesInput[index - 1]
            "
          />
          <button
            :id="generateBatchVerifyButtonId(variantId, index)"
            @click="verifyBatchId(variantId, index)"
            v-if="
              batch.batchesSatisfied[index - 1] !==
                batch.batchesInput[index - 1] ||
              !batch.batchesSatisfied[index - 1]
            "
            type="button"
            class="group flex flex-wrap items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm text-white disabled:cursor-not-allowed"
          >
            <span class="group-disabled:hidden">Verify</span>
            <Loader class="hidden group-disabled:block" />
          </button>
          <p v-else class="flex items-center text-emerald-800">
            <CircleCheckBig />
          </p>
          <p
            :id="generateBatchErrorId(variantId, index)"
            class="col-span-6 hidden text-xs text-red-500"
          >
            Invalid Batch Id
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { CircleCheckBig, SquareArrowOutUpRight } from "lucide-vue-next";
import { toast } from "vue-sonner";
import verifyProductInventoryBatch from "~/appwrite/inventory/verify-batch";

const { items } = defineProps<{
  items: {
    name: string;
    title: string;
    quantity: number;
    discountedTotal: { amount: number; currencyCode: string };
    originalTotal: { amount: number; currencyCode: string };
    unitPrice: { amount: number; currencyCode: string };
    sku: string;
    id: string;
    variantId: string;
    gstApplied: number;
  }[];
}>();
const emit = defineEmits<{
  (
    event: "update:batchData",
    value: {
      quantityRequired: number;
      batchesSatisfied: string[];
      variantId: string;
    },
  ): void;
}>();

const batchForm = ref<{
  [key: string]: {
    quantityRequired: number;
    batchesInput: string[];
    batchesSatisfied: string[];
    title: string;
    sku: string;
  };
}>({});

items.forEach((item) => {
  const batchesInput = [];
  for (let i = 0; i < item.quantity; i++) batchesInput.push("");
  batchForm.value[item.variantId] = {
    quantityRequired: item.quantity,
    batchesInput,
    batchesSatisfied: [...batchesInput],
    sku: item.sku,
    title: item.name,
  };
});

const focusNextBatchId = (variantId: string | number, index: number) => {
  const nextBatchInputId = generateInputId(variantId, index + 1);
  const nextBatchInput = document.getElementById(nextBatchInputId);
  if (nextBatchInput) nextBatchInput.focus();
};

const verifyBatchId = async (variantId: string | number, index: number) => {
  const inputId = generateInputId(variantId, index);
  const input = document.getElementById(inputId) as HTMLInputElement;
  if (!input || !input.value) {
    toast.error("Please enter a valid value.", { richColors: true });
    return;
  }
  toggleVerifyButtonSubmitting({ variantId, index, show: true });
  toggleBatchError({ index, variantId, show: false });
  const batch = batchForm.value[variantId];
  const batchId = input.value;
  try {
    await verifyProductInventoryBatch(
      variantId.toString(),
      batchId,
      batch.batchesSatisfied,
    );
    batch.batchesSatisfied[index - 1] = batchId;
    emit("update:batchData", {
      variantId: variantId.toString(),
      quantityRequired: batch.quantityRequired,
      batchesSatisfied: batch.batchesSatisfied,
    });
    focusNextBatchId(variantId, index);
  } catch (error: any) {
    toggleBatchError({ index, variantId, message: error.message, show: true });
  } finally {
    toggleVerifyButtonSubmitting({ variantId, index, show: false });
  }
};

const generateInputId = (variantId: string | number, index: number) => {
  return `batch-input-${variantId}-${index}`;
};

const toggleVerifyButtonSubmitting = ({
  variantId,
  index,
  show,
}: {
  variantId: string | number;
  index: number;
  show?: boolean;
}) => {
  const id = generateBatchVerifyButtonId(variantId, index);
  const button = document.getElementById(id) as HTMLButtonElement;
  if (!button) return;
  const toShow = show !== undefined ? show : !button.disabled;
  button.disabled = toShow;
};

const generateBatchVerifyButtonId = (
  variantId: string | number,
  index: number,
) => {
  return `batch-verify-button-${variantId}-${index}`;
};

const toggleBatchError = ({
  variantId,
  index,
  message,
  show,
}: {
  variantId: string | number;
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

const generateBatchErrorId = (variantId: string | number, index: number) => {
  return `batch-error-${variantId}-${index}`;
};
</script>
