<template>
    <div>
      <div class="flex justify-between items-center bg-white shadow-sm p-4 mb-4 rounded-lg">
        <!-- Tabs for filter options -->
        <div class="flex space-x-2 lg:space-x-4">
          <!-- Predefined Tabs -->
          <button
            v-for="tab in predefinedTabs"
            :key="tab"
            @click="changeTab(tab)"
            :class="tabClass(tab)"
            class="px-2 lg:px-4 py-2 text-sm font-medium rounded-lg focus:outline-none"
          >
            {{ tab }}
          </button>
  
          <!-- User-Added Filters -->
          <div v-for="(filter, index) in filters" :key="index" class="flex items-center space-x-2">
            <button
              @click="changeTab(filter)"
              :class="tabClass(filter)"
              class="px-2 lg:px-4 py-2 text-sm font-medium rounded-lg focus:outline-none flex items-center"
            >
              {{ filter }}
              <button @click.stop="removeFilter(index)" class="ml-2 text-blue-700 hover:text-blue-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </button>
          </div>
  
          <!-- Add Filter Button -->
          <button @click="openModal" class="text-xl text-gray-500 hover:text-black">+</button>
        </div>
  
        <!-- Search and Filter Icons -->
        <div class="flex space-x-2 lg:space-x-4 items-center">
          <!-- Search Bar Toggle -->
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
          <button @click="toggleSearch" class="text-gray-500 hover:text-black focus:outline-none bg-slate-200 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-search h-6 w-6">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
          <!-- <button class="text-gray-500 hover:text-black focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 10h12M6 14h12M6 18h12M6 6h12" />
            </svg>
          </button> -->
        </div>
      </div>
  
      <!-- Modal Popup for Adding a Filter -->
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
    data() {
      return {
        predefinedTabs: ['All'], // Predefined tabs
        activeTab: 'All',
        searchVisible: false,  // Controls visibility of the search bar
        searchQuery: '',       // Stores the search query
        isModalOpen: false,    // Controls the visibility of the modal
        newFilterName: '',     // Stores the name of the new filter being added
        filters: []            // Stores the list of user-added filters
      }
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
      toggleSearch() {
        this.searchVisible = !this.searchVisible; // Toggle search visibility
        if (!this.searchVisible) {
          this.searchQuery = '';  // Reset search query if search is hidden
          this.$emit('search', '');  // Emit empty search query
        }
      },
      performSearch() {
        this.$emit('search', this.searchQuery); // Emit the search query to parent
      },
      clearSearch() {
        this.searchQuery = '';  // Clear the search input
        this.searchVisible = false;  // Hide the search input
        this.$emit('search', '');  // Emit empty search query to clear results
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
          this.closeModal();
        }
      },
      removeFilter(index) {
        this.filters.splice(index, 1);
      }
    }
  }
  </script>
  
  <style scoped>
  .tab {
    transition: all 0.3s ease-in-out;
  }
  </style>
  