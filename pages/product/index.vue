<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-xl md:text-2xl font-semibold">Products</h1>
    <div class="flex flex-wrap gap-x-2">
      <ProductSearch />
      <div>
        <nuxt-link
          class="flex items-center gap-2 hover:bg-black/70 bg-black text-white px-2 md:px-3 py-1.5 rounded-md lg:ml-4"
          to="/product/add"
        >
          <span class="md:block hidden">Add New Product</span>
          <span class=""><PlusCircle /></span>
        </nuxt-link>
      </div>
    </div>
  </div>

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

  <div class="hidden lg:block">
    <ProductViewTable :products="products" />
  </div>
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
</template>

<script setup lang="ts">
import { PlusCircle } from "lucide-vue-next";
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
