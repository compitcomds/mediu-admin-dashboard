<template>
  <div class="flex h-screen">
    <Sidenav />
    <div class="ml-64 flex-1 overflow-y-auto p-8 mt-10 bg-gray-100 ">
      <NavigationButton />
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
            <nuxt-link to="/create-order"
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
        <div class="bg-white rounded shadow">
          <table class="min-w-full text-left">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 border-b border-gray-200">
                  <input type="checkbox" class="form-checkbox" />
                </th>
                <th class="px-4 py-3 border-b border-gray-200">Order</th>
                <th class="px-4 py-3 border-b border-gray-200">Date</th>
                <th class="px-4 py-3 border-b border-gray-200">Customer</th>
                <th class="px-4 py-3 border-b border-gray-200">Channel</th>
                <th class="px-4 py-3 border-b border-gray-200">Total</th>
                <th class="px-4 py-3 border-b border-gray-200">
                  Payment status
                </th>
                <th class="px-4 py-3 border-b border-gray-200">
                  Fulfillment status
                </th>
                <th class="px-4 py-3 border-b border-gray-200">Items</th>
                <th class="px-4 py-3 border-b border-gray-200">
                  Delivery status
                </th>
                <th class="px-4 py-3 border-b border-gray-200">
                  Delivery method
                </th>
                <th class="px-4 py-3 border-b border-gray-200">Tags</th>
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
                  {{ order.date }}
                </td>
                <td class="px-4 py-3 border-b border-gray-200">
                  {{ order.customer }}
                </td>
                <td class="px-4 py-3 border-b border-gray-200">
                  {{ order.channel }}
                </td>
                <td class="px-4 py-3 border-b border-gray-200">
                  {{ order.total }}
                </td>
                <td class="px-4 py-3 border-b border-gray-200">
                  <span
                    class="inline-flex items-center px-2 py-1 text-xs font-semibold leading-none"
                    :class="
                      order.paymentStatus === 'Paid'
                        ? 'text-gray-700 bg-gray-200'
                        : 'text-red-700 bg-red-100'
                    "
                  >
                    {{ order.paymentStatus }}
                  </span>
                </td>
                <td class="px-4 py-3 border-b border-gray-200">
                  <span
                    class="inline-flex items-center px-2 py-1 text-xs font-semibold leading-none"
                    :class="
                      order.fulfillmentStatus === 'Unfulfilled'
                        ? 'text-yellow-800 bg-yellow-100'
                        : 'text-green-700 bg-green-100'
                    "
                  >
                    {{ order.fulfillmentStatus }}
                  </span>
                </td>
                <td class="px-4 py-3 border-b border-gray-200">
                  {{ order.items }}
                </td>
                <td class="px-4 py-3 border-b border-gray-200">
                  {{ order.deliveryStatus }}
                </td>
                <td class="px-4 py-3 border-b border-gray-200">
                  {{ order.deliveryMethod }}
                </td>
                <td class="px-4 py-3 border-b border-gray-200">
                  {{ order.tags }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Order Help Link -->
        <div class="mt-4 text-center text-gray-500">
          Learn more about <a href="#" class="text-blue-600">orders</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrdersPage",
  data() {
    return {
      orders: [
        {
          id: "#1002",
          date: "Aug 13 at 5:09 am",
          customer: "No customer",
          channel: "Headless",
          total: "₹1,045.42",
          paymentStatus: "Paid",
          fulfillmentStatus: "Unfulfilled",
          items: "1 item",
          deliveryStatus: "Standard",
          deliveryMethod: "Standard",
          tags: "-",
        },
        {
          id: "#1001",
          date: "Aug 13 at 4:32 am",
          customer: "No customer",
          channel: "Headless",
          total: "₹1,045.42",
          paymentStatus: "Paid",
          fulfillmentStatus: "Unfulfilled",
          items: "2 items",
          deliveryStatus: "Standard",
          deliveryMethod: "Standard",
          tags: "-",
        },
        {
          id: "#1003",
          date: "Aug 13 at 4:32 am",
          customer: "No customer",
          channel: "Headless",
          total: "₹1,045.42",
          paymentStatus: "Paid",
          fulfillmentStatus: "Unfulfilled",
          items: "2 items",
          deliveryStatus: "Standard",
          deliveryMethod: "Standard",
          tags: "-",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Custom styles for the page if needed */
</style>
