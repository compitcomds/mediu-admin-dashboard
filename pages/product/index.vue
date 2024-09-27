<template>
  <div class="flex flex-col h-screen py-10 lg:py-0">
    <!-- Sidebar -->
    <Sidenav />
    <div class="lg:ml-64 flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 mt-4 bg-gray-100">
      <NavigationButton />

      <!-- Header Buttons -->
      <div
        class="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0"
      >
        <h1 class="text-xl md:text-2xl font-semibold">Products</h1>
        <div class="flex flex-wrap space-x-2">
          <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">Export</button>
          <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">Import</button>
          <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">More actions</button>
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
      <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:hidden">
        <div
          v-for="(product, index) in products"
          :key="product.id"
          class="bg-white p-4 rounded-lg shadow-md space-y-2"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img
                :src="product.image"
                alt="Product Image"
                class="w-16 h-16 mr-4 rounded"
              />
              <div>
                <p class="text-lg font-semibold">{{ product.name }}</p>
                <p class="text-sm text-gray-500">{{ product.status }}</p>
              </div>
            </div>
          </div>
          <div class="text-sm text-gray-700 space-y-1">
            <p><strong>Inventory:</strong> {{ product.inventory }}</p>
            <p><strong>Total Products:</strong> {{ product.totalProducts }}</p>
            <p><strong>Category:</strong> {{ product.category }}</p>
            <p><strong>Type:</strong> {{ product.type }}</p>
            <p><strong>Vendor:</strong> {{ product.vendor }}</p>
          </div>
        </div>
      </div>

      <!-- Responsive Table for Large Screens -->
      <div class="hidden lg:block overflow-x-auto bg-white shadow-md rounded-lg">
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
                Total Products
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Vendor
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(product, index) in products"
              :key="product.id"
              class="hover:bg-gray-100"
            >
              <td class="px-4 py-4 whitespace-nowrap">
                <img
                  v-if="product.image"
                  :src="product.image.src"
                  :alt="product.title"
                  class="product-image"
                />
              </td>
              <td class="px-4 py-4 break-words whitespace-normal relative group">
                {{ product.title }}
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
                {{ product.inventory }}
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                {{ product.variants[0].inventory_quantity }}
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                {{ product.category }}
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                {{ product.product_type }}
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                {{ product.vendor }}
              </td>
            </tr>
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
    goToAddProductPage() {
      this.$router.push("/product/addProduct"); // Ensure this route exists in your router
    },
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
