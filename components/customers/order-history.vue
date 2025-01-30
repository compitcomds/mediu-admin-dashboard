<template>
  <div class="mb-8 lg:mb-16">
    <h2 class="mb-6 text-2xl font-bold">Orders History</h2>
    <div
      v-if="orders?.length > 0"
      class="overflow-hidden rounded-lg bg-white shadow"
    >
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Order ID
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Items
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Total Value
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Created At
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="order in orders" :key="order.id">
              <td
                class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
              >
                {{ order.id }}
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">
                  <ul class="list-inside list-disc">
                    <li
                      v-for="item in order.items"
                      :key="item.id"
                      class="max-w-xs truncate"
                    >
                      {{ item.title }} (x{{ item.quantity }})
                    </li>
                  </ul>
                </div>
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                ₹{{ order.totalPriceSet.amount }}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <span
                  :class="{
                    'rounded px-2 py-1 text-xs font-semibold': true,
                    'bg-green-100 text-green-800': order.status === 'FULFILLED',
                    'bg-yellow-100 text-yellow-800':
                      order.status === 'UNFULFILLED',
                    'bg-red-100 text-red-800': order.status === 'CANCELLED',
                  }"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {{ formatDate(order.createdAt) }}
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                <NuxtLink
                  :to="`/orders/${order.id}`"
                  class="text-[#185c50] hover:text-green-900 hover:underline"
                >
                  View Details
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-500">No orders found</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";

const props = defineProps<{
  customerId: string;
}>();

const orders = ref<any[]>();

const fetchOrders = async () => {
  try {
    const { data } = await axios.get(
      `/api/customers/${props.customerId}/orders`,
    );
    orders.value = data;
  } catch (error) {}
};

onMounted(async () => {
  await fetchOrders();
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
