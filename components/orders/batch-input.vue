<template>
  <ul class="flex flex-col gap-y-5 px-6">
    <li
      v-for="(batch, variantId) in batchForm"
      class="border-b border-gray-200 pb-4"
    >
      <h4 class="text-lg font-semibold text-gray-800">
        {{ batch.title }} <span class="text-sm">#{{ batch.sku }}</span>
      </h4>
      <p class="text-gray-600">Quantity: {{ batch.quantityRequired }}</p>
      <div v-for="index in batch.batchesInput.length" class="mb-2">
        <div class="grid grid-cols-6 gap-2">
          <input
            type="text"
            :id="generateInputId(variantId, index)"
            v-model="batch.batchesInput[index - 1]"
            placeholder="Batch Id"
            class="mt-1 lg:max-w-sm col-span-5 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
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
            class="bg-black text-white group disabled:cursor-not-allowed flex flex-wrap items-center gap-2 px-4 py-2 text-sm rounded-lg"
          >
            <span class="block group-disabled:hidden">Verify</span>
            <Loader class="group-disabled:block hidden" />
          </button>
          <p v-else class="flex items-center text-emerald-800">
            <CircleCheckBig />
          </p>
          <p
            :id="generateBatchErrorId(variantId, index)"
            class="col-span-6 text-red-500 text-xs hidden"
          >
            Invalid Batch Id
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { CircleCheckBig } from "lucide-vue-next";
import verifyProductInventoryBatch from "~/appwrite/inventory/verify-batch";

const { items } = defineProps<{
  items: any[];
}>();
const emit = defineEmits<{
  (
    event: "update:batchData",
    value: {
      quantityRequired: number;
      batchesSatisfied: string[];
      variantId: string;
    }
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
  batchForm.value[item.variant_id] = {
    quantityRequired: item.quantity,
    batchesInput,
    batchesSatisfied: [...batchesInput],
    sku: item.sku,
    title: item.title,
  };
});

const verifyBatchId = async (variantId: string | number, index: number) => {
  const inputId = generateInputId(variantId, index);
  const input = document.getElementById(inputId) as HTMLInputElement;
  if (!input || !input.value) {
    alert("Please enter a valid value.");
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
      batch.batchesSatisfied
    );
    batch.batchesSatisfied[index - 1] = batchId;
    emit("update:batchData", {
      variantId: variantId.toString(),
      quantityRequired: batch.quantityRequired,
      batchesSatisfied: batch.batchesSatisfied,
    });
  } catch (error: any) {
    toggleBatchError({ index, variantId, message: error.message, show: true });
  } finally {
    toggleVerifyButtonSubmitting({ variantId, index, show: false });
  }
  // console.log(batches);
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
  index: number
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
