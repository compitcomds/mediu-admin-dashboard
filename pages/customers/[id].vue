<template>
  <div class="flex flex-col h-screen py-10 lg:py-10">
    <!-- Sidebar -->
    <Sidenav />
    <div class="lg:ml-64 flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 mt-4 bg-gray-100">
      <NavigationButton />
      <div v-if="customer" class="flex flex-col lg:flex-row bg-gray-100 min-h-screen lg:space-x-2">
        <!-- Main Content Area -->
        <div class="flex-1 lg:w-3/4 bg-white p-6 rounded-lg shadow-md">
          <!-- Customer Header -->
          <div class="flex flex-col justify-between items-start mb-4">
            <div class="w-full">
              <h1 class="text-2xl font-semibold">{{ customer.name }}</h1>
              <p class="text-gray-600">Customer for {{ customer.duration }} days</p>
            </div>
            <div class="flex items-center justify-between w-full my-6 border bg-slate-100 rounded-md shadow">
              <p class="text-[#28574e] text-lg font-semibold p-6">All time</p>
              <div class="flex flex-col space-y-1 items-center p-6">
                <h2 class="text-[#28574e] text-lg font-semibold">Amount spent</h2>
                <p class="text-xl font-semibold">₹{{ formatPrice(customer.amountSpent) }}</p>
              </div>
              <div class="flex flex-col space-y-1 items-center p-6">
                <h2 class="text-[#28574e] text-lg font-semibold">Orders</h2>
                <p class="text-xl font-semibold">{{ customer.orders }}</p>
              </div>
            </div>
          </div>

          <!-- Last Order Section -->
          <div class="mt-6 bg-gray-50 p-4 rounded-lg">
            <h2 class="text-lg font-semibold mb-2">Last order placed</h2>
            <div class="border rounded-lg p-4">
              <div class="flex justify-between mb-4">
                <div>
                  <p class="font-bold text-blue-600">Order #{{ customer.lastOrder.id }}</p>
                  <p class="text-gray-500">{{ customer.lastOrder.date }} at {{ customer.lastOrder.time }} from {{
                    customer.lastOrder.history }}</p>
                </div>
                <div class="font-semibold text-red-500">
                  ₹{{ formatPrice(customer.lastOrder.totalAmount) }}
                </div>
              </div>
              <div v-for="item in customer.lastOrder.items" :key="item.id"
                class="flex justify-between items-center mb-2 border p-2 rounded-md">
                <div class="flex items-center">
                  <img :src="item.imageUrl || 'https://via.placeholder.com/40'" alt="Product Image" class="mr-2 w-10 h-10" />
                  <div class="flex flex-col">
                    <span>{{ item.name }}</span>
                    <p class="bg-slate-200 rounded-2xl text-sm flex items-center justify-center h-6 w-6">{{ item.size }}
                    </p>
                  </div>
                </div>
                <p>x {{ item.quantity }} </p>
                <span>₹{{ formatPrice(item.price) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <nuxt-link to="/customers" class="text-blue-500">View all orders</nuxt-link>
                <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Dispatch Order
                </button>
              </div>
            </div>
          </div>

          <!-- Timeline Section -->
          <div class="mt-6 bg-gray-50 p-4 rounded-lg">
            <h2 class="text-lg font-semibold mb-2">Timeline</h2>
            <ul>
              <li v-for="event in customer.timeline" :key="event.id" class="mb-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500 mr-3" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p class="text-gray-600">{{ event.message }}</p>
                      <p class="text-gray-400 text-sm">{{ event.time }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button @click="editMessage(event)" class="text-blue-500 hover:text-blue-700">Edit</button>
                    <button @click="deleteMessage(event.id)" class="text-red-500 hover:text-red-700">Delete</button>
                  </div>
                </div>
              </li>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500 mr-3" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M2.293 9.707a1 1 0 011.414 0L10 16l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
                <input type="text" v-model="newMessage" @keyup.enter="addMessage" class="border rounded-lg px-3 py-2 w-full"
                  placeholder="Leave a comment..." />
              </div>
            </ul>
          </div>
        </div>

        <!-- Right Sidebar -->
        <div class="lg:w-1/4 mt-4 lg:mt-0">
          <div class="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 class="text-lg font-semibold">Customer</h3>
            <div class="flex items-center">
              <a :href="'mailto:' + customer.email" class="text-blue-600 mb-2 flex-1">{{ customer.email }}</a>
              <button @click="copyEmail(customer.email)" class="ml-2 text-blue-500 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M8 2a2 2 0 00-2 2v2h1V4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-2v1h2a2 2 0 002-2V4a2 2 0 00-2-2H8z" />
                  <path d="M3 7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-6a2 2 0 00-2-2H3z" />
                </svg>
              </button>
            </div>
            <p class="text-gray-500 text-sm">Will receive notifications in English</p>
            <hr class="my-4" />
            <p class="font-semibold mb-1">Marketing</p>
            <div class="flex items-center">
              <input type="checkbox" id="email-marketing" class="mr-2" disabled />
              <label for="email-marketing">Email not subscribed</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="sms-marketing" class="mr-2" disabled />
              <label for="sms-marketing">SMS not subscribed</label>
            </div>
            <hr class="my-4" />
            <p class="font-semibold mb-1">Tax settings</p>
            <p class="text-gray-600">Collect tax</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-gray-600">Loading customer details...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customer: null,
      newMessage: '', // to store new comment message
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
          email: '2003jaindarshan@gmail.com',
          duration: 3,
          amountSpent: 10153.9,
          orders: 2,
          lastOrder: {
            id: 1004,
            date: 'September 26, 2024',
            time: '7:05 am',
            history: 'Drafts Orders',
            totalAmount: 5500,
            items: [
              { id: 2, name: 'blowshine', size: 10, quantity: 1, price: 2000, imageUrl: 'https://via.placeholder.com/40?text=Blowshine' },
              { id: 1, name: 'blowshine', size: 10, quantity: 1, price: 1000, imageUrl: 'https://via.placeholder.com/40?text=Blowshine' },
              { id: 3, name: 'blowshine', size: 10, quantity: 1, price: 2500, imageUrl: 'https://via.placeholder.com/40?text=Blowshine' },
            ],
          },
          timeline: [
            { id: 1, message: 'Order Confirmation email for order #1004 sent to this customer.', time: '7:05 AM' },
            { id: 2, message: 'You created order #1004 for this customer from draft order #D11.', time: '7:04 AM' },
            { id: 3, message: 'Order Confirmation email for order #1003 sent to this customer.', time: '6:20 AM' },
            { id: 4, message: 'You created order #1003 for this customer from draft order #D12.', time: '6:20 AM' },
            { id: 5, message: 'Headless created this customer.', time: '5:14 AM' },
          ],
        },
        {
          id: 2,
          name: 'Dipesh Sharma',
          email: 'dipeshsharma9338@gmail.com',
          duration: 3,
          amountSpent: 10153.9,
          orders: 2,
          lastOrder: {
            id: 1004,
            date: 'September 26, 2024',
            time: '7:05 am',
            history: 'Drafts Orders',
            totalAmount: 5500,
            items: [
              { id: 2, name: 'blowshine', size: 10, quantity: 1, price: 2000, imageUrl: 'https://via.placeholder.com/40?text=Blowshine' },
              { id: 1, name: 'blowshine', size: 10, quantity: 1, price: 1000, imageUrl: 'https://via.placeholder.com/40?text=Blowshine' },
              { id: 3, name: 'blowshine', size: 10, quantity: 1, price: 2500, imageUrl: 'https://via.placeholder.com/40?text=Blowshine' },
            ],
          },
          timeline: [
            { id: 1, message: 'Order Confirmation email for order #1004 sent to this customer.', time: '7:05 AM' },
            { id: 2, message: 'You created order #1004 for this customer from draft order #D11.', time: '7:04 AM' },
            { id: 3, message: 'Order Confirmation email for order #1003 sent to this customer.', time: '6:20 AM' },
            { id: 4, message: 'You created order #1003 for this customer from draft order #D12.', time: '6:20 AM' },
            { id: 5, message: 'Headless created this customer.', time: '5:14 AM' },
          ],
        },
        // Add more customer objects here if needed
      ];
      this.customer = customers.find(customer => customer.id == id);
      if (!this.customer) {
        console.error(`Customer with ID ${id} not found.`);
      }
    },
    formatPrice(amount) {
      return `${amount.toFixed(2)}`;
    },
    copyEmail(email) {
      navigator.clipboard.writeText(email).then(() => {
        alert('Email copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy email: ', err);
      });
    },
    addMessage() {
      if (this.newMessage.trim() !== '') {
        const newEvent = {
          id: Date.now(), // use timestamp as unique ID
          message: this.newMessage,
          time: new Date().toLocaleTimeString(),
        };
        this.customer.timeline.push(newEvent);
        this.newMessage = '';
      }
    },
    editMessage(event) {
      const updatedMessage = prompt('Edit your message:', event.message);
      if (updatedMessage !== null) {
        event.message = updatedMessage.trim();
      }
    },
    deleteMessage(id) {
      this.customer.timeline = this.customer.timeline.filter(event => event.id !== id);
    },
  },
};
</script>

<style scoped>
/* Custom styling for specific layout and elements */
@media (max-width: 1024px) {
  .lg\:w-3\/4 {
    width: 100%;
  }

  .lg\:ml-64 {
    margin-left: 0;
  }

  .lg\:w-1\/4 {
    width: 100%;
  }
}

input[type="checkbox"]:disabled {
  cursor: not-allowed;
}
</style>
