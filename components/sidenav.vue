<template>
    <aside class="w-64 bg-gray-200 text-black p-4 fixed inset-y-0 left-0 top-16 hidden lg:block">
        <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div class="border border-slate-500 my-2"></div>
        <nav>
          <ul>
            <li class="mb-2">
              <a href="/" class="block py-2 px-4 hover:bg-gray-400 rounded">Home</a>
            </li>
            <li class="mb-2">
              <div @click="toggleDropdown('orders')" class="flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-gray-400 rounded">
                <span>Orders</span>
                <span :class="{'rotate-180': dropdowns.orders}" class="transition-transform transform"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg></span>
              </div>
              <ul v-if="dropdowns.orders" class="ml-4 space-y-1 mt-1">
                <li><a href="/orders" class="block py-1 px-2 hover:bg-gray-400 rounded">All Orders</a></li>
                <li><a href="/drafts" class="block py-1 px-2 hover:bg-gray-400 rounded">Drafts</a></li>
                <li><a href="/abandoned-checkouts" class="block py-1 px-2 hover:bg-gray-400 rounded">Abandoned checkouts</a></li>
              </ul>
            </li>
            <li class="mb-2">
              <div @click="toggleDropdown('products')" class="flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-gray-400 rounded">
                <span>Products</span>
                <span :class="{'rotate-180': dropdowns.products}" class="transition-transform transform"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg></span>
              </div>
              <ul v-if="dropdowns.products" class="ml-4 space-y-1 mt-1">
                <li><a href="/product" class="block py-1 px-2 hover:bg-gray-400 rounded">All Products</a></li>
                <li><a href="/collections" class="block py-1 px-2 hover:bg-gray-400 rounded">Collections</a></li>
                <li><a href="/inventory" class="block py-1 px-2 hover:bg-gray-400 rounded">Inventory</a></li>
                <li><a href="/purchase" class="block py-1 px-2 hover:bg-gray-400 rounded">Purchase Orders</a></li>
                <!-- <li><a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded">Transfers</a></li>
                <li><a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded">Gift Cards</a></li>
                <li><a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded">Catelogs</a></li> -->
              </ul>
            </li>
            <li class="mb-2">
              <a href="/customers" class="block py-2 px-4 hover:bg-gray-400 rounded">Customers</a>
            </li>
            <!-- <li class="mb-2">
              <div @click="toggleDropdown('content')" class="flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-gray-400 rounded">
                <span>Content</span>
                <span :class="{'rotate-180': dropdowns.content}" class="transition-transform transform"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg></span>
              </div>
              <ul v-if="dropdowns.content" class="ml-4 space-y-1 mt-1">
                
                <li><a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded">Metaobjects</a></li>
                <li><a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded">Files</a></li>
              </ul>
            </li>
            <li class="mb-2">
              <div @click="toggleDropdown('analytics')" class="flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-gray-400 rounded">
                <span>Analytics</span>
                <span :class="{'rotate-180': dropdowns.analytics}" class="transition-transform transform"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg></span>
              </div>
              <ul v-if="dropdowns.analytics" class="ml-4 space-y-1 mt-1">
                <li><a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded">Reports</a></li>
                <li><a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded">Live view</a></li>
              </ul>
            </li>
            <li class="mb-2">
              <div @click="toggleDropdown('marketing')" class="flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-gray-400 rounded">
                <span>Marketing</span>
                <span :class="{'rotate-180': dropdowns.marketing}" class="transition-transform transform"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg></span>
              </div>
              <ul v-if="dropdowns.marketing" class="ml-4 space-y-1 mt-1">
                <li><a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded">Campaigns</a></li>
                <li><a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded">Automations</a></li>
                
              </ul>
            </li>
            <li class="mb-2">
                <a href="#" class="block py-2 px-4 hover:bg-gray-400 rounded">Discounts</a>
            </li> -->
            <li class="mb-2">
                <a href="/consultancy" class="block py-2 px-4 hover:bg-gray-400 rounded">Consultancy</a>
            </li>
          </ul>
        </nav>
      </aside>
</template>

<script>
  export default {
    data() {
      return {
        dropdowns: {
          orders: false,
          products: false,
          customers: false,
          content: false,
          analytics: false,
          marketing: false,
          discounts: false
        }
      };
    },
    methods: {
      toggleDropdown(dropdown) {
        this.dropdowns[dropdown] = !this.dropdowns[dropdown];
      }
    }
  }
  </script>

<style scoped>

</style>