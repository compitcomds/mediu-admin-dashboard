<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidenav />
    <div class="ml-64 flex-1 overflow-y-auto p-8 mt-10 bg-gray-100">
      <NavigationButton />
      <!-- Header Section -->
      <HeaderSection />

      <div class="flex flex-1 gap-8">
        <!-- Main Form Section -->
        <MainForm class="w-2/3" />

        <!-- Additional Details Section -->
        <AdditionalDetails class="w-1/3" />
      </div>
    </div>
  </div>
</template>

<script>



export default {
  
};
</script>
