<template>
  <div class="flex mb-2 gap-3 items-center justify-between">
    <h2 class="block text-sm font-semibold text-gray-800">Select Products</h2>
    <div v-if="!hideAllProductsList" class="flex gap-2 items-center">
      <ProductSearch path-to-redirect="/collections/create" />
    </div>
  </div>
  <div class="mb-8">
    <CollectionSelectedProducts
      v-model:products="model"
      :hide-all-products-list="props.hideAllProductsList"
    />
  </div>
  <div v-if="!props.hideAllProductsList" class="flex flex-col gap-y-2">
    <div>
      <p class="text-xs">List of all products</p>
    </div>
    <template v-for="product in products" :key="product.id">
      <div
        class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 ease-in-out"
      >
        <input
          type="checkbox"
          :value="{ product_id: product.id, title: product.title }"
          v-model="model"
          class="w-4 h-4 text-blue-600 disabled:cursor-not-allowed border-gray-300 rounded focus:ring-blue-500"
        />
        <span class="ml-3 text-gray-700">{{ product.title }}</span>
      </div>
    </template>
    <div class="flex items-center gap-5 my-5 justify-center">
      <nuxt-link
        v-if="pageInfo.hasPreviousPage"
        :to="{
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

const props = defineProps<{
  hideAllProductsList?: boolean;
}>();
const products = ref<any[]>([]);
const model = defineModel<any[]>("products");
const route = useRoute();
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
  if (props.hideAllProductsList) return [];
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
