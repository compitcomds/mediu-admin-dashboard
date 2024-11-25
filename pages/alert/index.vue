<template>
  <AttachSidebar>
    <h1 class="text-3xl font-bold mb-4">Notify Users For Product In Stock</h1>
    <Table>
      <TableCaption
        >A list of products with corresponding people to notify.</TableCaption
      >
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
          v-for="(value, key) in documents"
          :product-id="key"
          :documents="value"
        />
      </TableBody>
    </Table>
  </AttachSidebar>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getUserAlertsData from "~/appwrite/alert/get-alerts";

const { documents } = await getUserAlertsData();
</script>
