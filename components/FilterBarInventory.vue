<template>
    <div>
      <div class="flex justify-between items-center bg-white shadow-sm p-4 mb-4 rounded-lg">
        <div class="flex space-x-2 lg:space-x-4">
          <button
            v-for="tab in predefinedTabs"
            :key="tab"
            @click="changeTab(tab)"
            :class="tabClass(tab)"
            class="px-2 lg:px-4 py-2 text-sm font-medium rounded-lg focus:outline-none"
          >
            {{ tab }}
          </button>
  
          <div v-for="(filter, index) in filters" :key="index" class="flex items-center bg-gray-200 rounded-lg px-2 py-1">
            <span class="text-sm">{{ filter }}</span>
            <button @click="removeFilter(index)" class="ml-2 text-gray-500 hover:text-black">x</button>
          </div>
  
          <!-- <button @click="openModal" class="text-xl text-gray-500 hover:text-black">+</button> -->
        </div>
  
        <div class="flex space-x-2 lg:space-x-4 items-center">
          <div v-if="searchVisible" class="flex items-center bg-gray-100 rounded-lg px-4 py-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Searching all products"
              class="bg-transparent focus:outline-none text-sm w-48 lg:w-64"
              @input="performSearch"
            />
            <button @click="clearSearch" class="ml-2 text-gray-500 hover:text-black">
              Cancel
            </button>
          </div>
  
          <div class="relative w-full sm:w-auto sm:ml-2 mt-2 sm:mt-0">
            <button class="bg-white border px-4 py-2 w-full sm:w-auto rounded flex items-center justify-between" @click="toggleSortDropdown">
              Sort: {{ selectedSort }}
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-if="showSortDropdown" class="absolute mt-1 right-0 w-full sm:w-48 bg-white border rounded shadow-lg z-10">
              <ul>
                <li v-for="option in sortOptions" :key="option" class="px-4 py-2 cursor-pointer hover:bg-gray-100" @click="selectSortOption(option)">
                  {{ option }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Create new view</h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="newFilterName"
              type="text"
              class="mt-1 block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter filter name"
            />
            <p class="text-right text-sm text-gray-400">{{ newFilterName.length }}/40</p>
          </div>
          <div class="flex justify-end">
            <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</button>
            <button @click="addFilter" class="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" :disabled="newFilterName.length === 0">
              Create view
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      products: {
        type: Array,
        required: true,
      },
      onSort: {
        type: Function,
        required: true,
      }
    },
    data() {
      return {
        predefinedTabs: ['All'],
        activeTab: 'All',
        searchVisible: false,
        searchQuery: '',
        isModalOpen: false,
        newFilterName: '',
        filters: [],
        showSortDropdown: false,
        selectedSort: 'Best selling',
        sortOptions: [
          'Best selling',
          'Product title A-Z',
          'Product title Z-A',
          'Highest price',
          'Lowest price',
          'Newest',
          'Oldest',
          'Manually',
        ],
      };
    },
    methods: {
      tabClass(tab) {
        return this.activeTab === tab
          ? 'bg-blue-100 text-blue-700 border-blue-500 ring-1 ring-blue-500'
          : 'text-gray-600 hover:text-black';
      },
      changeTab(tab) {
        this.activeTab = tab;
        this.$emit('changeTab', tab);
      },
      toggleSortDropdown() {
        this.showSortDropdown = !this.showSortDropdown;
      },
      selectSortOption(option) {
        this.selectedSort = option;
        this.showSortDropdown = false; // Hide dropdown after selection
        this.sortProducts(); // Call sort method when an option is selected
      },
      sortProducts() {
        this.onSort(this.selectedSort); // Pass the selected sort option to the parent component
      },
      performSearch() {
        this.$emit('search', this.searchQuery); // Emit the search query to parent
      },
      clearSearch() {
        this.searchQuery = '';
        this.searchVisible = false;
        this.$emit('search', ''); // Emit empty search query to clear results
      },
      openModal() {
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
        this.newFilterName = '';
      },
      addFilter() {
        if (this.newFilterName.trim() !== '') {
          this.filters.push(this.newFilterName.trim());
          this.$emit('filterChange', this.filters); // Emit the updated filters to the parent
          this.closeModal();
        }
      },
      removeFilter(index) {
        this.filters.splice(index, 1);
        this.$emit('filterChange', this.filters); // Emit the updated filters to the parent
      }
    }
  }
  </script>
  
  <style scoped>
  .tab {
    transition: all 0.3s ease-in-out;
  }
  </style>
  