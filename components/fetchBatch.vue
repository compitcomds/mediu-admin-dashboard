<template>
  <div>
    <label for="quantity">Quantity:</label>
    <input type="number" v-model.number="quantity" :readonly="true" min="1" />

    <div v-for="(batchId, index) in batchIds" :key="index" class="input-group">
      <label :for="'batchId' + index">Batch ID {{ index + 1 }}:</label>
      <input
        type="text"
        v-model="batchIds[index]"
        :id="'batchId' + index"
        placeholder="Enter Batch ID"
      />
      <button @click="confirmBatchId(index)">Confirm</button>
      <span v-if="confirmStatus[index] === 'success'" class="text-green-500">
        ✔️
      </span>
      <span v-if="confirmStatus[index] === 'error'" class="text-red-500">
        ❌ {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getBatchDetails } from '~/appwrite/batchDetails';

export default {
  props: {
    initialQuantity: {
      type: Number,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const quantity = ref(props.initialQuantity);
    const batchIds = ref(Array(props.initialQuantity).fill(''));
    const confirmStatus = ref(Array(props.initialQuantity).fill(null));
    const errorMessage = ref('');

    async function confirmBatchId(index) {
      try {
        const response = await getBatchDetails(batchIds.value[index]);

        if (response.batch) {
          // Check if the batch ProductId matches the expected ProductId
          if (response.batch.ProductId === props.productId) {
            confirmStatus.value[index] = 'success';
            errorMessage.value = '';
          } else {
            confirmStatus.value[index] = 'error';
            errorMessage.value = 'Wrong batch for this product.';
          }
        } else {
          confirmStatus.value[index] = 'error';
          errorMessage.value = response.message;
        }
      } catch (error) {
        confirmStatus.value[index] = 'error';
        errorMessage.value = error.message || 'Error confirming batch ID.';
      }
    }

    return {
      quantity,
      batchIds,
      confirmStatus,
      errorMessage,
      confirmBatchId,
    };
  },
};
</script>
