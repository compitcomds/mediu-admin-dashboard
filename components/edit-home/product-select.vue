<script setup lang="ts">
import axios from "axios";
import {
  type Section,
  type Subcategory,
  type Product,
} from "~/components/edit-home/types";

const props = defineProps<{
  selectedSubcategory: Subcategory;
  selectedSection: Section;
}>();

const route = computed(() => useRoute());
const products = ref<Product[]>([]);
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

const selectedProducts = defineModel<Record<string, Product>>({
  required: true,
});

// Methods
const isProductSelected = (productId: string): boolean => {
  const product = getProductById(productId);
  if (!product) return false;
  return product.tags.includes(props.selectedSubcategory.tag);
};

const toggleProduct = (productId: string, ogProduct?: Product) => {
  const productAlreadyExists = getProductById(productId);
  const product = productAlreadyExists || ogProduct;
  const tag = props.selectedSubcategory.tag;

  if (!product) return;

  if (product.tags.includes(tag)) {
    product.tags = product.tags.filter((t: any) => t !== tag);
  } else {
    product.tags.push(tag);
  }

  selectedProducts.value[product.id] = product;
};

const getProductById = (id: string) => {
  return selectedProducts.value[id] || null;
};

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
      `/api/products/home?limit=20&after=${after || ""}&before=${before || ""}&query=${
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
</script>

<template>
  <div class="mb-8 overflow-hidden rounded-lg bg-white">
    <div class="flex items-center justify-between border-b bg-gray-50 p-4">
      <h2 class="text-lg font-semibold">
        {{ selectedSection.name }} - {{ selectedSubcategory.name }}
      </h2>
      <div class="flex items-center">
        <Search />
      </div>
    </div>

    <!-- Products Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Product
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Price
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Include
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr
            v-for="product in products"
            :key="product.id"
            class="hover:bg-gray-50"
          >
            <td
              class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
            >
              {{ product.title }}
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              <div class="text-sm text-gray-900">
                Rs. {{ product.price.toFixed(2) }}
              </div>
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
              <div class="flex items-center">
                <label class="inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    :checked="isProductSelected(product.id)"
                    @change="toggleProduct(product.id, product)"
                    class="form-checkbox h-5 w-5 rounded text-[#238878] focus:ring-[#238878]"
                  />
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <PaginationButtons :pageInfo="pageInfo" />
    </div>
  </div>

  <EditHomePreview
    :selected-products="Object.values(selectedProducts).flat()"
    :toggle-product="toggleProduct"
    :selected-section="selectedSection.name"
    :selected-subcategory="selectedSubcategory"
  />
</template>
