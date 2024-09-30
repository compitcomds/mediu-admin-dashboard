<template>
    <div class="flex flex-col h-screen py-10 lg:py-0">
        <!-- Sidebar -->
        <Sidenav />
        <div class="lg:ml-64 flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 mt-4 bg-gray-100">
            <NavigationButton />

            <!-- Header Buttons -->
            <div class="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
                <h1 class="text-xl md:text-2xl font-semibold">Products</h1>
                <div class="flex flex-wrap space-x-2">
                    <NuxtLink :to="`/inventory/${$route.params.inventoryId}/add`" class="p-1 bg-green-800 text-white rounded-md">Add</NuxtLink>

                    <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">Export</button>
                    <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">Import</button>
                    <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">More actions</button>
                    <div>
                        <button @click="goToAddProductPage" class="bg-black text-white px-2 md:px-3 py-1.5 rounded-md lg:ml-4">Add New Product</button>
                    </div>
                </div>
            </div>

            <FilterBar @changeTab="setTab" />

            <!-- Responsive Table for Large Screens -->
            <div class="hidden lg:block overflow-x-auto bg-white shadow-md rounded-lg">
                <table class="min-w-full table-auto divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bar Code</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchasing Date</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Id</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="batch in batches" :key="batch.BatchNumber" class="hover:bg-gray-100">
                            <td >
                                <svg :id="'barcode-' + batch.BatchNumber" class="barcode"></svg>
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap">{{ new Date(batch.BatchDate).toLocaleDateString() }}</td>
                            <td class="px-4 py-4 whitespace-nowrap">{{ new Date(batch.ExpiryDate).toLocaleDateString() }}</td>
                            <td class="px-4 py-4 whitespace-nowrap">{{ batch.ProductId }}</td>
                            <td class="px-4 py-4 whitespace-nowrap">{{ batch.Quantity }}</td>
                            <td class="flex gap-2 p-1 m-1">
                                <button @click="downloadBarcode(batch.BatchNumber)" class="p-1 bg-blue-500 text-white font-semibold rounded-md w-fit mt-1">Download</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import JsBarcode from "jsbarcode";

export default {
    data() {
        return {
            
batches: [
                {
                    BatchNumber: "BN001sjdfi4",
                    BatchDate: "2023-01-15T08:00:00Z",
                    ExpiryDate: "2024-01-15T08:00:00Z",
                    ProductId: "P001",
                    Quantity: 100,
                },
                {
                    BatchNumber: "BN002",
                    BatchDate: "2023-02-20T08:00:00Z",
                    ExpiryDate: "2024-02-20T08:00:00Z",
                    ProductId: "P002",
                    Quantity: 200,
                },
                {
                    BatchNumber: "BN003",
                    BatchDate: "2023-03-10T08:00:00Z",
                    ExpiryDate: "2024-03-10T08:00:00Z",
                    ProductId: "P003",
                    Quantity: 150,
                },
                {
                    BatchNumber: "BN004",
                    BatchDate: "2023-04-05T08:00:00Z",
                    ExpiryDate: "2024-04-05T08:00:00Z",
                    ProductId: "P004",
                    Quantity: 300,
                },
                {
                    BatchNumber: "BN005",
                    BatchDate: "2023-05-25T08:00:00Z",
                    ExpiryDate: "2024-05-25T08:00:00Z",
                    ProductId: "P005",
                    Quantity: 250,
                },
            ],
        };
    },
    mounted() {
        this.generateBarcodes();
    },
    methods: {
        generateBarcodes() {
            this.batches.forEach((batch) => {
                const barcodeElement = document.getElementById(`barcode-${batch.BatchNumber}`);
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
            const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${batchNumber}.svg`; // Change extension to .png if you want PNG format
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        },
    },
};
</script>
