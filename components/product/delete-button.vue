<template>
  <button
    type="button"
    :disabled="isDeleting"
    class="w-full rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
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
import { toast } from "vue-sonner";

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

    toast.success(
      "Product deleted successfully! Redirecting to products page...",
      { richColors: true },
    );
    router.push("/product");
  } catch (err: any) {
    toast.error(
      err.message ||
        "Unable to delete the product at the time. Please try again later.",
      { richColors: true },
    );
  } finally {
    isDeleting.value = false;
  }
};
</script>
