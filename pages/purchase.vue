<template>
  <div class="flex flex-col h-screen py-10 lg:py-5">
    <Sidenav />
    <div
      class="lg:ml-64 flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 mt-4 items-center justify-center bg-gray-100"
    >
      <NavigationButton />
      <h1 class="text-2xl font-semibold text-gray-800 mb-6">
          Purchase orders
        </h1>
      <!-- Header Section -->
      <div class="flex flex-col justify-center items-center bg-white rounded-2xl shadow-md py-4">
        

        <!-- Image Section -->
        <div class="flex justify-center mb-6">
          <img
            src="https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/empty-state-purchase-DmIBo_-747ua.svg"
            alt="Manage your purchase orders"
          />
        </div>

        <!-- Description Section -->
        <p class="text-lg text-gray-600 mb-4 flex flex-col items-center justify-center">
          Manage your purchase orders<br />
          <span class="text-sm text-gray-500"
            >Track and receive inventory ordered from suppliers.</span
          >
        </p>

        <!-- Button Section -->
        <nuxt-link to="/create-purchaseOrder"
          class="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-300"
        >
          Create purchase order
        </nuxt-link>

        <!-- Footer Link Section -->
        <div class="mt-6">
          <a href="#" class="text-sm text-blue-500 hover:underline"
            >Learn more about purchase orders</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PurchaseOrder",
};
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
