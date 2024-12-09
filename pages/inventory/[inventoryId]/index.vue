<template>
  <div
    class="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0"
  >
    <h1 class="text-xl md:text-2xl font-semibold">
      Product #{{ inventoryId }}
    </h1>
    <InventoryAdd :variant-id="inventoryId" v-model:model-value="batches" />
  </div>
  <Table>
    <TableCaption>A list of all batches of {{ inventoryId }}.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[300px] lg:w-[500px]">BarCode</TableHead>
        <TableHead>Created Date</TableHead>
        <TableHead>Expiry Date</TableHead>
        <TableHead>Quantity</TableHead>
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
        <TableCell>{{
          new Date(batch.$createdAt).toLocaleDateString()
        }}</TableCell>
        <TableCell>
          {{ new Date(batch.expiryDate).toLocaleDateString() }}</TableCell
        >
        <TableCell>{{ batch.quantity }}</TableCell>
        <TableCell>
          <div class="flex gap-2 items-center pt-1">
            <button
              @click="downloadBarcode(batch.batchId)"
              title="Download Batch"
              class="p-1 bg-black text-white font-semibold rounded-md w-fit"
            >
              <span class="sr-only">Download</span> <Download :size="18" />
            </button>
            <button
              @click="deleteBatch(batch.$id)"
              title="Delete Batch"
              class="text-red-500 p-1 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
            >
              <span class="sr-only">Delete Batch</span><Trash :size="16" />
            </button>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import { Trash, Download } from "lucide-vue-next";
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
import { deleteBatchFromInventory } from "~/appwrite/inventory/delete-batch";
import type { Models } from "appwrite";

const batches = ref<Models.Document[]>([]);
const route = useRoute();
const inventoryId = route.params.inventoryId as string;

const fetchBatches = async () => {
  try {
    const { documents } = await getInventory(inventoryId);
    batches.value = documents;
  } catch (error) {
    console.error("Error fetching inventory:", error);
  }
};

const deleteBatch = async (id: string) => {
  if (!confirm("Are you sure you want to delete the batch?")) return;
  try {
    await deleteBatchFromInventory(id);
    alert("Successfully deleted the batch!");
    const index = batches.value.findIndex((batch) => batch.$id === id);
    if (index !== -1) batches.value.splice(index, 1);
  } catch (error: any) {
    alert(error.message);
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
});

watch(
  () => batches.value,
  () => {
    nextTick(() => generateBarcodes());
  },
  { deep: true, immediate: true }
);
</script>
