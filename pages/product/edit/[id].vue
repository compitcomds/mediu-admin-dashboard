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
      <ProductForm
        :default-values="product"
        :product-id="Array.isArray(productId) ? productId[0] : productId"
        :onSubmit="updateProduct"
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
    collections: data.collections,
    hsnCode: data.hsnCode,
  };

  console.log(data);
} catch (error: any) {
  alert(error.message);
}

const updateProduct = async (values: any) => {
  await axios.post(
    "/api/collections/edit",
    {
      collections: values.collections,
      collects: fetchedProduct.collects,
      productId,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

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
  delete values["collections"];
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
