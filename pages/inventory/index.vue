<template>
  <div class="flex flex-col h-screen py-10 lg:py-0">
    <!-- Sidebar -->
    <Sidenav />
    <div
      class="lg:ml-64 flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 mt-4 bg-gray-100"
    >
      <NavigationButton />

      <!-- Header Buttons -->
      <div
        class="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0"
      >
        <h1 class="text-xl md:text-2xl font-semibold">Products</h1>
        <div class="flex flex-wrap space-x-2">
          <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">
            Export
          </button>
          <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">
            Import
          </button>
          <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">
            More actions
          </button>
          <div>
            <button
              @click="goToAddProductPage"
              class="bg-black text-white px-2 md:px-3 py-1.5 rounded-md lg:ml-4"
            >
              Add New Product
            </button>
          </div>
        </div>
      </div>

      <FilterBar @changeTab="setTab" />

      <!-- Responsive Product Cards for Small and Medium Screens -->
      <div class="lg:hidden bg-white shadow-md rounded-lg p-4">
        <template v-for="product in products" :key="product.id">
          <template v-for="variant in product.variants" :key="variant.id">
            <div
              class="border border-gray-200 rounded-lg p-4 mb-4 hover:shadow-md transition-shadow"
            >
              <div class="flex gap-2 items-center">
                <img
                  v-if="product.image"
                  :src="product.image.src"
                  :alt="product.title"
                  class="product-image w-16 h-16 bg-white rounded-md border aspect-square"
                />
                <div class="flex-1">
                  <NuxtLink
                    :to="`/product/edit/${product.id}`"
                    class="text-blue-600 hover:underline"
                  >
                    <h3 class="font-semibold text-lg">{{ product.title }}</h3>
                  </NuxtLink>
                  <span
                    :class="
                      product.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    "
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full mt-1"
                  >
                    {{ product.status }}
                  </span>
                </div>
              </div>
              <div class="mt-2">
                <div class="font-semibold">
                  Inventory: {{ variant.inventory_quantity }}
                </div>
                <nuxt-link
                  :to="`/inventory/${product.id}`"
                  class="bg-black text-white font-semibold p-2 rounded-lg mt-2 inline-block"
                >
                  View
                </nuxt-link>
              </div>
            </div>
          </template>
        </template>
      </div>

      <!-- Responsive Table for Large Screens -->
      <div
        class="hidden lg:block overflow-x-auto bg-white shadow-md rounded-lg"
      >
        <table class="min-w-full table-auto divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product Image
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product Title
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Inventory
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                CTA
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-for="product in products" :key="product.id">
              <template v-for="variant in product.variants" :key="variant.id">
                <tr class="hover:bg-gray-100">
                  <td
                    class="px-4 py-4 whitespace-nowrap flex gap-2 items-center"
                  >
                    <img
                      v-if="product.image"
                      :src="product.image.src"
                      :alt="product.title"
                      class="product-image w-14 bg-white rounded-md border aspect-square"
                    />
                    <p
                      class="text-xs p-1 rounded-full bg-gray-100"
                      v-if="variant.sku"
                    >
                      {{ variant.sku }}
                    </p>
                  </td>
                  <td
                    class="px-4 py-4 break-words whitespace-normal relative group cursor-pointer text-blue-600 hover:underline"
                  >
                    <NuxtLink :to="`/product/edit/${product.id}`">
                      {{ product.title }}</NuxtLink
                    >
                  </td>

                  <td class="px-4 py-4 break-words whitespace-normal">
                    <span
                      :class="
                        product.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      "
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    >
                      {{ product.status }}
                    </span>
                  </td>
                  <td class="px-4 py-4 break-words whitespace-normal">
                    <div class="font-semibold">
                      {{ variant.inventory_quantity }}
                    </div>
                  </td>
                  <td class="px-4 py-4 break-words whitespace-normal">
                    <nuxt-link
                      :to="`/inventory/${product.id}`"
                      class="bg-black text-white font-semibold p-2 rounded-lg"
                      >View</nuxt-link
                    >
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: null,
      error: null,
    };
  },
  async mounted() {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    if (!true) {
      // Redirect to login page if not authenticated
      this.$router.push("/login");
    } else {
      await this.fetchProducts();
    }
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        if (response.ok) {
          this.products = data.products;
        } else {
          this.error = data.error || "Failed to fetch products";
        }
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
