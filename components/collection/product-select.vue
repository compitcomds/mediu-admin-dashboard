<template>
  <div class="mb-2 flex items-center justify-between gap-3">
    <h2 class="block text-sm font-semibold text-gray-800">Select Products</h2>
    <div v-if="!hideAllProductsList" class="flex items-center gap-2">
      <Search />
    </div>
  </div>
  <div class="mb-8">
    <CollectionSelectedProducts
      v-model:products="model"
      :hide-all-products-list="props.hideAllProductsList"
      :disabled-form="!!props.disabledForm"
    />
  </div>
  <div v-if="!props.hideAllProductsList" class="flex flex-col gap-y-2">
    <div>
      <p class="text-xs">List of all products</p>
    </div>
    <template v-for="product in products" :key="product.id">
      <div
        v-if="
          !props.isCollectionBrand ||
          !checkIfBrandedProduct(product.collections)
        "
        class="flex items-center rounded-lg border border-gray-200 p-3 transition duration-150 ease-in-out hover:bg-gray-50"
      >
        <input
          type="checkbox"
          :value="{ product_id: product.id, title: product.title }"
          v-model="model"
          class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
          :disabled="!!props.disabledForm"
        />
        <span class="ml-3 text-gray-700">{{ product.title }}</span>
      </div>
    </template>
    <div class="my-5 flex items-center justify-center gap-5">
      <nuxt-link
        v-if="pageInfo.hasPreviousPage"
        :to="{
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
import axios from "axios";

const props = defineProps<{
  hideAllProductsList?: boolean;
  isCollectionBrand?: boolean;
  disabledForm?: boolean;
}>();
const products = ref<any[]>([]);
const model = defineModel<any[]>("products");
const brands = ref<string[]>([]);
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
      `/api/collections/products?after=${after || ""}&before=${
        before || ""
      }&query=${query || ""}`,
    );
    console.log(data);
    products.value = data.products;
    pageInfo.value = data.pageInfo;
  } catch (e: any) {
    alert(e.message);
  }
};

const fetchAllCollectionBrands = async () => {
  try {
    const { data } = await axios.get("/api/collections/all/brands");
    brands.value = data.collections;
  } catch (e: any) {
    alert(e.message);
  }
};

onMounted(() => {
  fetchAllCollectionBrands();
});

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

function checkIfBrandedProduct(productCollections: any[]) {
  const set2 = new Set(productCollections);
  for (let element of brands.value) {
    if (set2.has(element)) return true;
  }
  return false;
}
</script>
