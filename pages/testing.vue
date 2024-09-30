<template>
  <div class="h-96"></div>
  <div>
    data
    <input v-model="inputValue" placeholder="Enter text or number" />
    <button @click="generateBarcode">Generate Barcode</button>
    <svg ref="barcode"></svg>
    
  </div>
</template>

<script>
import JsBarcode from 'jsbarcode';

export default {
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    generateBarcode() {
      JsBarcode(this.$refs.barcode, this.inputValue, {
        format: "CODE128",
        lineColor: "#0aa",
        width: 2,
        height: 40,
        displayValue: true,
      });
    },
  },
};
</script>

<style scoped>
input {
  margin-bottom: 10px;
}
</style>
