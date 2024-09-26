<template>
  <div class="border rounded-md p-4 bg-white w-full mx-auto">
    <h3 class="font-bold text-lg mb-4">Products</h3>
    <div class="flex items-center mb-4">
      <div class="relative mr-2">
        <button class="bg-white border px-4 py-2 rounded flex items-center" @click="toggleSearchCriteriaDropdown">
          Search by: {{ selectedSearchCriteria }}
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div v-if="showSearchCriteriaDropdown" class="absolute mt-1 left-0 w-48 bg-white border rounded shadow-lg z-10">
          <ul>
            <li v-for="criteria in searchCriteria" :key="criteria" class="px-4 py-2 cursor-pointer hover:bg-gray-100" @click="selectSearchCriteria(criteria)">
              {{ criteria }}
            </li>
          </ul>
        </div>
      </div>
      <input
        type="text"
        :placeholder="'Search products by ' + selectedSearchCriteria"
        class="border p-2 rounded-md flex-1 mr-2"
        v-model="searchText"
      />
      <button @click="openModal" class="bg-blue-600 text-white px-4 py-2 rounded mr-2">
        Browse
      </button>
      <div class="relative">
        <button class="bg-white border px-4 py-2 rounded flex items-center" @click="toggleSortDropdown">
          Sort: {{ selectedSort }}
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div v-if="showSortDropdown" class="absolute mt-1 right-0 w-48 bg-white border rounded shadow-lg z-10">
          <ul>
            <li v-for="option in sortOptions" :key="option" class="px-4 py-2 cursor-pointer hover:bg-gray-100" @click="selectSortOption(option)">
              {{ option }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="filteredProducts.length === 0" class="text-center p-8 text-gray-500">
      <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M9 12h6M6 17h12M3 7l3 14h12l3-14H3z"></path>
      </svg>
      <p>There are no products in this collection. Search or browse to add products.</p>
    </div>
    <div v-else>
      <div
        v-for="(product, index) in sortedProducts"
        :key="index"
        class="flex items-center justify-between p-4 border-b"
      >
        <div class="flex items-center">
          <img :src="product.image" alt="product image" class="w-12 h-12 rounded mr-4"/>
          <span class="mr-4">{{ index + 1 }}.</span>
          <span>{{ product.name }}</span>
        </div>
        <div class="text-sm text-green-600">{{ product.status }}</div>
        <button class="text-red-500 ml-4" @click="removeProduct(index)">x</button>
      </div>
    </div>

    <!-- Modal -->
    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50" v-if="isModalOpen">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div class="p-4 border-b">
          <h2 class="text-xl font-semibold">Add products</h2>
        </div>
        <div class="p-4">
          <input
            type="text"
            v-model="searchQuery"
            :placeholder="'Search products by ' + selectedSearchCriteria"
            class="w-full px-3 py-2 mb-4 border rounded"
          />
          <ul class="max-h-64 overflow-y-auto">
            <li
              v-for="(product, index) in filteredModalProducts"
              :key="index"
              class="flex items-center justify-between p-2 border-b cursor-pointer hover:bg-gray-100"
              @click="toggleSelection(product)"
            >
              <div class="flex items-center">
                <img :src="product.image" alt="product image" class="w-10 h-10 rounded mr-4"/>
                <span>{{ product.name }}</span>
              </div>
              <span v-if="selectedProducts.includes(product)" class="text-blue-500">Selected</span>
            </li>
          </ul>
        </div>
        <div class="flex justify-end p-4 border-t">
          <button class="mr-4 text-gray-700" @click="closeModal">Cancel</button>
          <button class="bg-blue-600 text-white px-4 py-2 rounded" @click="addProducts">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      isModalOpen: false,
      showSortDropdown: false,
      showSearchCriteriaDropdown: false,
      selectedSearchCriteria: "Name",
      selectedSort: "Best selling",
      searchCriteria: ["Name", "Alphabet", "Price"],
      sortOptions: [
        "Best selling",
        "Product title A-Z",
        "Product title Z-A",
        "Highest price",
        "Lowest price",
        "Newest",
        "Oldest",
        "Manually",
      ],
      searchQuery: "",
      products: [
        { name: "ACNE OC MOISTURISER GM 50", status: "Active", image: "https://via.placeholder.com/50", price: 10, dateAdded: "2023-01-01" },
        { name: "ACNE UV SPF 50 SUNSCREEN 50", status: "Active", image: "https://via.placeholder.com/50", price: 20, dateAdded: "2023-02-01" },
        { name: "anant11", status: "Draft", image: "https://via.placeholder.com/50", price: 5, dateAdded: "2022-12-01" },
        { name: "blowshine", status: "Active", image: "https://via.placeholder.com/50", price: 15, dateAdded: "2023-03-01" },
      ],
      selectedProducts: [],
    };
  },
  computed: {
    filteredProducts() {
      return this.filterByCriteria(this.selectedProducts, this.searchText);
    },
    filteredModalProducts() {
      return this.filterByCriteria(this.products, this.searchQuery);
    },
    sortedProducts() {
      let sortedArray = [...this.filteredProducts];
      switch (this.selectedSort) {
        case "Product title A-Z":
          sortedArray.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "Product title Z-A":
          sortedArray.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "Highest price":
          sortedArray.sort((a, b) => b.price - a.price);
          break;
        case "Lowest price":
          sortedArray.sort((a, b) => a.price - b.price);
          break;
        case "Newest":
          sortedArray.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
          break;
        case "Oldest":
          sortedArray.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
          break;
        case "Manually":
          // Implement custom manual sorting logic if needed
          break;
        default:
          // "Best selling" or any other case
          break;
      }
      return sortedArray;
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    toggleSelection(product) {
      const index = this.selectedProducts.indexOf(product);
      if (index > -1) {
        this.selectedProducts.splice(index, 1);
      } else {
        this.selectedProducts.push(product);
      }
    },
    addProducts() {
      this.closeModal();
    },
    removeProduct(index) {
      this.selectedProducts.splice(index, 1);
    },
    toggleSortDropdown() {
      this.showSortDropdown = !this.showSortDropdown;
    },
    toggleSearchCriteriaDropdown() {
      this.showSearchCriteriaDropdown = !this.showSearchCriteriaDropdown;
    },
    selectSortOption(option) {
      this.selectedSort = option;
      this.showSortDropdown = false;
    },
    selectSearchCriteria(criteria) {
      this.selectedSearchCriteria = criteria;
      this.showSearchCriteriaDropdown = false;
    },
    filterByCriteria(products, query) {
      if (this.selectedSearchCriteria === "Name") {
        return products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
      } else if (this.selectedSearchCriteria === "Alphabet") {
        return products.filter(product => product.name[0].toLowerCase() === query.toLowerCase());
      } else if (this.selectedSearchCriteria === "Price") {
        return products.filter(product => product.price.toString().includes(query));
      }
      return products;
    }
  }
};
</script>

<style scoped>
/* Add any specific styling if needed */
</style>
