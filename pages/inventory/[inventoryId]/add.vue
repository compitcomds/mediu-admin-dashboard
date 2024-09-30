<template>
    <div class="flex w-full h-screen justify-center items-center">
        <div class="w-1/3 p-6 bg-gray-100 rounded-md">
            <h1 class="text-2xl font-bold mb-4">Add Item</h1>
            <p>ProductId ID: {{ productId }}</p>
            <p>Date Created: {{ dateCreated }}</p>

            <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded shadow-md">
                <div class="mb-4">
                    <label for="expiryDate" class="block text-sm font-medium text-gray-700">Expiry Date:</label>
                    <input type="date" v-model="expiryDate" id="expiryDate" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2" />
                </div>
                <div class="mb-4">
                    <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity:</label>
                    <input type="number" v-model="quantity" id="quantity" required min="1"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2" />
                </div>
                <button type="submit"
                    class="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200">
                    Add Item
                </button>
            </form>

            <div v-if="submittedData" class="mt-6 p-4 bg-gray-100 rounded shadow-md">
                <h2 class="text-lg font-bold">Submitted Data:</h2>
                <p class="text-gray-700">Batch Number: {{ submittedData.batchNumber }}</p>
                <p class="text-gray-700">Expiry Date: {{ submittedData.expiryDate }}</p>
                <p class="text-gray-700">Quantity: {{ submittedData.quantity }}</p>
                <p class="text-gray-700">ProductID: {{ submittedData.productId }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import config from '~/utils/config';

export default {
    setup() {
        const route = useRoute();
        const productId = route.params.inventoryId;

        const dateCreated = new Date().toLocaleString();
        const expiryDate = ref("");
        const quantity = ref("");
        const submittedData = ref(null);

        const handleSubmit = () => {
            const batchNumber = generateBatchNumber();
            submittedData.value = {
                batchNumber, // Store the generated batch number
                expiryDate: expiryDate.value,
                quantity: quantity.value,
                dateCreated,
                productId
            };
            expiryDate.value = "";
            quantity.value = "";
            dataStoreInAppwrite(batchNumber); // Pass the batch number to the data store function
        };

        const dataStoreInAppwrite = async (batchNumber) => {
            const data = {
                BatchNumber: batchNumber,
                BatchDate: dateCreated,
                ExpiryDate: expiryDate.value,
                ProductId: productId,
                Quantity: quantity.value,
            };

            try {
                const response = await databases.createDocument(
                    config.Appwrite_Inventory_Batches_Id,
                    'unique()',
                    data
                );
                console.log('Document stored successfully:', response);
            } catch (error) {
                console.error('Error storing document:', error);
            }
        };

        const generateBatchNumber = () => {
            return `${Date.now()}-${Math.floor(Math.random() * 1000)}`; // Example: 1632451234567-123
        };

        return {
            productId,
            dateCreated,
            expiryDate,
            quantity,
            submittedData,
            handleSubmit
        };
    },
};
</script>
