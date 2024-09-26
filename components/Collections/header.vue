<!-- components/HeaderSection.vue -->
<template>
    <div class="flex justify-between items-center mb-8 border-b pb-4">
      <h1 class="text-2xl font-bold">Create Collection</h1>
      <div class="flex space-x-4">
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Discard</button>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HeaderSection',
  }
  </script>
  