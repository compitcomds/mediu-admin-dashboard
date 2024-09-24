<!-- components/MainForm.vue -->
<template>
  <div class="space-y-8">
    <div class="bg-white p-6 rounded-xl shadow-md space-y-8">
      <!-- Title and Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Title</label>
        <input type="text"
          class="mt-1 py-3 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Short sleeve t-shirt" />

        <label class="block text-sm font-medium text-gray-700 mt-6">Description</label>
        <textarea
          class="mt-1 py-3 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          rows="4" placeholder="Description"></textarea>
      </div>

      <!-- Media Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Media</label>
        <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border border-dashed border-black rounded-md">
          <div class="space-y-1 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
              aria-hidden="true">
              <path d="M24 4v16m0 0L8 12m16 8L40 12M4 28v16h16v-8h8v8h16V28m-24 0H8m16 0h16" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="flex items-center text-sm text-gray-600">
              <label for="file-upload"
                class="relative cursor-pointer p-1 bg-slate-100 rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Upload New</span>
                <input id="file-upload" name="file-upload" type="file" class="sr-only" />
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Category</label>
        <input type="number"
          class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="" />
      </div>
    </div>
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
    <div class="bg-white p-6 rounded-xl shadow-md">
      <!-- Inventory -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Inventory</label>
        <div class="mt-1">
          <div class="flex items-center">
            <input id="track-quantity" name="track-quantity" type="checkbox"
              class="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            <label for="track-quantity" class="ml-2 block text-sm text-gray-900">Track quantity</label>
          </div>
          <div class="mt-4">
            <div class="flex items-center justify-between my-2">
              <h2 class="block text-gray-800">Quantity</h2>
              <h2 class="block text-blue-600">Edit Locations</h2>
            </div>
            <div class="border border-b my-2"></div>
            <div class="flex">
              <h2 class="w-full lg:w-1/2">Shop Location</h2>
              <input type="number"
                class="block w-full border lg:w-1/2 p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="0" />
            </div>
            <div class="my-2 flex justify-between">
              <input id="continue-selling" name="continue-selling" type="checkbox"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded" />
              <div class="flex flex-col">
                <label for="continue-selling" class="ml-2 block text-sm text-gray-900">Continue selling when out of
                  stock</label>
                <p class="ml-2 text-sm text-slate-400">This won't affect Shopify POS. Staff will see a warning, but can complete sales when
                  available
                  inventory reaches zero and below.</p>
              </div>
            </div>
          </div>
          <div class="flex justify-between gap-4">
            <div>
              <label class="block text-sm mb-1 font-medium text-gray-500">SKU (Stock Keeping Unit)</label>
              <input type="text"
                class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="SKU" />
            </div>
            <div>
              <label class="block text-sm mb-1 font-medium text-gray-500">Barcode (ISBN, UPC, GTIN, etc.)</label>
              <input type="text"
                class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Barcode" />
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <div class="bg-white p-6 rounded-xl shadow-md">
      <!-- Variants -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Variants</label>
        <button class="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
          <p>Add options like size or color</p>
        </button>
      </div>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-md">
      <!-- Metafields -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Metafields</label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
          <input type="text"
            class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Manufacturers" />
          <input type="text"
            class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Is taken in pregnancy" />
          <input type="text"
            class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Is prescription needed" />
          <input type="text"
            class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Best Use Before" />
          <input type="text"
            class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Safety information" />
          <input type="text"
            class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="How to use" />
          <input type="text"
            class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Key Benefits" />
        </div>
      </div>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-md">
      <h2 class="text-lg font-semibold mb-4">Search engine listing</h2>
      <div class="bg-gray-50 p-4 rounded-lg border">
        <label class="block text-sm font-medium text-gray-700">SEO Title</label>
        <input type="text"
          class="mt-1 block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="SEO Title" />

        <label class="block text-sm font-medium text-gray-700 mt-6">SEO Description</label>
        <textarea
          class="mt-1 block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          rows="2" placeholder="SEO Description"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainForm",
};
</script>
