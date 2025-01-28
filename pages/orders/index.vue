<template>
  <div class="">
    <div class="mb-1 flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Orders: All locations</h1>
      <div class="flex space-x-4"></div>
    </div>
    <div class="mb-4">
      <p class="text-xs">Total Orders: {{ orders.length }}</p>
    </div>

    <div class="mb-4 flex items-center rounded bg-white p-2 shadow">
      <div class="flex space-x-4">
        <template v-for="filter in availableFilterList">
          <button
            @click="setFilter(filter)"
            class="px-4 py-2 capitalize hover:border-b-2 hover:border-gray-300"
            :class="{
              'border-b-2 border-b-gray-700 hover:border-gray-700':
                filter === activeFilter,
            }"
          >
            {{ filter }}
          </button>
        </template>
      </div>
    </div>

    <div class="overflow-x-auto rounded bg-white shadow">
      <table class="min-w-full text-left">
        <thead class="bg-gray-50">
          <tr>
            <th class="border-b border-gray-200 px-4 py-3">
              <input type="checkbox" class="form-checkbox" />
            </th>
            <th class="border-b border-gray-200 px-4 py-3">Order</th>
            <th class="border-b border-gray-200 px-4 py-3">Date</th>
            <th class="border-b border-gray-200 px-4 py-3">Customer</th>
            <th class="border-b border-gray-200 px-4 py-3">Total</th>
            <th class="border-b border-gray-200 px-4 py-3">Payment status</th>
            <th class="border-b border-gray-200 px-4 py-3">
              Fulfillment status
            </th>
            <th class="border-b border-gray-200 px-4 py-3">Items</th>
            <th class="border-b border-gray-200 px-4 py-3">.</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="order in orders" :key="order.id">
            <tr v-if="checkOrder(order)" class="hover:bg-gray-50">
              <td class="border-b border-gray-200 px-4 py-3">
                <input type="checkbox" class="form-checkbox" />
              </td>
              <td class="border-b border-gray-200 px-4 py-3 text-blue-600">
                <nuxt-link :to="`/orders/${order.id}`"
                  >{{ order.id }}
                </nuxt-link>
              </td>
              <td class="border-b border-gray-200 px-4 py-3">
                {{ formatDateTime(order.created_at) }}
              </td>
              <td class="border-b border-gray-200 px-4 py-3">
                {{ order.customer?.first_name }}
                {{ order.customer?.last_name }}
              </td>
              <td class="border-b border-gray-200 px-4 py-3">
                {{ order.total_price }}
              </td>
              <td class="border-b border-gray-200 px-4 py-3">
                <span
                  class="inline-flex items-center px-2 py-1 text-xs font-semibold leading-none"
                  :class="
                    order.financial_status === 'paid'
                      ? 'rounded-full bg-gray-200 p-1 text-gray-700'
                      : 'rounded-full bg-red-100 p-1 text-red-700'
                  "
                >
                  {{ order.financial_status }}
                </span>
              </td>
              <td class="border-b border-gray-200 px-4 py-3">
                <span
                  class="inline-flex items-center px-2 py-1 text-xs font-semibold leading-none"
                  :class="
                    order.fulfillment_status !== null
                      ? 'rounded-full bg-yellow-100 p-1 text-yellow-800'
                      : 'rounded-full bg-red-100 p-1 text-red-600'
                  "
                >
                  {{
                    order.fulfillment_status !== null
                      ? order.fulfillment_status
                      : "unfulfilled"
                  }}
                </span>
              </td>
              <td class="border-b border-gray-200 px-4 py-3">
                {{ order.line_items.length }}
              </td>
              <td class="border-b border-gray-200 px-4 py-3">
                <nuxt-link
                  :to="`/orders/${order.id}`"
                  class="rounded-md bg-black px-2 py-1 font-semibold text-white shadow-gray-800"
                  >View</nuxt-link
                >
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="mt-4 text-center text-gray-500">
      Learn more about <a href="#" class="text-blue-600">orders</a> data --
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

const availableFilterList = [
  "all",
  "fulfilled",
  "unfulfilled",
  "unpaid",
  "paid",
] as const;

const activeFilter = ref<(typeof availableFilterList)[number]>("all");
const orders = ref<any[]>([]);
const error = ref<string | null>(null);

const fetchOrders = async () => {
  try {
    const response = await axios.get("/api/orders");
    orders.value = response.data.orders;
  } catch (err: any) {
    error.value = err.message;
  }
};

onMounted(() => {
  fetchOrders();
});

const setFilter = (newFilter: typeof activeFilter.value) => {
  activeFilter.value = newFilter;
};

const checkOrder = (order: any): boolean => {
  const active = activeFilter.value;
  if (active === "all") return true;
  if (active === "unfulfilled" && !order.fulfillment_status) return true;
  if (active === "fulfilled" && order.fulfillment_status?.includes("fulfilled"))
    return true;

  if (active === "unpaid" && order.financial_status !== "paid") return true;
  if (active === "paid" && order.financial_status === "paid") return true;
  return false;
};

useHead({
  title: `All Orders`,
});
</script>

<style scoped></style>
