<template>
  <h1 class="text-3xl font-bold mb-4">Notify Users For Product In Stock</h1>
  <Table class="mb-4">
    <TableHeader>
      <TableRow>
        <TableHead class="w-[150px]">Product Image</TableHead>
        <TableHead>Product Id</TableHead>
        <TableHead>Product Title</TableHead>
        <TableHead>Total People</TableHead>
        <TableHead>All People</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <AlertRow
        v-for="(value, key) in userAlerts"
        :product-id="key"
        :documents="value"
      />
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getUserAlertsData from "~/appwrite/alert/get-alerts";

const { documents: userAlerts } = await getUserAlertsData();
</script>
