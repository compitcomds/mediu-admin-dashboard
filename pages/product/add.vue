<template>
  <h1 class="mb-4 text-3xl font-bold">Add New Product</h1>
  <ProductForm :on-submit="addProduct" />
</template>

<script setup lang="ts">
import axios from "axios";

const router = useRouter();

const addProduct = async (values: any) => {
  const { data } = await axios.post("/api/product/add", values);

  if (data.errors?.length > 0) {
    data.errors.forEach((e: string) => {
      alert(e);
    });
  }

  if (data.product?.id) {
    alert("Successfully created the product. Redirecting you to product...");
    await router.replace(`/product/p/${data.product.id}`);
    return;
  }
  throw new Error(
    data.error ||
      "Unable to create the product at the time. Please try again later.",
  );
};

useHead({
  title: "Add Product",
});
</script>
