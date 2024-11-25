<template>
  <Dialog>
    <DialogTrigger class="bg-black text-white px-6 py-2 rounded-lg">
      View Data
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>People to Notify</DialogTitle>
        <DialogDescription>
          <p>Product Id: {{ productId }}</p>
          <p>Product Title: {{ productTitle }}</p>
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
