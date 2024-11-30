<template>
  <div
    class="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0"
  >
    <h1 class="text-xl md:text-2xl font-semibold">
      Product #{{ inventoryId }}
    </h1>
    <InventoryAdd :variant-id="inventoryId" v-model:model-value="batches" />
  </div>

  <div class="overflow-x-auto bg-white shadow-md rounded-lg">
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
            <button
              @click="downloadBarcode(batch.batchId)"
              class="p-1 bg-black text-white font-semibold rounded-md w-fit mt-1"
            >
              Download
            </button></TableCell
          >
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
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

const batches = ref<any[]>([]);
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
    generateBarcodes();
  },
  { immediate: true, deep: true }
);
</script>
