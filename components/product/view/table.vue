<script setup lang="ts">
import { columns } from "~/components/product/view/columns";
import DataTable from "~/components/ui/data-table.vue";

const props = defineProps<{
  products: any[];
}>();
</script>

<template>
  <DataTable :columns="columns" :data="props.products" />
</template>
