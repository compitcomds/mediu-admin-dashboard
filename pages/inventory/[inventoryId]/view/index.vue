<template>
  <div class="mb-4 flex items-center justify-between">
    <h1 class="font-semibold sm:text-xl md:text-2xl">
      Product #{{ inventoryId }}
    </h1>
  </div>
  <InventoryVariantDetails :variant="variantBasicDetails" />

  <Table>
    <TableCaption>A list of all batches of {{ inventoryId }}.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[300px] lg:w-[400px]">BarCode</TableHead>
        <TableHead>Batch Id</TableHead>
        <TableHead>Quantity</TableHead>
        <TableHead>Initial Quantity</TableHead>
        <TableHead>Expiry Date</TableHead>
        <TableHead>Created Date</TableHead>
        <TableHead>Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="batch in batches" :key="batch.batchId">
        <TableCell>
          <svg
            :id="'barcode-' + batch.batchId"
            class="barcode max-w-full"
          ></svg>
        </TableCell>
        <TableCell>{{ batch.batchId }}</TableCell>
        <TableCell>{{ batch.quantity }}</TableCell>
        <TableCell>{{ batch.initialQuantity }}</TableCell>
        <TableCell>
          {{ new Date(batch.expiryDate).toLocaleDateString() }}</TableCell
        >
        <TableCell>{{
          new Date(batch.$createdAt).toLocaleDateString()
        }}</TableCell>
        <TableCell>
          <div class="flex items-center gap-2 pt-1">
            <button
              @click="downloadBarcode(batch.batchId)"
              title="Download Batch"
              class="w-fit rounded-md bg-black p-1 font-semibold text-white"
            >
              <span class="sr-only">Download</span> <Download :size="18" />
            </button>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import { Download } from "lucide-vue-next";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import JsBarcode from "jsbarcode";
import { getInventory } from "~/appwrite/inventory/get-inventory";
import type { Models } from "appwrite";
import axios from "axios";

const batches = ref<Models.Document[]>([]);
const route = useRoute();
const inventoryId = route.params.inventoryId as string;

const variantBasicDetails = ref<any>(null);

const fetchInventoryVariant = async () => {
  try {
    const { data } = await axios.get(`/api/inventory/${inventoryId}`);
    variantBasicDetails.value = data;
  } catch (error: any) {
    console.error(error);
  }
};

const fetchBatches = async () => {
  try {
    const { documents } = await getInventory(inventoryId);
    batches.value = documents;
  } catch (error) {
    console.error("Error fetching inventory:", error);
  }
};

const generateBarcodes = () => {
  batches.value.forEach((batch) => {
    const barcodeElement = document.getElementById(`barcode-${batch.batchId}`);
    if (barcodeElement) {
      JsBarcode(barcodeElement, batch.batchId, {
        format: "CODE39",
        width: 2,
        height: 40,
        displayValue: true,
      });
    }
  });
};

const updateInventoryHandler = (newQuantity: number) => {
  variantBasicDetails.value.inventoryQuantity = newQuantity;
};

const downloadBarcode = (batchId: string) => {
  const svg = document.getElementById(`barcode-${batchId}`);

  if (!svg) {
    console.error("SVG not found!");
    return;
  }

  const svgData = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([svgData], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${batchId}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

onMounted(async () => {
  await fetchBatches();
  generateBarcodes();
  fetchInventoryVariant();
});

watch(
  () => batches.value,
  () => {
    nextTick(() => generateBarcodes());
  },
  { deep: true, immediate: true },
);

useHead({
  title: `Inventory Product | ${inventoryId}`,
});
</script>
