<template>
  <div class="flex w-full h-screen justify-center items-center">
    <div class="w-1/3 p-6 bg-gray-100 rounded-md">
      <h1 class="text-2xl font-bold mb-4">Add Item</h1>
      <p>Product ID: {{ productId }}</p>

      <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded shadow-md">
        <div class="mb-4">
          <label for="batchNumber" class="block text-sm font-medium text-gray-700"
            >Batch Number (Auto-Generated):</label
          >
          <input
            type="text"
            v-model="batchNumber"
            id="batchNumber"
            readonly
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-200"
          />
        </div>

        <div class="mb-4">
          <label for="expiryDate" class="block text-sm font-medium text-gray-700"
            >Expiry Date:</label
          >
          <input
            type="date"
            v-model="expiryDate"
            id="expiryDate"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        <div class="mb-4">
          <label for="quantity" class="block text-sm font-medium text-gray-700"
            >Quantity:</label
          >
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

// Form data
const batchNumber = ref("");
const expiryDate = ref("");
const quantity = ref(1);
const productId = ref("some-product-id"); // Set your product ID here

// Submission data feedback
const submittedData = ref(null);

// Automatically generate batch number on component mount
onMounted(async () => {
  batchNumber.value = await generateUniqueNumber();
});

// Handle form submission
const handleSubmit = async () => {
  try {
    const data = {
      BatchNumber: batchNumber.value,
      ExpiryDate: new Date(expiryDate.value), // Convert to Date object
      ProductId: productId.value,
      Quantity: quantity.value,
    };

    // Call the createInventory function
    await createInventory(
      data.BatchNumber,
      new Date(), // Assuming BatchDate is the current date
      data.ExpiryDate,
      data.ProductId,
      data.Quantity
    );

    // Store submitted data for display
    submittedData.value = data;
    alert("Inventory item created successfully!");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to create inventory item");
  }
};
</script>
