<template>
  <div class="" v-if="order">
    <div class="flex items-center justify-between px-2">
      <h1 class="text-2xl font-semibold">
        Order #{{ orderId }}
        <span
          class="w-fit rounded-md p-2 text-xs font-bold capitalize text-white"
          :class="{
            'bg-[#28574e]': fulfillmentStatus === 'FULFILLED',
            'bg-red-500': fulfillmentStatus !== 'FULFILLED',
          }"
        >
          {{ fulfillmentStatus.toLowerCase() }}
        </span>
      </h1>
    </div>
    <div class="items-top h-fit w-full gap-5 md:flex">
      <div class="rounded-md p-2 md:w-1/2 lg:w-[60%]">
        <div class="mt-3 rounded-lg border-2 border-gray-300 bg-white p-4">
          <h1 class="mb-2 text-xl font-bold">Items ordered</h1>
          <template v-for="(item, index) in order.lineItems">
            <div
              class="mb-4 flex gap-4 border-b border-gray-200 pb-4 last:mb-0 last:border-0"
            >
              <div class="h-fit min-w-24 max-w-24 overflow-clip rounded-lg p-2">
                <img
                  class="h-auto w-full"
                  :src="
                    item.image?.url ||
                    `https://placehold.co/400x400/png/text=${item.name}`
                  "
                  :alt="item.image?.altText || `Image ${item.name}`"
                />
              </div>
              <div class="max-w-full flex-1 overflow-x-auto">
                <div class="mb-2 flex flex-wrap gap-2">
                  <h4 class="text-lg text-gray-800">
                    <nuxt-link
                      v-if="item.id"
                      :to="`/product/edit/${item.id}`"
                      class="hover:underline"
                      target="_blank"
                      >{{ item.name }}</nuxt-link
                    >
                    <span v-else>{{ item.name }}</span>
                  </h4>
                  <p
                    class="flex min-w-fit items-center justify-center rounded-l-full rounded-r-full bg-gray-700 px-3 text-xs text-white"
                  >
                    {{ item.sku || "N/A" }}
                  </p>
                </div>
                <p class="font-bold text-gray-800">
                  Quantity: {{ item.quantity }}
                </p>
                <div class="flex items-center gap-8">
                  <p class="font-bold text-gray-800">
                    Unit Price: ₹{{ item.unitPrice.amount }}
                  </p>
                  <p class="font-bold text-gray-800">
                    Total Price: ₹{{ item.discountedTotal.amount }}
                    <span
                      v-if="
                        item.discountedTotal.amount < item.originalTotal.amount
                      "
                      class="text-xs line-through"
                      >₹{{ item.originalTotal.amount }}</span
                    >
                  </p>
                </div>
                <div class="mt-2">
                  <h5 class="text-md font-semibold text-gray-700">
                    Tax Details
                  </h5>
                  <div class="flex items-center gap-8">
                    <p class="text-sm text-gray-600">
                      GST Applied: {{ item.gstApplied }}%
                    </p>
                    <p class="text-sm text-gray-500">
                      Total Tax: ₹{{
                        calculateGSTApplied({
                          cost: item.discountedTotal,
                          quantity: item.quantity,
                          gstApplied: item.gstApplied,
                        })
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="mt-3 rounded-lg border-2 border-gray-300 bg-white p-4">
          <h3 class="mb-2 text-lg font-semibold text-gray-800">
            Shipping Address
          </h3>
          <p class="mb-1">
            <strong>Name:</strong> {{ order.shippingAddress?.name }}
          </p>
          <p class="mb-1">
            <strong>Address:</strong> {{ order.shippingAddress?.address1
            }}{{
              !!order.shippingAddress?.address2
                ? ", " + order.shippingAddress.address2
                : ""
            }}
          </p>
          <p class="mb-1">
            <strong>City:</strong> {{ order.shippingAddress?.city }}
          </p>
          <p class="mb-1">
            <strong>State:</strong> {{ order.shippingAddress?.province }}
          </p>
          <p class="mb-1">
            <strong>Zip Code:</strong> {{ order.shippingAddress?.zip }}
          </p>
          <p class="mb-1">
            <strong>Country:</strong> {{ order.shippingAddress?.country }}
          </p>
          <p class="mb-1">
            <strong>Phone:</strong> {{ order.shippingAddress?.phone }}
          </p>
        </div>

        <div
          v-if="prescriptionImage"
          class="mt-3 rounded-lg border-2 border-gray-300 bg-white p-4"
        >
          <h3 class="mb-4 text-xl font-semibold text-gray-800">
            Prescription Image
          </h3>
          <img :src="prescriptionImage" alt="Prescription Image" />
        </div>
      </div>
      <div class="flex flex-col gap-y-4 rounded-md px-2 py-5 md:w-1/2 lg:w-1/3">
        <div class="w-full rounded border-2 border-gray-300 bg-white p-2">
          <h3 class="mb-4 text-xl font-semibold text-gray-800">
            Customer Details
          </h3>
          <div class="mb-4">
            <p class="text-lg font-medium text-gray-800">
              Name: {{ order.customer?.displayName || "" }}
            </p>
            <p class="text-gray-600">
              Email:
              <a
                :href="`mailto:${order.customer?.email || ''}`"
                class="text-blue-500 hover:underline"
                >{{ order.customer?.email || "" }}</a
              >
            </p>
            <p class="text-gray-600">
              Phone: {{ order.customer?.phone || "N/A" }}
            </p>
          </div>
        </div>
        <OrdersPaymentDetails
          :appwriteOrderId="order.appwriteOrderId?.value"
          :discountCodes="order.discountCodes"
          :originalTotalAmount="order.originalTotalPriceSet"
          :discountedAmount="order.discountedTotalPriceSet"
          :cart-discounted-amount="order.cartDiscountAmountSet"
        />
        <OrdersConfirmDialog
          v-if="fulfillmentStatus !== 'FULFILLED'"
          :order-data="order"
          :orderId="orderId"
          v-on:orderFulfilled="fulfillmentStatus = 'FULFILLED'"
        />
        <p
          v-else
          class="sticky w-full rounded-md bg-[#28574e] p-1 text-center text-xl font-semibold text-white"
        >
          Confirmed
        </p>
        <OrdersInvoiceDownloader :order-data="order" />
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center gap-2">
    <Loader /> Loading the data
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

const route = useRoute();
const orderId = Array.isArray(route.params.orderId)
  ? route.params.orderId[0]
  : route.params.orderId;
const order = ref<any>(null);
const error = ref<Array<any>>([]);
const loading = ref(true);
const prescriptionImage = ref(null);
const fulfillmentStatus = ref<string>("");

const fetchOrder = async () => {
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`);

    if (!data) throw new Error("Error fetching the order.");
    order.value = data;
    fulfillmentStatus.value = data.displayFulfillmentStatus;
    prescriptionImage.value = data.prescriptionUrl?.value;
  } catch (err) {
    error.value.push("Error fetching the order.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchOrder();
});

useHead({
  title: `Order | ${orderId}`,
});
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}

.order-details {
  margin-top: 20px;
}

.order-details h2,
.order-details p {
  margin-bottom: 10px;
}

.delete-button {
  background-color: #1fcd45;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}
</style>
