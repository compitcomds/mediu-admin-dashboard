<template>
    <div class="bg-white p-6 rounded-xl shadow-md">
        <!-- Shipping -->
        <div>
          <label class="block text-base font-medium text-gray-700">Shipping</label>
          <div class="mt-1 space-y-4">
            <div class="flex items-center">
              <input id="physical-product" name="physical-product" type="checkbox"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded" />
              <label for="physical-product" class="ml-2 block text-sm text-gray-900">This is a physical product</label>
            </div>
            <div>
              <label class="block text-gray-700">Item weight (optional)</label>
              <div class="flex gap-2">
                <input  type="number" class="w-full border p-2 rounded-lg" placeholder="0" />
                <select  class="border p-2 rounded-lg">
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="lb">lb</option>
                  <option value="oz">oz</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500">Country/Region of origin</label>
              <select
                class="mt-1 block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>Select</option>
                <option>India</option>
                <option>USA</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500">Harmonized System (HS) code</label>
              <input type="text"
                class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search by product keyword or code" />
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