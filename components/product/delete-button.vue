<template>
  <button
    type="button"
    :disabled="isDeleting"
    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full disabled:cursor-not-allowed disabled:opacity-70"
    @click="deleteProduct"
  >
    <span v-if="isDeleting" class="flex items-center justify-center gap-1"
      >Deleting... <Loader
    /></span>
    <span v-else>Delete Product</span>
  </button>
</template>

<script setup lang="ts">
import axios from "axios";

const { productId } = defineProps<{ productId: string }>();
const router = useRouter();
const isDeleting = ref(false);

const deleteProduct = async () => {
  isDeleting.value = true;
  try {
    await axios.delete(`/api/product/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("Product deleted successfully! Redirecting to products page...");
    router.push("/product");
  } catch (err: any) {
    alert(
      err.message ||
        "Unable to delete the product at the time. Please try again later."
    );
  } finally {
    isDeleting.value = false;
  }
};
</script>
