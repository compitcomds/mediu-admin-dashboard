<template>
  <div v-if="!product" class="flex flex-col items-center justify-center gap-3">
    <h1 class="text-center text-3xl font-bold">NOT FOUND</h1>
    <nuxt-link to="/product" class="underline hover:no-underline"
      >All Products</nuxt-link
    >
  </div>

  <div v-else>
    <h1 class="mb-4 text-3xl font-bold">View Product #{{ productId }}</h1>

    <ProductInventoryAlert :product-id="productId" />

    <ProductForm
      :default-values="product"
      :product-id="Array.isArray(productId) ? productId[0] : productId"
      :handle="fetchedProduct?.product.handle"
      :disabled-form="true"
    />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

const route = useRoute();

const prod = route.params.id;
const productId = Array.isArray(prod) ? prod[0] : prod;

let fetchedProduct: any = null;
let product: any = null;

try {
  const { data } = await axios.get(`/api/product/${productId}`);
  fetchedProduct = data;
  console.log(data);
  product = {
    title: data.product.title,
    description: data.product.body_html,
    tags: data.product.tags !== "" ? data.product.tags.split(",") : [],
    sku: data.product.variants[0].sku,
    price: data.product.variants[0].price,
    compareAtPrice: data.product.variants[0].compare_at_price,
    quantity: data.product.variants[0].inventory_quantity,
    images: data.product.images,
    ...data.metafields,
    collections: data.collections.map((collection: any) => collection.handle),
    hsnCode: data.hsnCode,
    status: data.product.status,
    options: data.product.options.map((option: any) => ({
      name: option.name,
      values: option.values.map((value: any) => ({ name: value })),
    })),
    variants: data.product.variants.map((variant: any) => ({
      price: variant.price,
      compareAtPrice: variant.compare_at_price,
      sku: variant.sku,
      optionValues: data.product.options.map((option: any, index: number) => ({
        name: variant[`option${index + 1}`],
        optionName: option.name,
      })),
    })),
  };
} catch (error: any) {
  alert(error.message);
}

useHead({
  title: `Product | ${product.title}`,
});
</script>
