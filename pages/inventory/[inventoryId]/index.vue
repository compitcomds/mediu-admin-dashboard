<template>
    <div class="container">
        <div class="h-96"></div>
        <div class="inventory-info">
            <NuxtLink class="bg-black text-white font-semibold p-1 rounded-md px-3"
                :to="`/inventory/${$route.params.inventoryId}/add`">
                Add
            </NuxtLink>

            <h2 class="text-xl font-semibold">Inventory ID:</h2>
            <p class="text-lg text-gray-700">ID: {{ $route.params.inventoryId }}</p>
        </div>
    </div>
</template>

<script>
export default {
    // You can add any necessary data or methods here
};
</script>

<style lang="scss" scoped>
.container {
    padding: 16px;
}

.inventory-info {
    margin-top: 20px;
}
</style>
