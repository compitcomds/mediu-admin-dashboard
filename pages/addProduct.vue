<template>
  <div class="flex flex-col lg:flex-row h-screen">
    <!-- Sidebar for lg and xl -->
    <Sidenav  />

    <!-- Mobile Sidebar Toggle Button -->
    <button
      class="lg:hidden p-4 fixed z-20 top-2 left-2 bg-gray-800 text-white rounded-md"
      @click="toggleSidebar"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>

    <!-- Sidebar for Mobile -->
    <Sidenav v-if="sidebarVisible" class="lg:hidden fixed z-30 inset-y-0 left-0 bg-white shadow-md w-64" @close="toggleSidebar" />

    <div class="lg:ml-64 flex-1 overflow-y-auto p-4 mt-10 bg-gray-100 md:p-8  lg:mt-10">
      <NavigationButton />

      <!-- Header Section -->
      <HeaderSection class="mb-6" />

      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <!-- Main Form Section -->
        <MainForm class="w-full lg:w-2/3 mb-6 lg:mb-0" />

        <!-- Additional Details Section -->
        <AdditionalDetails class="w-full lg:w-1/3" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarVisible: false // Controls the visibility of the sidebar on mobile
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    }
  }
};
</script>

<style scoped>
/* Additional styling for fixed sidebar visibility */
</style>
