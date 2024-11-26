<template>
  <div
    class="flex flex-col lg:flex-row justify-between items-center space-y-4 mb-4"
  >
    <h1 class="text-2xl text-[#28574e] font-semibold">Customers</h1>
    <div
      class="flex items-center sm:mb-0 bg-slate-200 lg:w-1/3 p-3 shadow-md rounded-md text-[#28574e]"
    >
      <span class="mr-2"
        ><span class="font-bold">{{ customers.length }}</span> customers</span
      >
      <span>100% of your customer base</span>
    </div>
  </div>

  <!-- Filters and Search -->
  <div class="flex flex-col sm:flex-row justify-between mb-4">
    <input
      v-model="searchQuery"
      type="text"
      class="w-full sm:w-1/3 px-4 py-2 border rounded"
      placeholder="Search customers by name, product, or price"
    />
  </div>

  <!-- Table -->
  <div class="overflow-x-auto">
    <table class="min-w-full table-auto bg-white border rounded">
      <thead class="bg-gray-200 text-gray-600">
        <tr>
          <th class="px-4 py-2 text-left">Customer name</th>
          <th class="px-4 py-2 text-left">Email subscription</th>
          <th class="px-4 py-2 text-left">Location</th>
          <th class="px-4 py-2 text-left">Orders</th>
          <th class="px-4 py-2 text-left">Amount spent</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="customer in filteredCustomers"
          :key="customer.id"
          class="border-b"
        >
          <td class="px-4 py-2">
            <nuxt-link
              :to="`/customers/${customer.id}`"
              class="text-blue-600 hover:underline"
            >
              {{ customer.name }}
            </nuxt-link>
          </td>
          <td class="px-4 py-2">{{ customer.emailSubscription }}</td>
          <td class="px-4 py-2">{{ customer.location }}</td>
          <td class="px-4 py-2">{{ customer.orders }} orders</td>
          <td class="px-4 py-2">{{ formatPrice(customer.amountSpent) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customers: [
        {
          id: 1,
          name: "Darshan Jain",
          emailSubscription: "Not subscribed",
          location: "",
          orders: 2,
          amountSpent: 10153.9,
        },
        {
          id: 2,
          name: "Compitcom Digital Solutions",
          emailSubscription: "Not subscribed",
          location: "",
          orders: 0,
          amountSpent: 0,
        },
        {
          id: 3,
          name: "Vikas Maur",
          emailSubscription: "Not subscribed",
          location: "",
          orders: 0,
          amountSpent: 0,
        },
        {
          id: 4,
          name: "Karine Ruby",
          emailSubscription: "Not subscribed",
          location: "",
          orders: 0,
          amountSpent: 0,
        },
        {
          id: 5,
          name: "Karine Ruby",
          emailSubscription: "Not subscribed",
          location: "",
          orders: 0,
          amountSpent: 0,
        },
      ],
      searchQuery: "",
    };
  },
  computed: {
    filteredCustomers() {
      const query = this.searchQuery.toLowerCase();
      return this.customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(query) ||
          customer.location.toLowerCase().includes(query) ||
          this.formatPrice(customer.amountSpent).toLowerCase().includes(query)
      );
    },
  },
  methods: {
    formatPrice(amount) {
      return `₹${amount.toFixed(2)}`;
    },
  },
};
</script>
