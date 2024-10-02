<template>
  <div class="flex w-full h-screen justify-center items-center">
    <div class="w-1/3 p-6 bg-gray-100 rounded-md">
      <h1 class="text-2xl font-bold mb-4">Add Item</h1>
      <p>Product ID: {{ route.params.inventoryId }}</p>

      <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded shadow-md">
        <div class="mb-4">
          <label for="batchNumber" class="block text-sm font-medium text-gray-700">
            Batch Number (Auto-Generated):
          </label>
          <input
            type="text"
            v-model="batchNumber"
            id="batchNumber"
            readonly
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-200"
          />
        </div>

        <div class="mb-4">
          <label for="expiryDate" class="block text-sm font-medium text-gray-700">
            Expiry Date:
          </label>
          <input
            type="date"
            v-model="expiryDate"
            id="expiryDate"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        <div class="mb-4">
          <label for="quantity" class="block text-sm font-medium text-gray-700">
            Quantity:
          </label>
          <input
            type="number"
            v-model="quantity"
            id="quantity"
            required
            min="1"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add Item
        </button>
      </form>

      <div v-if="submittedData" class="mt-6 p-4 bg-gray-100 rounded shadow-md">
        <h2 class="text-lg font-bold">Submitted Data:</h2>
        <p class="text-gray-700">Batch Number: {{ submittedData.BatchNumber }}</p>
        <p class="text-gray-700">Expiry Date: {{ submittedData.ExpiryDate }}</p>
        <p class="text-gray-700">Quantity: {{ submittedData.Quantity }}</p>
        <p class="text-gray-700">Product ID: {{ submittedData.ProductId }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { createInventory, generateUniqueNumber } from "~/appwrite/inventory";
import { useRoute } from "vue-router";

const route = useRoute();
const batchNumber = ref("");
const expiryDate = ref("");
const quantity = ref(1);
const productId = ref(route.params.inventoryId);

const submittedData = ref(null);

onMounted(async () => {
  batchNumber.value = await generateUniqueNumber();
});

const updateInventory = async (inventoryItemId, locationId, newQuantity) => {
  try {
    const response = await fetch("/api/inventory", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inventoryItemId,
        locationId,
        quantity: newQuantity,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update inventory");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating inventory:", error);
    throw error;
  }
};

const handleSubmit = async () => {
  try {
    const data = {
      BatchNumber: batchNumber.value,
      ExpiryDate: new Date(expiryDate.value),
      ProductId: productId.value,
      Quantity: quantity.value,
    };

    await createInventory(
      data.BatchNumber,
      new Date(),
      data.ExpiryDate,
      data.ProductId,
      data.Quantity
    );

    await updateInventory(data.ProductId, "69352587337", data.Quantity);
    submittedData.value = data;
    alert("Inventory item created and quantity updated successfully!");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to create inventory item or update quantity");
  }
};
</script>
