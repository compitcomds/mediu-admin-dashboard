<template>
  <Dialog v-model:open="open">
    <DialogTrigger
      class="w-full rounded-md bg-black px-6 py-2 text-sm font-semibold text-white disabled:animate-pulse disabled:cursor-not-allowed"
    >
      Confirm Order
    </DialogTrigger>
    <DialogContent
      class="max-h-[90vh] min-w-[70vw] overflow-y-auto overflow-x-clip p-6 pb-4"
    >
      <DialogHeader class="px- pb-0">
        <DialogTitle>Confirm the order</DialogTitle>
      </DialogHeader>
      <div
        class="grid max-h-[70vh] min-w-fit grid-cols-1 gap-5 overflow-y-auto overflow-x-clip py-10 lg:grid-cols-2"
      >
        <OrdersBatchInput
          :items="orderData.lineItems"
          @update:batch-data="updateBatchData"
        />
        <OrdersDimensionBox v-model:dimensions="dimensionData" />
      </div>
      <DialogFooter class="px-6"
        ><button
          @click="confirmAndCreateShiprocketOrder"
          :disabled="isSubmitting"
          class="rounded-md bg-black px-6 py-2 text-lg font-semibold text-white disabled:animate-pulse disabled:cursor-not-allowed"
        >
          <span v-if="!isSubmitting">Confirm order</span>
          <span v-else class="flex items-center gap-2"
            >Confirming... <Loader
          /></span>
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import axios from "axios";
import createShiprocketOrder from "~/shiprocket/order/create";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import decreaseBatchesQuantity from "~/appwrite/inventory/decrease-quantity";

const { orderId, orderData } = defineProps<{
  orderId: string;
  orderData: any;
}>();

const emit = defineEmits<{
  (event: "orderFulfilled"): void;
}>();

const open = ref(false);
const isSubmitting = ref(false);

const batchData = ref<
  Record<string, { quantityRequired: number; batchesSatisfied: string[] }>
>({});

const dimensionData = ref({ length: 0, breadth: 0, height: 0, weight: 0 });

const updateBatchData = (data: {
  variantId: string;
  quantityRequired: number;
  batchesSatisfied: string[];
}) => {
  batchData.value[data.variantId] = {
    quantityRequired: data.quantityRequired,
    batchesSatisfied: data.batchesSatisfied,
  };
};

const checkDimensions = () => {
  const { breadth, height, length, weight } = dimensionData.value;
  if (
    typeof breadth !== "number" ||
    typeof length !== "number" ||
    typeof weight !== "number" ||
    typeof height !== "number"
  ) {
    throw new Error(
      "Length, breadth, height and weight must be decimal values. Please enter valid decimal values for each.",
    );
  }

  if (breadth <= 0.5 || height <= 0.5 || length <= 0.5) {
    throw new Error("Length, breadth and height must be greater than 0.5 cms");
  }
  if (weight <= 0) throw new Error("Weight must be greater than 0 kgs");
  else if (weight >= 200) throw new Error("Weight must be less than 200 kgs");
};

const checkBatches = () => {
  for (const item of orderData.lineItems) {
    const data = batchData.value[item.variantId];
    if (!data || data.batchesSatisfied.length < data.quantityRequired)
      throw new Error(
        "Please provide all the batch id's to continue to shipment",
      );
  }
};

const createOrder = async () => {
  await createShiprocketOrder(orderData, dimensionData.value);
  const { data } = await axios.post(`/api/orders/${orderId}/fulfill`, {
    headers: { "Content-Type": "application/json" },
  });
  if (data?.error) throw new Error(data.error);
};

const confirmAndCreateShiprocketOrder = async () => {
  isSubmitting.value = true;
  try {
    checkBatches();
    checkDimensions();
    await createOrder();
    await decreaseBatchesQuantity(batchData.value);
    alert(
      "Successfully created the order for shipment. Please proceed to shiprocket dashboard to continue the process of shipment.",
    );
    emit("orderFulfilled");
    open.value = false;
  } catch (error: any) {
    console.log(error);
    alert(error.message);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
