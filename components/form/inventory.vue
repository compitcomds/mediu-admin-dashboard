<template>
  <div class="bg-white p-6 rounded-xl shadow-md">
    <!-- Inventory -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Inventory</label>
      <div class="mt-1">
        <div class="flex items-center">
          <input id="track-quantity" name="track-quantity" type="checkbox" class="h-4 w-4 text-blue-600 border-gray-300 rounded" />
          <label for="track-quantity" class="ml-2 block text-sm text-gray-900">Track quantity</label>
        </div>
        <div class="mt-4">
          <div class="flex items-center justify-between my-2">
            <h2 class="block text-gray-800">Quantity</h2>
            <h2 class="block text-blue-600 cursor-pointer" @click="showModal = true">Edit Locations</h2>
          </div>
          <div class="border border-b my-2"></div>
          <div class="flex">
            <h2 class="w-full lg:w-1/2">Shop Location</h2>
            <input type="number" class="block w-full border lg:w-1/2 p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="0" />
          </div>
          <div class="my-2 flex justify-between">
            <input id="continue-selling" name="continue-selling" type="checkbox" class="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            <div class="flex flex-col">
              <label for="continue-selling" class="ml-2 block text-sm text-gray-900">Continue selling when out of stock</label>
              <p class="ml-2 text-sm text-slate-400">This won't affect Shopify POS. Staff will see a warning, but can complete sales when
                available inventory reaches zero and below.</p>
            </div>
          </div>
        </div>
        <div class="flex justify-between gap-4">
          <div>
            <label class="block text-sm mb-1 font-medium text-gray-500">SKU (Stock Keeping Unit)</label>
            <input type="text" class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="SKU" />
          </div>
          <div>
            <label class="block text-sm mb-1 font-medium text-gray-500">Barcode (ISBN, UPC, GTIN, etc.)</label>
            <input type="text" class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Barcode" />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Edit locations</h3>
          <button @click="showModal = false" class="text-gray-500 hover:text-gray-700">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="border border-yellow-200 bg-yellow-50 p-4 rounded-md text-yellow-800 mb-4">
          <p>You must select at least one location for your variant.</p>
        </div>
        <div>
          <h4 class="text-sm text-gray-700 mb-2">Select locations that stock the selected variants.</h4>
          <div class="flex items-center mb-2">
            <input type="checkbox" id="select-all" class="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            <label for="select-all" class="ml-2 text-sm text-blue-600 cursor-pointer">Select all</label>
          </div>
          <div class="flex items-center mb-2">
            <input type="checkbox" id="shop-location" v-model="shopLocationChecked" class="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            <label for="shop-location" class="ml-2 text-sm text-gray-900">Shop location</label>
          </div>
          <div class="flex items-center mb-2">
            <input type="checkbox" id="warehouse-location" class="h-4 w-4 border-gray-300 rounded" disabled />
            <label for="warehouse-location" class="ml-2 text-sm text-gray-400">Snow City Warehouse <span class="text-gray-500">(Add a SKU to use this location)</span></label>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button @click="showModal = false" class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</button>
          <button class="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false, // Controls the modal visibility
      shopLocationChecked: true // Default selection for Shop Location
    };
  }
};
</script>

<style scoped>
/* Optional styles for the modal background */
</style>
