<template>
  <template v-if="!!variant">
    <Collapsible class="mb-8">
      <CollapsibleTrigger
        class="flex items-center gap-2 text-xs underline hover:no-underline sm:text-sm"
        >View Product Details <ChevronsUpDown :size="16"
      /></CollapsibleTrigger>
      <CollapsibleContent>
        <div
          class="flex gap-4 rounded-lg border border-gray-300 bg-white px-2 py-4 md:px-4 lg:flex-row"
        >
          <div class="">
            <img
              :src="
                variant.featuredImage?.url ||
                `https://placehold.co/400x400?text=${variant.title}`
              "
              :alt="
                variant.featuredImage?.altText || `Image - ${variant.title}`
              "
              class="h-auto w-32 rounded-lg"
            />
          </div>
          <div>
            <h2 class="mb-3">
              <nuxt-link
                :to="`/product/${variant.productId}`"
                target="_blank"
                class="flex items-center gap-2 text-xs font-semibold hover:underline md:text-lg"
              >
                {{ variant.title }}
                <SquareArrowOutUpRight :size="13" />
              </nuxt-link>
            </h2>

            <div
              class="mb-2 flex flex-wrap gap-2 text-xs text-gray-600 md:mb-4 md:gap-4 md:text-sm lg:gap-x-12 lg:gap-y-2"
            >
              <p><strong>Inventory:</strong> {{ variant.inventoryQuantity }}</p>
              <p><strong>Price:</strong> Rs. {{ variant.price }}</p>
              <p><strong>SKU:</strong> {{ variant.sku }}</p>
              <div class="flex flex-wrap gap-2 sm:w-full md:gap-4 lg:gap-12">
                <p v-for="option in variant.selectedOptions" :key="option.name">
                  <strong>{{ option.name }}:</strong> {{ option.value }}
                </p>
                <a
                  :href="productUrl"
                  target="_blank"
                  class="flex cursor-pointer items-center gap-1 underline hover:no-underline"
                  >View Live <SquareArrowOutUpRight :size="10"
                /></a>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </template>
</template>

<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SquareArrowOutUpRight, ChevronsUpDown } from "lucide-vue-next";

const { variant } = defineProps<{ variant: any }>();

const productUrl = computed(() => generateProductUrl());

function generateProductUrl(): string {
  let url = `https://www.mediu.in/shop/product/${variant.productHandle}`;

  if (variant.selectedOptions.length > 0) {
    const queryString = variant.selectedOptions
      .map(
        (option: any) =>
          `${encodeURIComponent(option.name)}=${encodeURIComponent(option.value)}`,
      )
      .join("&");
    url += `?${queryString}`;
  }

  return url;
}
</script>
