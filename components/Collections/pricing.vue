<template>
  <div class="border rounded-md p-4 bg-white w-full  mx-auto">
    <h3 class="font-bold text-lg mb-2">Collection type</h3>
    <div>
      <label class="flex items-center space-x-2 mb-4">
        <input type="radio" name="collectionType" value="manual" class="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" v-model="selectedType" />
        <span class="text-sm">Manual</span>
      </label>
      <p class="text-sm text-gray-500 mb-6">Add products to this collection one by one. <a href="#" class="text-blue-600">Learn more about manual collections</a>.</p>
      <label class="flex items-center space-x-2">
        <input type="radio" name="collectionType" value="automated" class="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" v-model="selectedType" />
        <span class="text-sm">Automated</span>
      </label>
      <p class="text-sm text-gray-500">Existing and future products that match the conditions you set will automatically be added to this collection. <a href="#" class="text-blue-600">Learn more about automated collections</a>.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedType: 'manual',
    };
  },
};
</script>

<style scoped>
.form-radio {
  @apply h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500;
}
</style>
