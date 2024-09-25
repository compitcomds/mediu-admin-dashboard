<!-- components/MainForm.vue -->
<template>
  <div class="space-y-8">
    <div class="bg-white p-6 rounded-xl shadow-md space-y-8">
      <!-- Title and Description -->
      <FormTitle />

      <!-- Media Upload -->
      <FormMedia />
      <FormCategory />
    </div>
    <FormPricing />
    <FormInventory />
    <FormShipping />
    <FormVarients />
    <FormMetafields />
    <FormSearchEngine />
  </div>
</template>

<script>
export default {
  name: "MainForm",
};
</script>
