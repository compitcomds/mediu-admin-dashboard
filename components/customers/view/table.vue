<script setup lang="ts">
import { columns } from "~/components/customers/view/columns";
import DataTable from "~/components/ui/data-table.vue";

const props = defineProps<{
  customers: any[];
}>();
</script>

<template>
  <DataTable :columns="columns" :data="props.customers" />
</template>
