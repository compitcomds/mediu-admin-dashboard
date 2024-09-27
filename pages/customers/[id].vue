<template>
  <div v-if="customer" class="flex flex-col h-screen py-10 lg:py-5">
    <!-- Sidebar -->
    <Sidenav />
    <div class="lg:ml-64 flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 mt-4 bg-gray-100">
      <NavigationButton />

      <!-- Customer Detail Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-semibold">{{ customer.name }}</h1>
          <p class="text-gray-600">Customer for {{ customer.duration }} days</p>
        </div>
        <div>
          <span class="text-lg font-semibold">Amount spent: </span>
          <span>{{ formatPrice(customer.amountSpent) }}</span>
          <p class="text-lg">Orders: {{ customer.orders }}</p>
        </div>
      </div>

      <!-- Last Order Placed -->
      <div class="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-2">Last order placed</h2>
        <div class="border rounded-lg p-4">
          <div class="flex justify-between items-center mb-2">
            <div>
              <p class="font-bold">Order #{{ customer.lastOrder.id }}</p>
              <p class="text-gray-500">{{ customer.lastOrder.date }}</p>
            </div>
            <div class="font-semibold text-red-500">
              ₹{{ formatPrice(customer.lastOrder.totalAmount) }}
            </div>
          </div>
          <div v-for="item in customer.lastOrder.items" :key="item.id" class="flex justify-between items-center mb-2">
            <span>{{ item.name }}</span>
            <span>₹{{ formatPrice(item.price) }}</span>
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-2">Timeline</h2>
        <ul>
          <li v-for="event in customer.timeline" :key="event.id" class="mb-4">
            <p class="text-gray-600">{{ event.message }}</p>
            <p class="text-gray-400">{{ event.time }}</p> 
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div v-else>
    <p class="text-gray-600">Loading customer details...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customer: null,
    };
  },
  mounted() {
    const customerId = this.$route.params.id;
    this.fetchCustomerDetails(customerId);
  },
  methods: {
    fetchCustomerDetails(id) {
      const customers = [
        {
          id: 1,
          name: 'Darshan Jain',
          duration: 3,
          amountSpent: 10153.9,
          orders: 2,
          lastOrder: {
            id: 1004,
            date: 'September 26, 2024',
            totalAmount: 5500,
            items: [
              { id: 1, name: 'blowshine', price: 1000 },
              { id: 2, name: 'blowshine', price: 2000 },
              { id: 3, name: 'blowshine', price: 2500 },
            ],
          },
          timeline: [
            { id: 1, message: 'Order Confirmation email for order #1004 sent to this customer.', time: '7:05 AM' },
            { id: 2, message: 'You created order #1004 for this customer from draft order #D11.', time: '7:04 AM' },
          ],
        },
        // Add other customer objects here
      ];
      this.customer = customers.find(customer => customer.id == id);
      if (!this.customer) {
        console.error(`Customer with ID ${id} not found.`);
      }
    },
    formatPrice(amount) {
      return `₹${amount.toFixed(2)}`;
    }
  }
};
</script>
