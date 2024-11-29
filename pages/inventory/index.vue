<template>
  <!-- Header Buttons -->
  <div class="flex justify-between items-center mb-4 lg:mt-10">
    <h1 class="text-3xl font-bold mb-4">Inventory Products</h1>
    <div class="flex justify-center items-center gap-2">
      <ProductSearch path-to-redirect="/inventory" />
    </div>
  </div>

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

  <div class="hidden lg:block overflow-x-auto">
    <Table>
      <TableCaption>A list of all the inventory.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[130px]">Image</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Inventory</TableHead>
          <TableHead>CTA</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-for="product in products" :key="product.id">
          <template v-for="variant in product.variants" :key="variant.id">
            <TableRow class="hover:bg-white/40">
              <TableCell
                ><nuxt-link :to="`/inventory/${variant.legacyResourceId}`"
                  ><img
                    v-if="product.featuredImage"
                    :src="product.featuredImage.url"
                    :alt="product.title"
                    class="product-image bg-white rounded-md border aspect-square" /></nuxt-link
              ></TableCell>
              <TableCell>
                {{ variant.sku || "No SKU" }}
              </TableCell>
              <TableCell
                ><nuxt-link :to="`/inventory/${variant.legacyResourceId}`">{{
                  product.title
                }}</nuxt-link></TableCell
              >
              <TableCell
                ><span
                  :class="
                    product.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  "
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ product.status }}
                </span></TableCell
              >
              <TableCell>{{ variant.inventoryQuantity }}</TableCell>
              <TableCell
                ><nuxt-link
                  :to="`/inventory/${variant.legacyResourceId}`"
                  class="bg-black text-white font-semibold p-2 rounded-lg mt-2 inline-block"
                >
                  View
                </nuxt-link></TableCell
              >
            </TableRow>
          </template>
        </template>
      </TableBody>
    </Table>

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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
