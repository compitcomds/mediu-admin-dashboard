<template>
  <Alert
    v-if="variantWithZeroQuantity.length > 0"
    class="mb-4 space-x-2 bg-yellow-50 text-yellow-800"
  >
    <CircleAlert class="h-6 w-6 text-yellow-800" color="#854d0e" />

    <AlertTitle>Inventory Action Needed!</AlertTitle>
    <AlertDescription>
      <div class="flex flex-wrap items-center gap-2">
        <span>The following variants have zero quantity in inventory:</span>
        <nuxt-link
          v-for="variant in variantWithZeroQuantity"
          class="mr-2 inline-flex cursor-pointer items-center gap-1 underline hover:no-underline"
          :to="`/inventory/${variant.id}`"
          target="_blank"
          >{{ variant.id }} <SquareArrowOutUpRightIcon :size="9"
        /></nuxt-link>
      </div>
      <p class="text-xs">
        Looks like you need to add a new batch in the inventory.
      </p>
    </AlertDescription>
  </Alert>
</template>

<script setup lang="ts">
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert, SquareArrowOutUpRightIcon } from "lucide-vue-next";

const props = defineProps<{ productId: string }>();
const variants = ref<{ id: string; inventoryQuantity: number }[]>([]);
const variantWithZeroQuantity = computed(() =>
  variants.value.filter((variant) => variant.inventoryQuantity === 0),
);

const fetchVariantDetails = async () => {
  try {
    const { data } = await axios.get(
      `/api/product/${props.productId}/variant-inventory`,
    );
    if (data) variants.value = data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchVariantDetails();
});
</script>
