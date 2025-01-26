<template>
  <button
    @click="cancelOrder"
    :disabled="isSubmitting"
    class="flex w-full items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 disabled:animate-pulse disabled:cursor-not-allowed md:text-base"
  >
    {{ isSubmitting ? "Cancelling..." : "Cancel Order" }}
  </button>
</template>

<script setup lang="ts">
import axios from "axios";
const props = defineProps<{
  id: string;
}>();

const emit = defineEmits<{
  (event: "orderCancelled"): void;
}>();

const isSubmitting = ref(false);

const cancelOrder = async () => {
  isSubmitting.value = true;
  try {
    const { data } = await axios.post(`/api/orders/${props.id}/cancel`);
    emit("orderCancelled");
    alert("Order cancelled successfully");
  } catch (error) {
    alert(
      error.message || error.response?.data?.message || "Something went wrong",
    );
  } finally {
    isSubmitting.value = false;
  }
};
</script>
