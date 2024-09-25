<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidenav />
    <div class="lg:ml-64 flex-1 overflow-y-auto p-8 mt-10">
      <NavigationButton />
      <div>
        <!-- Header -->
        <h1 class="text-2xl font-semibold mb-4">Abandoned Checkouts</h1>

        <!-- Notification Banner -->
        <div
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center mb-8"
        >
          <div class="flex items-center">
            <!-- Notification Content -->
            <div class="mr-4 flex items-center">
              <img
                src="https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/abandoned-checkout-BZHL41bW-VEl.svg"
                alt=""
              />
            </div>
            <div>
              <h2 class="text-lg font-semibold">
                Upgrade to the new abandoned checkout automation
              </h2>
              <p class="text-gray-600">
                Personalize your messaging with improved email editing and
                workflow customization. Better still, recover even more sales
                with the newly added abandoned cart and product-browse
                automations.
              </p>
            </div>
          </div>
          <!-- Action Button -->
          <button
            class="border border-gray-300 py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Visit marketing automations
          </button>
        </div>

        <!-- Empty State -->
        <div
          class="bg-white p-12 rounded-lg shadow-sm text-center border border-gray-200"
        >
          <div class="flex justify-center mb-6">
            <!-- Cart Icon with Cross -->
            <img
              src="https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/abandoned-checkouts-empty-DwVH2CctOQqw.svg"
              alt=""
            />
          </div>
          <h3 class="text-lg font-semibold mb-2">
            Abandoned checkouts will show here
          </h3>
          <p class="text-gray-500">
            See when customers put an item in their cart but don’t check out.
            You can also email customers a link to their cart.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AbandonedCheckoutsPage",
};
</script>

<style scoped>
/* Custom styles for the page if needed */
</style>
