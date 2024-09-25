<!-- components/AdditionalDetails.vue -->
<template>
  <div class="space-y-8 h-fit">
    <!-- Status -->
    <div class=" bg-white p-6 rounded-2xl">
      <label class="block text-sm font-medium text-gray-700">Status</label>
      <select
        class="mt-1 block w-full border p-3 border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
        <option>Active</option>
        <option>Draft</option>
        <!-- <option>Archived</option> -->
      </select>
    </div>

    <!-- Publishing -->
    <div class=" bg-white p-6 rounded-2xl">
      <div class="flex items-center justify-between">
        <label class="block text-lg font-medium text-gray-700">Publishing</label>
        
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-ellipsis">
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </div>
      <div class="grid grid-cols-1 gap-4 mt-1">
        <div>
          <p class="text-sm font-medium text-gray-700">Sales channels</p>
          <!-- <p class="text-xs text-gray-500">Online Store, Headless, Shopify GraphiQL App, Point of Sale</p> -->
          <ul class="list-disc px-6">
            <li>Online Store</li>
            <li>Headless</li>
            <li>Shopify GraphiQL App</li>
            <li>Point of Sale</li>
          </ul>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-700">Markets</p>
          <!-- <p class="text-xs text-gray-500">India, International, and Mexico</p> -->
          <ul class="list-disc px-6">
            <li>India</li>
            <li>International</li>
            <li>Mexico</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Product Organization -->
    <div class=" bg-white p-6 rounded-2xl">
      <label class="block text-sm font-medium text-gray-700">Product organization</label>
      <div class="grid grid-cols-1 gap-4 mt-1">
        <input type="text"
          class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Product type">
        <input type="text"
          class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Vendor">
        <input type="text"
          class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Collections">
        <input type="text"
          class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Tags">
      </div>
    </div>

    <!-- Theme Template -->
    <div class=" bg-white p-6 rounded-2xl">
      <label class="block text-sm font-medium text-gray-700">Theme template</label>
      <select
        class="mt-1 block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
        <option>Default product</option>
        <option>Custom template</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdditionalDetails',
}
</script>