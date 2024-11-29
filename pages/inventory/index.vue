<template>
  <!-- Header Buttons -->
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-xl md:text-2xl font-semibold">Products</h1>
    <div class="flex justify-center items-center gap-2">
      <ProductSearch path-to-redirect="/inventory" />
    </div>
  </div>

  <!-- Responsive Product Cards for Small and Medium Screens -->
  <div class="lg:hidden rounded-lg p-4">
    <template v-for="product in products" :key="product.id">
      <template
        v-for="variant in product.variants"
        :key="variant.legacyResourceId"
      >
        <div
          class="border border-gray-200 bg-white rounded-lg p-4 mb-4 hover:shadow-md transition-shadow"
        >
          <div class="flex gap-2 items-center">
            <img
              v-if="product.featuredImage"
              :src="product.featuredImage.url"
              :alt="product.title"
              class="product-image w-16 h-16 bg-white rounded-md border aspect-square"
            />
            <div class="flex-1">
              <NuxtLink
                :to="`/inventory/${variant.legacyResourceId}`"
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
              Inventory: {{ variant.inventoryQuantity }}
            </div>
            <nuxt-link
              :to="`/inventory/${variant.legacyResourceId}`"
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
            CTA
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <template v-for="product in products" :key="product.id">
          <template v-for="variant in product.variants" :key="variant.id">
            <tr class="hover:bg-gray-100">
              <td class="px-4 py-4 whitespace-nowrap flex gap-2 items-center">
                <img
                  v-if="product.featuredImage"
                  :src="product.featuredImage.url"
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
                <NuxtLink :to="`/inventory/${variant.legacyResourceId}`">
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
                  {{ variant.inventoryQuantity }}
                </div>
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                <nuxt-link
                  :to="`/inventory/${variant.legacyResourceId}`"
                  class="bg-black text-white font-semibold p-2 rounded-lg mt-2 inline-block"
                >
                  View
                </nuxt-link>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>

    <div class="flex items-center gap-5 my-5 justify-center">
      <nuxt-link
        v-if="pageInfo.hasPreviousPage"
        :to="{
          path: '/inventory',
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
          path: '/inventory',
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
</template>

<script setup lang="ts">
import axios from "axios";

const route = useRoute();
const products = ref<any[]>([]);
const error = ref<any>(null);
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
  query,
}: {
  after?: string;
  before?: string;
  query?: string;
}) => {
  try {
    const { data } = await axios.get(
      `/api/products?after=${after || ""}&before=${before || ""}&query=${
        query || ""
      }`
    );
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
      query: newQuery.query?.toString(),
    });
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style lang="scss" scoped></style>
