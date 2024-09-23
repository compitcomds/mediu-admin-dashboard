<template>
    <div class="flex h-screen">
      <!-- Sidebar -->
      <Sidenav />
  
      <!-- Main Content -->
      <Main />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dropdowns: {
          orders: false,
          products: false,
          customers: false,
          content: false,
          analytics: false,
          marketing: false,
          discounts: false
        }
      };
    },
    methods: {
      toggleDropdown(dropdown) {
        this.dropdowns[dropdown] = !this.dropdowns[dropdown];
      }
    }
  }
  </script>
  
  <style scoped>
  /* Custom scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  </style>
  