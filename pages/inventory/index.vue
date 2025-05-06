<template>
  <!-- Header Buttons -->
  <div class="mb-4 flex items-center justify-between lg:mt-10">
    <h1 class="mb-4 text-3xl font-bold">Inventory Products</h1>
    <div class="flex items-center justify-center gap-2">
      <ProductSearch path-to-redirect="/inventory" />
    </div>
  </div>

  <div class="rounded-lg p-4 lg:hidden">
    <template v-for="product in products" :key="product.id">
      <template
        v-for="variant in product.variants"
        :key="variant.legacyResourceId"
      >
        <div
          class="mb-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
        >
          <div class="flex items-center gap-2">
            <img
              v-if="product.featuredImage"
              :src="product.featuredImage.url"
              :alt="product.title"
              class="product-image aspect-square h-16 w-16 rounded-md border bg-white"
            />
            <div class="flex-1">
              <NuxtLink
                :to="`/inventory/${variant.legacyResourceId}`"
                class="text-blue-600 hover:underline"
              >
                <h3 class="text-lg font-semibold">{{ product.title }}</h3>
              </NuxtLink>
              <span
                :class="
                  product.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                "
                class="mt-1 inline-flex rounded-full px-2 text-xs font-semibold leading-5"
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
              class="mt-2 inline-block rounded-lg bg-black p-2 font-semibold text-white"
            >
              View
            </nuxt-link>
          </div>
        </div>
      </template>
    </template>
  </div>

  <div class="hidden overflow-x-auto lg:block">
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
                    class="product-image aspect-square rounded-md border bg-white" /></nuxt-link
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
                  class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                >
                  {{ product.status }}
                </span></TableCell
              >
              <TableCell>{{ variant.inventoryQuantity }}</TableCell>
              <TableCell
                ><nuxt-link
                  :to="`/inventory/${variant.legacyResourceId}`"
                  class="mt-2 inline-block rounded-lg bg-black p-2 font-semibold text-white"
                >
                  View
                </nuxt-link></TableCell
              >
            </TableRow>
          </template>
        </template>
      </TableBody>
    </Table>

    <div class="my-5 flex items-center justify-center gap-5">
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
        class="rounded-lg px-8 py-3 hover:bg-gray-200"
        >Previous</nuxt-link
      >
      <button
        v-else
        class="rounded-lg px-8 py-3 disabled:cursor-not-allowed disabled:opacity-60"
        disabled
      >
        Previous
      </button>
      <nuxt-link
        class="rounded-lg px-8 py-3 hover:bg-gray-200"
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
        class="rounded-lg px-8 py-3 disabled:cursor-not-allowed disabled:opacity-60"
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
import { toast } from "vue-sonner";

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
      }`,
    );
    products.value = data.products;
    pageInfo.value = data.pageInfo;
  } catch (e: any) {
    toast.error(e.message, { richColors: true });
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
  },
);

useHead({
  title: "Inventory Products",
});
</script>

<style lang="scss" scoped></style>
