<template>
  <AttachSidebar>
    <!-- Header Buttons -->
    <div
      class="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0"
    >
      <h1 class="text-xl md:text-2xl font-semibold">Products</h1>
      <div class="flex flex-wrap space-x-2">
        <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">Export</button>
        <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">Import</button>
        <button class="bg-gray-200 px-2 md:px-3 py-1 rounded-md">
          More actions
        </button>
        <div>
          <nuxt-link
            class="block bg-black text-white px-2 md:px-3 py-1.5 rounded-md lg:ml-4"
            to="/product/add"
          >
            Add New Product
          </nuxt-link>
        </div>
      </div>
    </div>

    <FilterBar />

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
              v-if="product.featuredImage"
              :src="product.featuredImage.url"
              :alt="product.featuredImage.altText || product.title"
              class="w-16 h-16 mr-4 rounded"
            />
            <div>
              <nuxt-link
                class="text-lg font-semibold"
                :to="`/product/edit/${product.id}`"
              >
                {{ product.title }}
              </nuxt-link>
              <p class="text-sm text-gray-500">{{ product.status }}</p>
            </div>
          </div>
        </div>
        <div class="text-sm text-gray-700 space-y-1">
          <p>
            <strong>Inventory:</strong>
            {{ product.totalInventory }}
          </p>

          <p><strong>Type:</strong> {{ product.product_type }}</p>
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
                v-if="product.featuredImage"
                :src="product.featuredImage.url"
                :alt="product.featuredImage.altText || product.title"
                class="product-image w-36"
              />
            </td>
            <td>
              <nuxt-link
                :to="`/product/edit/${product.id}`"
                class="px-4 py-4 break-words whitespace-normal relative group cursor-pointer text-blue-600 hover:underline"
                >{{ product.title }}</nuxt-link
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
              {{ product.totalInventory }}
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

      <div class="flex items-center gap-5 my-5 justify-center">
        <nuxt-link
          v-if="pageInfo.hasPreviousPage"
          :to="{
            path: '/product',
            query: {
              ...route.query,
              before: pageInfo.startCursor || '',
              after: undefined,
            },
          }"
          class="py-3 px-8 rounded-lg hover:bg-gray-200"
          >Previous</nuxt-link
        >
        <button
          v-else
          class="py-3 px-8 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
          disabled
        >
          Previous
        </button>
        <nuxt-link
          class="py-3 px-8 rounded-lg hover:bg-gray-200"
          v-if="pageInfo.hasNextPage"
          :to="{
            path: '/product',
            query: {
              ...route.query,
              before: undefined,
              after: pageInfo.endCursor || '',
            },
          }"
          >Next</nuxt-link
        >
        <button
          v-else
          class="py-3 px-8 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
          disabled
        >
          Next
        </button>
      </div>
    </div>
  </AttachSidebar>
</template>

<script setup lang="ts">
import axios from "axios";

const route = useRoute();

const products = ref<any[]>([]);
const pageInfo = ref<{
  endCursor: string;
  hasNextPage: boolean;
  startCursor: string;
  hasPreviousPage: boolean;
}>({
  endCursor: "",
  startCursor: "",
  hasNextPage: false,
  hasPreviousPage: false,
});

const fetchProducts = async ({
  after,
  before,
}: {
  after?: string;
  before?: string;
}) => {
  try {
    const { data } = await axios.get(
      `/api/products?after=${after || ""}&before=${before || ""}`
    );
    console.log(data);
    products.value = data.products;
    pageInfo.value = data.pageInfo;
  } catch (e: any) {
    alert(e.message);
  }
};

watch(
  () => route.query,
  (newQuery) => {
    fetchProducts({
      after: newQuery.after?.toString(),
      before: newQuery.before?.toString(),
    });
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style lang="scss" scoped></style>
