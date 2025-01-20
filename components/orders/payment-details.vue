<script setup lang="ts">
import getAppwriteOrderById from "~/appwrite/order/get-appwrite-order";

const props = defineProps<{
  appwriteOrderId: string;
  discountCodes: string[];
  originalTotalAmount: any;
  discountedAmount: any;
  cartDiscountedAmount: any;
}>();

const orderDocument = ref<any>();

const fetchOrderDocument = async () => {
  orderDocument.value = await getAppwriteOrderById(props.appwriteOrderId);
};

onMounted(() => {
  fetchOrderDocument();
});
</script>
<template>
  <div class="w-full rounded border-2 border-gray-300 bg-white p-2">
    <h3 class="mb-4 text-xl font-semibold text-gray-800">Payment Details</h3>
    <div class="mb-4 flex flex-col gap-y-2">
      <p>
        <span class="text-gray-600">Transaction id:</span>
        {{ orderDocument?.transactionId }}
      </p>
      <p>
        <span class="text-gray-600">Wallet Amount Used: </span> ₹{{
          orderDocument?.walletAmountUsed || 0
        }}
      </p>
      <p v-if="props.cartDiscountedAmount.amount > 0">
        <span class="text-gray-600">Discount Applied: </span> ₹{{
          props.cartDiscountedAmount.amount
        }}
      </p>
      <p>
        <span class="text-gray-600">Total Order Price: </span> ₹{{
          props.discountedAmount.amount
        }}
        <span
          v-if="
            props.discountedAmount.amount < props.originalTotalAmount.amount
          "
          class="line-through"
          >₹{{ props.originalTotalAmount.amount }}</span
        >
      </p>
      <p
        v-if="props.discountCodes.length > 0"
        class="flex flex-wrap items-center gap-2 text-gray-600"
      >
        <span>Coupon Applied:</span>
        <span
          v-for="code in props.discountCodes"
          class="rounded-l-full rounded-r-full bg-gray-800 px-4 py-1 text-xs text-white"
          >{{ code }}</span
        >
      </p>
    </div>
  </div>
</template>
