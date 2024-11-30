<template>
  <div class="p-8 bg-gray-100 h-screen" v-if="order">
    <h1 class="text-2xl font-semibold mb-6">Fulfill Order: {{ order.id }}</h1>

    <div v-if="fulfillmentError" class="text-red-500">{{ fulfillmentError }}</div>
    <div v-else>
      <div v-if="!fulfilled">
        <button
          @click="fulfillOrder"
          class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Fulfill Items
        </button>
      </div>
      <div v-else>
        <p class="text-green-600">Order fulfilled successfully!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: null,
      fulfilled: false,
      fulfillmentError: null,
    };
  },
  async mounted() {
    await this.fetchOrder();
  },
  methods: {
    async fetchOrder() {
      const { id } = this.$route.params;
      try {
        const response = await fetch(`/api/orders/${id}`);
        const data = await response.json();
        if (data.error) {
          this.fulfillmentError = data.error;
        } else {
          this.order = data.order;
        }
      } catch (error) {
        this.fulfillmentError = error.message;
      }
    },
    async fulfillOrder() {
      const { orderId } = this.$route.params;

      try {
        const response = await fetch(`/api/orders/${orderId}/fulfill`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data.error) {
          this.fulfillmentError = data.error;
        } else {
          this.fulfilled = true;
          // Optionally refresh the order details after fulfillment
          await this.fetchOrder();
        }
      } catch (error) {
        this.fulfillmentError = error.message;
      }
    },
  },
};
</script>

<style scoped>
/* Add any styling here if needed */
</style>
