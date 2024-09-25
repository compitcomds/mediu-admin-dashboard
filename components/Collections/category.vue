<template>
    <div>
      <label class="block text-sm font-medium text-gray-700">Category</label>
      <select
        class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        v-model="selectedCategory"
      >
        <option disabled value="">Select a category</option>
        <option v-for="(category, index) in categories" :key="index" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedCategory: '', // Holds the selected category
        categories: ['Electronics', 'Clothing', 'Books', 'Home Appliances', 'Sports'], // List of options
      };
    },
  };
  </script>
  
  <style scoped>
  </style>
  