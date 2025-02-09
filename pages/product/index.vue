<template>
  <div class="mb-4 flex items-center justify-between">
    <h1 class="text-xl font-semibold md:text-2xl">Products</h1>
    <div class="flex flex-wrap items-center gap-x-2">
      <Search id="product-search" placeholder="Searching all products" />
      <ExportButton
        title="Export Products"
        class="rounded-md bg-gray-200 px-6 py-2 hover:bg-gray-300"
        api="/api/products/export"
        totalApi="/api/products/count"
        file-name="mediu-products.csv"
        :parser="exportProductParser"
      >
        Export Products
      </ExportButton>
      <div>
        <nuxt-link
          class="flex items-center gap-2 rounded-md bg-black px-2 py-1.5 text-white hover:bg-black/70 md:px-3 lg:ml-4"
          to="/product/add"
        >
          <span class="hidden md:block">Add New Product</span>
          <span class=""><PlusCircle /></span>
        </nuxt-link>
      </div>
    </div>
  </div>

  <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:hidden">
    <div
      v-for="(product, index) in products"
      :key="product.id"
      class="space-y-2 rounded-lg bg-white p-4 shadow-md"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img
            v-if="product.featuredImage"
            :src="product.featuredImage.url"
            :alt="product.featuredImage.altText || product.title"
            class="mr-4 h-16 w-16 rounded"
          />
          <div>
            <nuxt-link
              class="text-lg font-semibold"
              :to="`/product/p/${product.id}`"
            >
              {{ product.title }}
            </nuxt-link>
            <p class="text-sm text-gray-500">{{ product.status }}</p>
          </div>
        </div>
      </div>
      <div class="space-y-1 text-sm text-gray-700">
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
  <PaginationButtons :pageInfo="pageInfo" />
</template>

<script setup lang="ts">
import { PlusCircle } from "lucide-vue-next";
import axios from "axios";
import exportProductParser from "~/utils/parsers/product";

const route = computed(() => useRoute());

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
      }`,
    );
    products.value = data.products;
    pageInfo.value = data.pageInfo;
  } catch (e: any) {
    alert(e.message);
  }
};

watch(
  () => route.value.query,
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
  },
);

useHead({
  title: "All Products",
});
</script>

<style lang="scss" scoped></style>
