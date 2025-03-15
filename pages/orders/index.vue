<template>
  <div class="mt-8">
    <div class="mb-1 flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Orders: All locations</h1>
      <div class="flex items-center gap-x-2">
        <ExportButton
          title="Export Orders"
          class="rounded-md bg-gray-200 px-6 py-2 hover:bg-gray-300"
          api="/api/orders/export"
          total-api="/api/orders/count"
          file-name="mediu-orders.csv"
          :parser="exportOrdersParser"
        >
          Export Orders
        </ExportButton>
      </div>
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
                {{ formatDateTime(order.createdAt) }}
              </td>
              <td class="border-b border-gray-200 px-4 py-3">
                {{ order.customer?.displayName }}
              </td>
              <td class="border-b border-gray-200 px-4 py-3">
                {{ order.totalPriceSet.presentmentMoney.amount }}
              </td>
              <td class="border-b border-gray-200 px-4 py-3">
                <span
                  class="inline-flex items-center px-2 py-1 text-xs font-semibold leading-none"
                  :class="
                    order.displayFinancialStatus === 'PAID'
                      ? 'rounded-full bg-green-200 p-1 text-gray-700'
                      : 'rounded-full bg-red-100 p-1 text-red-700'
                  "
                >
                  {{ order.displayFinancialStatus.toLowerCase() }}
                </span>
              </td>
              <td class="border-b border-gray-200 px-4 py-3">
                <span
                  class="inline-flex items-center px-2 py-1 text-xs font-semibold leading-none"
                  :class="
                    order.displayFulfillmentStatus !== 'UNFULFILLED'
                      ? 'rounded-full bg-yellow-100 p-1 text-yellow-800'
                      : 'rounded-full bg-red-100 p-1 text-red-600'
                  "
                >
                  {{
                    order.displayFulfillmentStatus !== null
                      ? order.displayFulfillmentStatus.toLowerCase()
                      : "unfulfilled"
                  }}
                </span>
              </td>
              <td class="border-b border-gray-200 px-4 py-3">
                {{ order.lineItems.length }}
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

    <PaginationButtons :pageInfo="pageInfo" />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import exportOrdersParser from "~/utils/parsers/orders";

const route = computed(() => useRoute());

const availableFilterList = [
  "all",
  "fulfilled",
  "unfulfilled",
  "unpaid",
  "paid",
] as const;

const activeFilter = ref<(typeof availableFilterList)[number]>("all");
const orders = ref<any[]>([]);
const pageInfo = ref<{
  endCursor: string;
  hasNextPage: boolean;
  startCursor: string;
  hasPreviousPage: boolean;
}>({
  endCursor: "",
  startCursor: "",
  hasNextPage: false,
  hasPreviousPage: false,
});

const fetchOrders = async ({
  after,
  before,
  query,
}: {
  after?: string;
  before?: string;
  query?: string;
}) => {
  try {
    const { data } = await axios.get(
      `/api/orders?after=${after || ""}&before=${before || ""}&query=${query || ""}`,
    );
    console.log(data);
    orders.value = data.orders;
    pageInfo.value = data.pageInfo;
  } catch (err: any) {}
};

watch(
  () => route.value.query,
  (newQuery) => {
    fetchOrders({
      after: newQuery.after?.toString(),
      before: newQuery.before?.toString(),
      query: newQuery.query?.toString(),
    });
  },
  {
    deep: true,
    immediate: true,
  },
);

const setFilter = (newFilter: typeof activeFilter.value) => {
  activeFilter.value = newFilter;
};

const checkOrder = (order: any): boolean => {
  const active = activeFilter.value;
  if (active === "all") return true;
  if (
    active === "unfulfilled" &&
    order.displayFulfillmentStatus === "UNFULFILLED"
  )
    return true;
  if (active === "fulfilled" && order.displayFulfillmentStatus === "FULFILLED")
    return true;

  if (active === "unpaid" && order.displayFinancialStatus !== "PAID")
    return true;
  if (active === "paid" && order.displayFinancialStatus === "PAID") return true;
  return false;
};

useHead({
  title: `All Orders`,
});
</script>

<style scoped></style>
