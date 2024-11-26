<template>
  <AttachSidebar>
    <div class="">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-semibold">Orders: All locations</h1>
        <div class="flex space-x-4">
          <button class="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">
            Export
          </button>
          <button class="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">
            More actions
          </button>
          <nuxt-link
            to="/create-order"
            class="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Create order
          </nuxt-link>
        </div>
      </div>

      <!-- Filters and Action Bar -->
      <div class="flex items-center bg-white shadow rounded p-2 mb-4">
        <div class="flex space-x-4">
          <button class="py-2 px-4 border-b-2 border-black">All</button>
          <button class="py-2 px-4 hover:border-gray-300">Unfulfilled</button>
          <button class="py-2 px-4 hover:border-gray-300">Unpaid</button>
          <button class="py-2 px-4 hover:border-gray-300">Open</button>
          <button class="py-2 px-4 hover:border-gray-300">Archived</button>
          <button class="py-2 px-4 hover:border-gray-300">+</button>
        </div>
      </div>

      <!-- Order Table -->
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
              <th class="px-4 py-3 border-b border-gray-200">View</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orders"
              :key="order.id"
              class="hover:bg-gray-50"
            >
              <td class="px-4 py-3 border-b border-gray-200">
                <input type="checkbox" class="form-checkbox" />
              </td>
              <td class="px-4 py-3 border-b border-gray-200 text-blue-600">
                {{ order.id }}
              </td>
              <td class="px-4 py-3 border-b border-gray-200">
                {{ order.created_at }}
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
                  >Click</nuxt-link
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Order Help Link -->
      <div class="mt-4 text-center text-gray-500">
        Learn more about <a href="#" class="text-blue-600">orders</a> data --
      </div>
    </div>
  </AttachSidebar>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      error: null,
    };
  },
  async mounted() {
    await this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();

        if (response.ok) {
          this.orders = data.orders;
        } else {
          this.error = data.error || "Failed to fetch orders";
        }
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>
<style scoped>
/* Custom styles for the page if needed */
</style>
