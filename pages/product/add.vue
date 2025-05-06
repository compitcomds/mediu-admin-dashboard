<template>
  <h1 class="mb-4 text-3xl font-bold">Add New Product</h1>
  <ProductForm :on-submit="addProduct" />
</template>

<script setup lang="ts">
import axios from "axios";
import { toast } from "vue-sonner";

const router = useRouter();

const addProduct = async (values: any) => {
  const { data } = await axios.post("/api/product/add", values);

  if (data.errors?.length > 0) {
    data.errors.forEach((e: string) => {
      toast.error(e, { richColors: true });
    });
  }

  if (data.product?.id) {
    toast.success(
      "Successfully created the product. Redirecting you to product...",
      { richColors: true },
    );
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
