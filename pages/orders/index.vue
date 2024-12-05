<template>
  <div class="">
    <div class="flex justify-between items-center mb-1">
      <h1 class="text-2xl font-semibold">Orders: All locations</h1>
      <div class="flex space-x-4"></div>
    </div>
    <div class="mb-4">
      <p class="text-xs">Total Orders: {{ orders.length }}</p>
    </div>

    <div class="flex items-center bg-white shadow rounded p-2 mb-4">
      <div class="flex space-x-4">
        <template v-for="filter in availableFilterList">
          <button
            @click="setFilter(filter)"
            class="py-2 px-4 capitalize hover:border-b-2 hover:border-gray-300"
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

    <div class="bg-white rounded shadow overflow-x-auto">
      <table class="min-w-full text-left">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 border-b border-gray-200">
              <input type="checkbox" class="form-checkbox" />
            </th>
            <th class="px-4 py-3 border-b border-gray-200">Order</th>
            <th class="px-4 py-3 border-b border-gray-200">Date</th>
            <th class="px-4 py-3 border-b border-gray-200">Customer</th>
            <th class="px-4 py-3 border-b border-gray-200">Total</th>
            <th class="px-4 py-3 border-b border-gray-200">Payment status</th>
            <th class="px-4 py-3 border-b border-gray-200">
              Fulfillment status
            </th>
            <th class="px-4 py-3 border-b border-gray-200">Items</th>
            <th class="px-4 py-3 border-b border-gray-200">.</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="order in orders" :key="order.id">
            <tr v-if="checkOrder(order)" class="hover:bg-gray-50">
              <td class="px-4 py-3 border-b border-gray-200">
                <input type="checkbox" class="form-checkbox" />
              </td>
              <td class="px-4 py-3 border-b border-gray-200 text-blue-600">
                <nuxt-link :to="`/orders/${order.id}`"
                  >{{ order.id }}
                </nuxt-link>
              </td>
              <td class="px-4 py-3 border-b border-gray-200">
                {{ formatDateTime(order.created_at) }}
              </td>
              <td class="px-4 py-3 border-b border-gray-200">
                {{ order.customer?.first_name }}
                {{ order.customer?.last_name }}
              </td>
              <td class="px-4 py-3 border-b border-gray-200">
                {{ order.total_price }}
              </td>
              <td class="px-4 py-3 border-b border-gray-200">
                <span
                  class="inline-flex items-center px-2 py-1 text-xs font-semibold leading-none"
                  :class="
                    order.financial_status === 'paid'
                      ? 'text-gray-700 bg-gray-200 p-1 rounded-full'
                      : 'text-red-700 bg-red-100 p-1 rounded-full '
                  "
                >
                  {{ order.financial_status }}
                </span>
              </td>
              <td class="px-4 py-3 border-b border-gray-200">
                <span
                  class="inline-flex items-center px-2 py-1 text-xs font-semibold leading-none"
                  :class="
                    order.fulfillment_status !== null
                      ? 'text-yellow-800 bg-yellow-100 p-1 rounded-full'
                      : 'text-red-600 bg-red-100 p-1 rounded-full'
                  "
                >
                  {{
                    order.fulfillment_status !== null
                      ? order.fulfillment_status
                      : "unfulfilled"
                  }}
                </span>
              </td>
              <td class="px-4 py-3 border-b border-gray-200">
                {{ order.line_items.length }}
              </td>
              <td class="px-4 py-3 border-b border-gray-200">
                <nuxt-link
                  :to="`/orders/${order.id}`"
                  class="bg-black text-white font-semibold px-2 py-1 rounded-md shadow-gray-800"
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
import { formatDate } from "date-fns";

const availableFilterList = [
  "all",
  "fulfilled",
  "unfulfilled",
  "unpaid",
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
  return false;
};
</script>

<style scoped></style>
