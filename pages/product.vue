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
          <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">Export</button>
          <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">Import</button>
          <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">More actions</button>
          <nuxt-link to="/addProduct" class="bg-black text-white px-2 md:px-3 py-1.5 rounded-md lg:ml-4">
            Add product
          </nuxt-link>
        </div>
      </div>

      <FilterBar @changeTab="setTab" />

      <!-- Responsive Product Cards for Small and Medium Screens -->
      <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:hidden">
        <div
          v-for="(product, index) in filteredProducts"
          :key="product.id"
          class="bg-white p-4 rounded-lg shadow-md space-y-2"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img :src="product.image" alt="Product Image" class="w-16 h-16 mr-4 rounded" />
              <div>
                <p class="text-lg font-semibold">{{ product.name }}</p>
                <p class="text-sm text-gray-500">{{ product.status }}</p>
              </div>
            </div>
            <input type="checkbox" />
          </div>
          <div class="text-sm text-gray-700 space-y-1">
            <p><strong>Inventory:</strong> {{ product.inventory }}</p>
            <p><strong>Sales Channels:</strong> {{ product.salesChannels }}</p>
            <p><strong>Markets:</strong> {{ product.markets }}</p>
            <p><strong>B2B Catalogs:</strong> {{ product.b2bCatalogs }}</p>
            <p><strong>Category:</strong> {{ product.category }}</p>
            <p><strong>Type:</strong> {{ product.type }}</p>
            <p><strong>Vendor:</strong> {{ product.vendor }}</p>
          </div>
          <div class="flex justify-end space-x-2">
            <button class="bg-gray-200 text-sm px-3 py-1 rounded-md">Edit</button>
            <button class="bg-gray-200 text-sm px-3 py-1 rounded-md">Delete</button>
          </div>
        </div>
      </div>

      <!-- Responsive Table for Large Screens -->
      <div class="hidden lg:block overflow-x-auto bg-white shadow-md rounded-lg">
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
            <tr
              v-for="(product, index) in filteredProducts"
              :key="product.id"
              class="hover:bg-gray-100"
            >
              <td class="px-4 py-4 whitespace-nowrap">
                <input type="checkbox" />
              </td>
              <td class="px-4 py-4 break-words whitespace-normal relative group">
                <a
                  :href="product.link"
                  class="flex items-center text-blue-600 hover:underline"
                >
                  <img
                    :src="product.image"
                    alt="Product Image"
                    class="w-10 h-10 mr-3 rounded"
                  />
                  {{ product.name }}
                </a>
                
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                <span
                  :class="product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
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
          link: "addProduct",
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
          link: "addProduct",
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
          link: "addProduct",
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
/* Responsive grid layout for small and medium screens */
.grid {
  display: grid;
  grid-template-columns: 1fr;
}

/* Styles for larger screens */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    display: none; /* Hide the grid layout on large screens */
  }
}

/* Scrollable table container for large screens */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
}
</style>
