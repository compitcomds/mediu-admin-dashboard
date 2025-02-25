<template>
  <div class="container mx-auto flex items-center justify-between px-4 py-4">
    <h1 class="text-xl font-bold">Product Section Manager</h1>
    <div class="flex items-center gap-x-4">
      <button
        class="rounded-md bg-[#238878] px-4 py-2 font-medium text-white transition hover:bg-gray-100"
      >
        Save Changes
      </button>
    </div>
  </div>

  <main class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <label class="mb-2 block font-medium text-gray-700">Select Section</label>
      <div class="mb-4 flex flex-wrap gap-3">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="selectedSection = section"
          class="rounded-md px-4 py-2"
          :class="
            selectedSection.id === section.id
              ? 'bg-[#238878] text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          "
        >
          {{ section.name }}
        </button>
      </div>
    </div>

    <!-- Subcategory Tabs -->
    <div class="mb-6">
      <div class="border-b border-gray-200">
        <ul class="-mb-px flex flex-wrap">
          <li
            v-for="subcategory in selectedSection.subcategories"
            :key="subcategory.id"
            class="mr-2"
          >
            <button
              @click="selectedSubcategory = subcategory"
              class="inline-block border-b-2 px-4 py-2 text-sm font-medium"
              :class="
                selectedSubcategory.id === subcategory.id
                  ? 'border-[#238878] text-[#238878]'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              "
            >
              {{ subcategory.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Product Selection -->
    <div class="mb-8 overflow-hidden rounded-lg bg-white">
      <div class="flex items-center justify-between border-b bg-gray-50 p-4">
        <h2 class="text-lg font-semibold">
          {{ selectedSection.name }} - {{ selectedSubcategory.name }}
        </h2>
        <div class="flex items-center">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search products..."
            class="mr-2 rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#238878]"
          />
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
                SKU
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
              v-for="product in filteredProducts"
              :key="product.id"
              class="hover:bg-gray-50"
            >
              <td
                class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
              >
                {{ product.name }}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <div class="text-sm text-gray-500">{{ product.sku }}</div>
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <div class="text-sm text-gray-900">
                  Rs.{{ product.price.toFixed(2) }}
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
      </div>
    </div>

    <!-- Selected Products Preview -->
    <div class="overflow-hidden rounded-lg bg-white">
      <div class="border-b bg-gray-50 p-4">
        <h2 class="text-lg font-semibold">
          Selected Products for {{ selectedSection.name }} -
          {{ selectedSubcategory.name }}
        </h2>
      </div>
      <div class="p-4">
        <div
          v-if="selectedProducts.length === 0"
          class="py-8 text-center text-gray-500"
        >
          No products selected for this section.
        </div>
        <div
          v-else
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <div
            v-for="product in selectedProducts"
            :key="product.id"
            class="overflow-hidden rounded-md border"
          >
            <div class="relative">
              <button
                @click="toggleProduct(product.id)"
                class="absolute right-2 top-2 rounded-full bg-white p-1 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">remove product</span>
              </button>
            </div>
            <div class="p-3">
              <h3 class="text-sm font-medium">
                {{ product.name }}
              </h3>
              <p class="mt-1 text-xs text-gray-500">
                Rs.{{ product.price.toFixed(2) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  tags: string[];
}

interface Subcategory {
  id: number;
  name: string;
  tag: string;
}

interface Section {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

const selectedProducts = ref<Product[]>([]);

// Dummy data
const products = ref<Product[]>([
  {
    id: "1",
    name: "Moisture Boost Shampoo",
    sku: "HAIR-001",
    price: 12.99,
    tags: ["featured-product-hair", "hair-care-shampoo"],
  },
  {
    id: "2",
    name: "Hydrating Face Cream",
    sku: "SKIN-001",
    price: 24.99,
    tags: ["featured-product-skin", "radiant-skin-moisturizer"],
  },
  {
    id: "3",
    name: "Baby Care Lotion",
    sku: "BABY-001",
    price: 9.99,
    tags: ["featured-product-baby", "baby-care-essentials"],
  },
  {
    id: "4",
    name: "Argan Oil Hair Serum",
    sku: "HAIR-002",
    price: 19.99,
    tags: ["hair-care-treatment"],
  },
  {
    id: "5",
    name: "SPF 50 Sunscreen",
    sku: "SKIN-002",
    price: 15.99,
    tags: ["radiant-skin-sunscreen"],
  },
  {
    id: "6",
    name: "Baby Shampoo",
    sku: "BABY-002",
    price: 8.99,
    tags: ["baby-care-bath"],
  },
  {
    id: "7",
    name: "Repairing Conditioner",
    sku: "HAIR-003",
    price: 14.99,
    tags: ["hair-care-conditioner", "featured-product-hair"],
  },
  {
    id: "8",
    name: "Anti-Aging Serum",
    sku: "SKIN-003",
    price: 29.99,
    tags: ["radiant-skin-anti-aging", "featured-product-skin"],
  },
  {
    id: "9",
    name: "Baby Diaper Cream",
    sku: "BABY-003",
    price: 7.99,
    tags: ["baby-care-essentials"],
  },
  {
    id: "10",
    name: "Hair Styling Mousse",
    sku: "HAIR-004",
    price: 11.99,
    tags: ["hair-care-styling"],
  },
]);

const sections = ref<Section[]>([
  {
    id: 1,
    name: "Featured Products",
    subcategories: [
      { id: 1, name: "Hair", tag: "featured-product-hair" },
      { id: 2, name: "Skin", tag: "featured-product-skin" },
      { id: 3, name: "Baby Care", tag: "featured-product-baby" },
    ],
  },
  {
    id: 2,
    name: "Radiant Skin Secrets",
    subcategories: [
      { id: 4, name: "Moisturizers", tag: "radiant-skin-moisturizer" },
      { id: 5, name: "Sunscreen", tag: "radiant-skin-sunscreen" },
      { id: 6, name: "Anti-Aging", tag: "radiant-skin-anti-aging" },
    ],
  },
  {
    id: 3,
    name: "Hair Care Must Haves",
    subcategories: [
      { id: 7, name: "Shampoo", tag: "hair-care-shampoo" },
      { id: 8, name: "Conditioner", tag: "hair-care-conditioner" },
      { id: 9, name: "Treatments", tag: "hair-care-treatment" },
      { id: 10, name: "Styling", tag: "hair-care-styling" },
    ],
  },
  {
    id: 4,
    name: "Baby Care Essentials",
    subcategories: [
      { id: 11, name: "Bath", tag: "baby-care-bath" },
      { id: 12, name: "Essentials", tag: "baby-care-essentials" },
    ],
  },
]);

// State
const selectedSection = ref<Section>(sections.value[0]);
const selectedSubcategory = ref<Subcategory>(
  sections.value[0].subcategories[0],
);
const searchQuery = ref("");

// Watch for section changes to update selected subcategory
watch(selectedSection, (newSection) => {
  selectedSubcategory.value = newSection.subcategories[0];
});

// Computed properties
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesSearch;
  });
});

// Methods
const isProductSelected = (productId: string): boolean => {
  const product = getProductById(productId);
  if (!product) return false;
  return product.tags.includes(selectedSubcategory.value.tag);
};

const toggleProduct = (productId: string, ogProduct?: Product) => {
  const productAlreadyExists = getProductById(productId);
  const product = productAlreadyExists || ogProduct;
  const tag = selectedSubcategory.value.tag;

  if (!product) return;

  if (product.tags.includes(tag)) {
    product.tags = product.tags.filter((t) => t !== tag);
  } else {
    product.tags.push(tag);
  }

  if (!productAlreadyExists) selectedProducts.value.push(product);

  if (product.tags.length < 1)
    selectedProducts.value = selectedProducts.value.filter(
      (prod) => prod.id === productId,
    );
};

const getProductById = (id: string) => {
  return selectedProducts.value.find((p) => p.id === id);
};
</script>
