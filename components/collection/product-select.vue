<template>
  <div class="flex gap-3 items-center justify-between mb-3">
    <h2 class="block text-sm font-semibold text-gray-800 mb-2">
      Select Products
    </h2>
    <div class="flex gap-2 items-center">
      <ProductSearch path-to-redirect="/collections/create" />
    </div>
  </div>
  <div class="space-y-2">
    <div
      v-for="product in products"
      :key="product.id"
      class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 ease-in-out"
    >
      <input
        type="checkbox"
        :value="{ product_id: product.id }"
        v-model="model"
        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span class="ml-3 text-gray-700">{{ product.title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

const products = ref<any[]>([]);
const model = defineModel<any[]>("products");
const route = useRoute();

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
    // pageInfo.value = data.pageInfo;
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
