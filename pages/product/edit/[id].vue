<template>
  <AttachSidebar>
    <div
      v-if="!product"
      class="flex items-center justify-center flex-col gap-3"
    >
      <h1 class="text-3xl font-bold text-center">NOT FOUND</h1>
      <nuxt-link to="/product" class="underline hover:no-underline"
        >All Products</nuxt-link
      >
    </div>

    <div v-else>
      <h1 class="text-3xl font-bold mb-4">Edit Product #{{ productId }}</h1>

      <ProductForm
        :default-values="product"
        :product-id="Array.isArray(productId) ? productId[0] : productId"
        :onSubmit="updateProduct"
        :handle="fetchedProduct?.product.handle"
      />
    </div>
  </AttachSidebar>
</template>

<script setup lang="ts">
import axios from "axios";

const router = useRouter();
const route = useRoute();

const productId = route.params.id;

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

  console.log(data);
} catch (error: any) {
  alert(error.message);
}

const updateProduct = async (values: any) => {
  await axios.post(
    "/api/products/edit-images",
    {
      productId,
      addedImages: values.addedImages,
      removedImages: values.removedImages.map((image: any) => image.id),
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  // remove already used information. (just maybe optimisation happens...)
  delete values["collects"];
  delete values["addedImages"];
  delete values["removedImages"];

  const { data } = await axios.put(`/api/product/${productId}`, values, {
    headers: { "Content-Type": "application/json" },
  });

  if (data.errors) {
    data.errors.forEach((e: string) => {
      alert(e);
    });
  }

  alert("Successfully updated the product.");
};
</script>
