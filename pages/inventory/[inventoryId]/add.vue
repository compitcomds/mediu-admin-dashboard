<template>
  <div class="flex w-full h-screen justify-center items-center">
    <div class="w-1/3 p-6 bg-gray-100 rounded-md">
      <h1 class="text-2xl font-bold mb-4">Add Item</h1>
      <form
        @submit.prevent="handleSubmit"
        class="bg-white p-6 rounded shadow-md"
      >
        <div class="mb-4">
          <label
            for="expiryDate"
            class="block text-sm font-medium text-gray-700"
            >Expiry Date:</label
          >
          <input
            type="date"
            v-model="expiryDate"
            id="expiryDate"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>
        <div class="mb-4">
          <label for="quantity" class="block text-sm font-medium text-gray-700"
            >Quantity:</label
          >
          <input
            type="number"
            v-model="quantity"
            id="quantity"
            required
            min="1"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add Item
        </button>
      </form>

      <div v-if="submittedData" class="mt-6 p-4 bg-gray-100 rounded shadow-md">
        <h2 class="text-lg font-bold">Submitted Data:</h2>
        <p class="text-gray-700">Expiry Date: {{ submittedData.expiryDate }}</p>
        <p class="text-gray-700">Quantity: {{ submittedData.quantity }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expiryDate: "",
      quantity: "",
      submittedData: null,
    };
  },
  methods: {
    handleSubmit() {
      this.submittedData = {
        expiryDate: this.expiryDate,
        quantity: this.quantity,
      };
      // Reset form fields
      this.expiryDate = "";
      this.quantity = "";
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  margin-top: 10px;
}
</style>
