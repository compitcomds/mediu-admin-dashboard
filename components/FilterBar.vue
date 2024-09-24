<template>
    <div class="flex justify-between items-center bg-white shadow-sm p-4 mb-4 rounded-lg">
      <!-- Tabs for filter options -->
      <div class="flex space-x-4">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="changeTab(tab)"
          :class="tabClass(tab)"
          class="px-4 py-2 text-sm font-medium rounded-lg focus:outline-none"
        >
          {{ tab }}
        </button>
        <button class="text-xl text-gray-500 hover:text-black">+</button>
      </div>
  
      <!-- Search and Filter Icons -->
      <div class="flex space-x-4 items-center">
        <button class="text-gray-500 hover:text-black focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 17a4 4 0 100-8 4 4 0 000 8z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35" />
          </svg>
        </button>
        <button class="text-gray-500 hover:text-black focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 10h12M6 14h12M6 18h12M6 6h12" />
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tabs: ['All', 'Active', 'Draft', 'Archived'],
        activeTab: 'All'
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
      }
    }
  }
  </script>
  
  <style scoped>
  .tab {
    transition: all 0.3s ease-in-out;
  }
  </style>
  