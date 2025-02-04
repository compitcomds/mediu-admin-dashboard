<template>
  <Dialog>
    <DialogTrigger class="rounded-lg bg-black px-6 py-2 text-white">
      View Data
    </DialogTrigger>
    <DialogContent class="max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>People to Notify</DialogTitle>
        <DialogDescription>
          <p>Product Id: {{ productId }}</p>
          <p class="flex items-start gap-1">
            Product Title: {{ productTitle }}
            <nuxt-link :to="`/product/${productId}`" target="_blank"
              ><ExternalLink :size="14"
            /></nuxt-link>
          </p>
        </DialogDescription>
      </DialogHeader>
      <Table>
        <TableCaption
          >A list of all people to notify when the product comes back in
          stock.</TableCaption
        >
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead class="w-[100px]"> Name </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(document, index) in documents">
            <TableCell> {{ index + 1 }} </TableCell>
            <TableCell>{{ document.name }}</TableCell>
            <TableCell>{{ document.email }}</TableCell>
            <TableCell> {{ document.phone }} </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <DialogFooter> </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ExternalLink } from "lucide-vue-next";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const { documents, productId, productTitle } = defineProps<{
  documents: any[];
  productId: string;
  productTitle: string;
}>();
</script>
