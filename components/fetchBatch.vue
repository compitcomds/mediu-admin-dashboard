<template>
  <div>
    <label for="quantity">Enter Quantity:</label>
    <input type="number" v-model.number="quantity" @input="updateInputs" min="1" />

    <div v-for="n in quantity" :key="n" class="input-group">
      <label :for="'batchId' + n">Batch ID {{ n }}:</label>
      <input
        type="text"
        v-model="batchIds[n - 1]"
        :id="'batchId' + n"
        placeholder="Enter Batch ID"
      />
      <button @click="confirmBatchId(n - 1)">Confirm</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 0, // Quantity of input fields
      batchIds: [], // Array to hold batch IDs
    };
  },
  methods: {
    updateInputs() {
      // Adjust the batchIds array length based on the quantity
      if (this.quantity > this.batchIds.length) {
        this.batchIds = [
          ...this.batchIds,
          ...Array(this.quantity - this.batchIds.length).fill(""),
        ];
      } else {
        this.batchIds = this.batchIds.slice(0, this.quantity);
      }
    },
    confirmBatchId(index) {
      // Handle confirm action for each individual batch ID
      console.log(`Confirmed Batch ID ${index + 1}:`, this.batchIds[index]);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-group {
  margin-top: 8px;
}

button {
  margin-left: 8px;
}
</style>
