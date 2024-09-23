<template>
    <div class="bg-black flex items-center justify-between px-4 py-4 fixed w-full">
      <!-- Shopify Logo -->
      <div class="flex items-center space-x-2">
        <span class="text-white text-lg font-bold">MediU Admin Dashboard</span>
      </div>
  
  
      <!-- User Icon and Name -->
      <div class="flex items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 14l6.16-3.422A2 2 0 0020 9.764V7.64a2 2 0 00-1.16-1.841l-6-3.33a2 2 0 00-1.68 0l-6 3.33A2 2 0 004 7.64v2.125a2 2 0 001.16 1.841L12 14z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 14v7"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 21v-7"
          />
        </svg>
        <div
          class="hidden sm:flex bg-purple-600 rounded-full px-4 py-1 text-white font-semibold"
        >
          Dev MediU
        </div>
        <!-- Show icon instead of text on small screens -->
        <div class="flex sm:hidden bg-purple-600 rounded-full h-8 w-8 text-white font-semibold items-center justify-center">
          DM
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchBar',
  }
  </script>
  
  <style scoped>
  /* Add custom styles here if necessary */
  </style>
  