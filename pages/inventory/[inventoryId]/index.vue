<template>
  <div
    class="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0"
  >
    <h1 class="text-xl md:text-2xl font-semibold">Products</h1>
    <div class="flex flex-wrap space-x-2">
      <NuxtLink
        :to="`/inventory/${$route.params.inventoryId}/add`"
        class="p-1 bg-green-800 text-white rounded-md"
        >Add</NuxtLink
      >

      <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">Export</button>
      <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">Import</button>
      <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">
        More actions
      </button>
      <div>
        <button
          @click="goToAddProductPage"
          class="bg-black text-white px-2 md:px-3 py-1.5 rounded-md lg:ml-4"
        >
          Add New Product
        </button>
      </div>
    </div>
  </div>

  <!-- Responsive Table for Large Screens -->
  <div class="hidden lg:block overflow-x-auto bg-white shadow-md rounded-lg">
    <table class="min-w-full table-auto divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Bar Code
          </th>
          <th
            class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Purchasing Date
          </th>
          <th
            class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Expiry Date
          </th>
          <th
            class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Product Id
          </th>
          <th
            class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Quantity
          </th>
          <th
            class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="batch in batches" :key="batch.$id" class="hover:bg-gray-100">
          <td>
            <svg :id="'barcode-' + batch.BatchNumber" class="barcode"></svg>
          </td>
          <td class="px-4 py-4 whitespace-nowrap">
            {{ new Date(batch.BatchDate).toLocaleDateString() }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap">
            {{ new Date(batch.ExpiryDate).toLocaleDateString() }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap">{{ batch.ProductId }}</td>
          <td class="px-4 py-4 whitespace-nowrap">{{ batch.Quantity }}</td>
          <td class="flex gap-2 p-1 m-1">
            <button
              @click="downloadBarcode(batch.BatchNumber)"
              class="p-1 bg-blue-500 text-white font-semibold rounded-md w-fit mt-1"
            >
              Download
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getInventory } from "~/appwrite/inventory";
import JsBarcode from "jsbarcode";

export default {
  data() {
    return {
      batches: [],
    };
  },
  async mounted() {
    await this.fetchBatches();
    this.generateBarcodes();
  },
  methods: {
    async fetchBatches() {
      try {
        const productId = this.$route.params.inventoryId;
        const result = await getInventory(productId);
        if (result.documents && result.documents.length > 0) {
          this.batches = result.documents;
        } else {
          console.error("No batches found or failed to fetch batches");
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    },
    generateBarcodes() {
      this.batches.forEach((batch) => {
        const barcodeElement = document.getElementById(
          `barcode-${batch.BatchNumber}`
        );
        if (barcodeElement) {
          JsBarcode(barcodeElement, batch.BatchNumber, {
            format: "CODE39",
            width: 2,
            height: 40,
            displayValue: true,
          });
        }
      });
    },
    downloadBarcode(batchNumber) {
      const svgElement = document.getElementById(`barcode-${batchNumber}`);
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${batchNumber}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
  },
};
</script>
