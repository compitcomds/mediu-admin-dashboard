<template>
  <div class="flex flex-col h-screen py-10 lg:py-5">
    <Sidenav />
    <div class="lg:ml-64 flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 mt-4 bg-gray-100">
      <NavigationButton />

      <!-- Header Buttons -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h1 class="text-xl md:text-2xl font-semibold">Inventory</h1>
        <input
          v-model="searchQuery"
          class="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
          type="text"
          placeholder="Search products..."
        />
      </div>

      <FilterBarInventory 
        :products="products" 
        :onSort="sortProducts" 
        @changeTab="setTab"
        @filterChange="applyFilters"
      />

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
                <p class="text-sm text-gray-500">{{ product.desc }}</p>
              </div>
            </div>
            <input type="checkbox" />
          </div>
          <div class="text-sm text-gray-700 space-y-1">
            <p><strong>Inventory:</strong> {{ product.inventory }}</p>
            <p><strong>SKU:</strong> {{ product.sku }}</p>
          </div>
          <div class="flex justify-end space-x-2">
            <button class="bg-gray-200 text-sm px-3 py-1 rounded-md">Edit</button>
            <button class="bg-gray-200 text-sm px-3 py-1 rounded-md">Delete</button>
          </div>
        </div>
      </div>

      <div class="hidden lg:block overflow-x-auto bg-white shadow-md rounded-lg w-full h-full">
        <table class="min-w-full table-auto divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3">
                <input type="checkbox" />
              </th>
              <th class="px-4 py-3 text-left">Product</th>
              <th class="px-4 py-3 text-center">SKU</th>
              <th class="px-4 py-3 text-center">Unavailable</th>
              <th class="px-4 py-3 text-center">Committed</th>
              <th class="px-4 py-3 text-left">Available</th>
              <th class="px-4 py-3 text-left">On Hand</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(product, index) in filteredProducts"
              :key="product.id"
              class="hover:bg-gray-100"
            >
              <td class="px-4 py-4">
                <input type="checkbox" />
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center">
                  <img :src="product.image" class="w-10 h-10 mr-3 rounded" />
                  <p>{{ product.name }}</p>
                </div>
              </td>
              <td class="px-4 py-4 text-center">{{ product.sku }}</td>
              <td class="px-4 py-4 text-center">{{ product.unavailable }}</td>
              <td class="px-4 py-4 text-center">{{ product.committed }}</td>
              <td class="px-4 py-4">
                <input
                  type="number"
                  v-model.number="product.available"
                  class="border border-gray-300 rounded-lg px-2 py-1 w-full"
                  min="0"
                />
              </td>
              <td class="px-4 py-4">
                <input
                  type="number"
                  v-model.number="product.onHand"
                  class="border border-gray-300 rounded-lg px-2 py-1 w-full"
                  min="0"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        { id: 1, image: 'path/to/image1.png', name: 'ACNE OC MOISTURISER GM 50', sku: 'ACNEOC', unavailable: 0, committed: 0, available: 400000, onHand: 400000, sales: 100 },
        { id: 2, image: 'path/to/image2.png', name: 'ACNE UV SPF 50 SUNSCREEN 50', sku: 'ACNE UV', unavailable: 0, committed: 0, available: 10000, onHand: 10000, sales: 200 },
        { id: 3, image: 'path/to/image3.png', name: 'cnant11', sku: 'No SKU', unavailable: 0, committed: 0, available: 0, onHand: 0, sales: 50 },
        // More product data...
      ],
      searchQuery: '',
      activeTab: 'All',
      appliedFilters: [],  // Store applied filters
    };
  },
  computed: {
    filteredProducts() {
      // Filter products based on search query and applied filters
      return this.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesFilters = this.appliedFilters.length === 0 || this.appliedFilters.includes(product.name); // Modify this line as per your filter logic
        return matchesSearch && matchesFilters;
      });
    },
  },
  methods: {
    setTab(tab) {
      this.activeTab = tab;
    },
    sortProducts(selectedSort) {
      switch (selectedSort) {
        case 'Best selling':
          this.products.sort((a, b) => b.sales - a.sales);
          break;
        case 'Product title A-Z':
          this.products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'Product title Z-A':
          this.products.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'Highest price':
          this.products.sort((a, b) => b.price - a.price);
          break;
        case 'Lowest price':
          this.products.sort((a, b) => a.price - b.price);
          break;
        case 'Newest':
          this.products.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'Oldest':
          this.products.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        default:
          break;
      }
      this.products = [...this.products]; // Force Vue to recognize the changes
    },
    applyFilters(filters) {
      this.appliedFilters = filters; // Update applied filters
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    display: none;
  }
}

.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
}
</style>
