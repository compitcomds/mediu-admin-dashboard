<template>
    <div class="bg-white p-6 rounded-xl shadow-md">
        <!-- Pricing -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Pricing</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
            <div>
              <label class="block text-sm font-medium text-gray-500">Price</label>
              <input type="number"
                class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="0.00" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500">Compare at price</label>
              <input type="number"
                class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="0.00" />
            </div>
          </div>
  
          <div class="mt-4 flex items-center">
            <input id="tax-checkbox" name="tax-checkbox" type="checkbox"
              class="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            <label for="tax-checkbox" class="ml-2 block text-sm text-gray-900">Charge tax on this product</label>
          </div>
          <h2 class="text-blue-600 my-4">Manage international pricing</h2>
          <div class="border-t"></div>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-500">Cost per item</label>
              <input type="number"
                class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="0.00" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500">Profit</label>
              <input type="number"
                class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="0.00" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500">Margin</label>
              <input type="number"
                class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="0.00" />
            </div>
          </div>
        </div>
      </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>