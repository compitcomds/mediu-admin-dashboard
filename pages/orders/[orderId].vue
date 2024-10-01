<template>
  <div class="flex flex-col min-h-screen py-10 px-4 lg:px-20 bg-gray-100">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6 text-center">
        Order Status: {{ order ? order.fulfillment_status : "Loading..." }}
      </h1>

      <div v-if="loading" class="text-center text-gray-600">
        Loading order details...
      </div>

      <div v-if="order" class="order-details">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Order ID: {{ order.id }}</h2>
        <p class="text-lg text-gray-600 mb-2">Customer Name: {{ order.customer.first_name }} {{ order.customer.last_name }}</p>
        <p class="text-lg text-gray-600 mb-2">Subtotal: {{ order.current_subtotal_price }}</p>
        <p class="text-lg text-gray-600 mb-2">Taxes: {{ order.total_tax }}</p>
        <p class="text-lg text-gray-600 mb-2">Total Discount: {{ order.total_discounts }}</p>
        <p class="text-lg text-gray-600 mb-2">Fulfillment Status: {{ order.fulfillment_status }}</p>
        <p class="text-lg text-gray-600 mb-2">Financial Status: {{ order.financial_status }}</p>
        <p class="text-lg text-gray-600 mb-4">Date: {{ order.updated_at }}</p>

        <p class="text-lg font-semibold text-gray-700 mb-4">Order Items:</p>
        <ul class="list-disc pl-6">
          <li v-for="(item, index) in order.line_items" :key="index" class="text-gray-600 mb-2">
            {{ item.name }} - {{ item.quantity }} x {{ item.price }}
          </li>
        </ul>

        <p class="text-lg font-semibold text-gray-700 mt-4">Total Amount: {{ order.total_line_items_price }}</p>

      </div>

      <div v-if="error.length" class="error-message mt-6">
        <p v-for="(err, index) in error" :key="index" class="text-red-600 text-sm lg:text-base">
          {{ err }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: null,
      error: [],
      loading: true,
    };
  },
  async mounted() {
    const orderId = this.$route.params.orderId;

    try {
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();

      if (response.ok) {
        this.order = data.order;
      } else {
        this.error.push(data.error || "Error fetching order details");
      }
    } catch (err) {
      this.error.push("Error fetching the order.");
    } finally {
      this.loading = false;
    }
  },
 
};
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
