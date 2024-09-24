<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidenav />
    <div class="ml-64 flex-1 overflow-y-auto p-8 mt-10 bg-gray-100">
      <NavigationButton />

      <!-- Header Buttons -->
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-semibold">Products</h1>
        <div>
          <button class="bg-gray-200 px-3 py-1 rounded-md mr-2">Export</button>
          <button class="bg-gray-200 px-3 py-1 rounded-md mr-2">Import</button>
          <button class="bg-gray-200 px-3 py-1 rounded-md">More actions</button>
          <nuxt-link to="/addProduct" class="bg-black text-white px-3 py-1.5 rounded-md ml-4">
            Add product
          </nuxt-link>
        </div>
      </div>
      <FilterBar @changeTab="setTab" />

      <!-- Product Table -->
      <div class="bg-white shadow-md rounded-lg">
        <table class="min-w-full table-auto divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" />
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Inventory
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sales Channels
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Markets
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                B2B Catalogs
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(product, index) in filteredProducts" :key="product.id" class="hover:bg-gray-100">
              <td class="px-4 py-4 whitespace-nowrap">
                <input type="checkbox" />
              </td>
              <td class="px-4 py-4 break-words whitespace-normal relative group">
                <a :href="product.link" class="flex items-center text-blue-600 hover:underline">
                  <img :src="product.image" alt="Product Image" class="w-10 h-10 mr-3 rounded"/>
                  {{ product.name }}
                </a>
                <span
                  class="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-eye w-5 h-5 text-gray-500">
                    <path
                      d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                <span :class="product.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                  " class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ product.status }}
                </span>
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                {{ product.inventory }}
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                {{ product.salesChannels }}
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                {{ product.markets }}
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                {{ product.b2bCatalogs }}
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                {{ product.category }}
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                {{ product.type }}
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                {{ product.vendor }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import FilterBar from "~/components/FilterBar";

export default {
  components: {
    FilterBar,
  },
  data() {
    return {
      products: [
        {
          id: 1,
          image: "https://placehold.co/50x50/png",
          name: "ACNE OC MOISTURISER GM 50",
          status: "Active",
          inventory: "400,000 in stock",
          salesChannels: 4,
          markets: 3,
          b2bCatalogs: 0,
          category: "Acne Treatments & Kits",
          type: "Acne",
          vendor: "Dev MediU",
          link: "orders",
        },
        {
          id: 2,
          image: "https://placehold.co/50x50/png",
          name: "ACNE UV SPF 50 SUNSCREEN 50",
          status: "Active",
          inventory: "10,000 in stock",
          salesChannels: 4,
          markets: 3,
          b2bCatalogs: 0,
          category: "Sunscreen",
          type: "Skin Care",
          vendor: "Dev MediU",
          link: "orders",
        },
        {
          id: 3,
          image: "https://placehold.co/50x50/png",
          name: "Draft Product",
          status: "Draft",
          inventory: "0 in stock",
          salesChannels: 3,
          markets: 3,
          b2bCatalogs: 0,
          category: "Seafood",
          type: "Seafood",
          vendor: "Dev MediU",
          link: "orders",
        },
        // Add more products as needed
      ],
      activeTab: "All",
    };
  },
  computed: {
    filteredProducts() {
      if (this.activeTab === "All") return this.products;
      return this.products.filter(
        (product) => product.status === this.activeTab
      );
    },
  },
  methods: {
    setTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style scoped>
.table-fixed {
  table-layout: fixed;
  width: 100%;
}

.min-w-0 {
  min-width: 0;
}

@media (max-width: 1024px) {
  .table-responsive {
    display: block;
    overflow-x: auto;
  }

  /* Adjust column visibility for smaller screens */
  th:nth-child(5),
  td:nth-child(5),
  /* Sales Channels */
  th:nth-child(6),
  td:nth-child(6),
  /* Markets */
  th:nth-child(7),
  td:nth-child(7),
  /* B2B Catalogs */
  th:nth-child(8),
  td:nth-child(8),
  /* Category */
  th:nth-child(9),
  td:nth-child(9),
  /* Type */
  th:nth-child(10),
  td:nth-child(10) {
    /* Vendor */
    display: none;
  }
}
</style>
