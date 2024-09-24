<template>
    <div class="container mx-auto p-8 bg-white shadow-lg rounded-lg max-w-screen-lg">
      <!-- Header Section -->
      <div class="flex justify-between items-center mb-8 border-b pb-4">
        <h1 class="text-2xl font-bold">Add Product</h1>
        <div class="flex space-x-4">
          <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Discard</button>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
        </div>
      </div>
  
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column (Main Form) -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Title and Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Short sleeve t-shirt">
  
            <label class="block text-sm font-medium text-gray-700 mt-6">Description</label>
            <textarea class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" rows="4" placeholder="Description"></textarea>
          </div>
  
          <!-- Media Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Media</label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M24 4v16m0 0L8 12m16 8L40 12M4 28v16h16v-8h8v8h16V28m-24 0H8m16 0h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" class="sr-only">
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
  
          <!-- Pricing -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Pricing</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
              <div>
                <label class="block text-xs font-medium text-gray-500">Price</label>
                <input type="number" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="0.00">
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">Compare at price</label>
                <input type="number" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="0.00">
              </div>
            </div>
  
            <div class="mt-4 flex items-center">
              <input id="tax-checkbox" name="tax-checkbox" type="checkbox" class="h-4 w-4 text-blue-600 border-gray-300 rounded">
              <label for="tax-checkbox" class="ml-2 block text-sm text-gray-900">Charge tax on this product</label>
            </div>
  
            <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-medium text-gray-500">Cost per item</label>
                <input type="number" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="0.00">
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">Profit</label>
                <input type="number" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="0.00">
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">Margin</label>
                <input type="number" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="0.00">
              </div>
            </div>
          </div>
  
          <!-- Inventory -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Inventory</label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
              <div>
                <input id="track-quantity" name="track-quantity" type="checkbox" class="h-4 w-4 text-blue-600 border-gray-300 rounded">
                <label for="track-quantity" class="ml-2 block text-sm text-gray-900">Track quantity</label>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">SKU (Stock Keeping Unit)</label>
                <input type="text" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="SKU">
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">Barcode</label>
                <input type="text" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Barcode">
              </div>
            </div>
  
            <div class="mt-4">
              <label class="block text-xs font-medium text-gray-500">Quantity</label>
              <input type="number" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="0">
              <div class="mt-2 flex items-center">
                <input id="continue-selling" name="continue-selling" type="checkbox" class="h-4 w-4 text-blue-600 border-gray-300 rounded">
                <label for="continue-selling" class="ml-2 block text-sm text-gray-900">Continue selling when out of stock</label>
              </div>
            </div>
          </div>
  
          <!-- Shipping -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Shipping</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
              <div>
                <input id="physical-product" name="physical-product" type="checkbox" class="h-4 w-4 text-blue-600 border-gray-300 rounded">
                <label for="physical-product" class="ml-2 block text-sm text-gray-900">This is a physical product</label>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">Weight</label>
                <input type="number" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="0.0 kg">
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">Country/Region of origin</label>
                <select class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option>Select</option>
                  <option>India</option>
                  <option>USA</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">HS Code</label>
                <input type="text" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Harmonized System Code">
              </div>
            </div>
          </div>
  
          <!-- Variants -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Variants</label>
            <button class="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Add options like size or color</button>
          </div>
  
          <!-- Metafields -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Metafields</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
              <input type="text" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Manufacturers">
              <input type="text" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Is taken in pregnancy">
              <input type="text" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Is prescription needed">
              <input type="text" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Best Use Before">
              <input type="text" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Safety information">
              <input type="text" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="How to use">
              <input type="text" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Key Benefits">
            </div>
          </div>
        </div>
  
        <!-- Right Column (Additional Details) -->
        <div class="space-y-8">
          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <select class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <option>Active</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
          </div>
  
          <!-- Publishing -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Publishing</label>
            <div class="grid grid-cols-1 gap-4 mt-1">
              <div>
                <p class="text-sm font-medium text-gray-700">Sales channels</p>
                <p class="text-xs text-gray-500">Online Store, Headless, Shopify GraphiQL App, Point of Sale</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Markets</p>
                <p class="text-xs text-gray-500">India, International, and Mexico</p>
              </div>
            </div>
          </div>
  
          <!-- Product Organization -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Product organization</label>
            <div class="grid grid-cols-1 gap-4 mt-1">
              <input type="text" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Product type">
              <input type="text" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Vendor">
              <input type="text" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Collections">
              <input type="text" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Tags">
            </div>
          </div>
  
          <!-- Theme Template -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Theme template</label>
            <select class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <option>Default product</option>
              <option>Custom template</option>
            </select>
          </div>
        </div>
      </div>
  
      <!-- SEO Section -->
      <div class="mt-12">
        <h2 class="text-lg font-semibold mb-4">Search engine listing</h2>
        <div class="bg-gray-50 p-4 rounded-lg border">
          <label class="block text-sm font-medium text-gray-700">SEO Title</label>
          <input type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="SEO Title">
  
          <label class="block text-sm font-medium text-gray-700 mt-6">SEO Description</label>
          <textarea class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" rows="2" placeholder="SEO Description"></textarea>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductPage',
  }
  </script>
  
  <style scoped>
  .grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
  </style>
  