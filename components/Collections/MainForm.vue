<!-- components/MainCollections.vue -->
<template>
  <div class="space-y-8">
    <div class="bg-white p-6 rounded-xl shadow-md space-y-8">
      <!-- Title and Description -->
      <CollectionsTitle />

      
    </div>
    <CollectionsType />
    <CollectionsProductAdd />
    
    <CollectionsSearchEngine />
  </div>
</template>

<script>
export default {
  name: "MainCollections",
};
</script>
