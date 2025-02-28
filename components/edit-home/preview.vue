<script setup lang="ts">
import { type Product, type Subcategory } from "./types";
const props = defineProps<{
  selectedProducts: Product[];
  toggleProduct: (productId: string) => void;
  selectedSection: string;
  selectedSubcategory: Subcategory;
}>();
</script>

<template>
  <div class="overflow-hidden rounded-lg bg-white">
    <div class="border-b bg-gray-50 p-4">
      <h2 class="text-lg font-semibold">
        Selected Products for {{ props.selectedSection }} -
        {{ props.selectedSubcategory.name }}
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
        <template v-for="product in props.selectedProducts" :key="product.id">
          <div
            v-if="product.tags.includes(selectedSubcategory.tag)"
            class="overflow-hidden rounded-md border"
          >
            <div class="relative">
              <button
                @click="props.toggleProduct(product.id)"
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
                {{ product.title }}
              </h3>
              <p class="mt-1 text-xs text-gray-500">
                Rs. {{ product.price.toFixed(2) }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
