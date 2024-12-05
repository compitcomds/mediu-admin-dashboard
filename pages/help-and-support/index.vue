<template>
  <div class="flex items-center gap-3 justify-between mt-10">
    <h2 class="text-3xl font-semibold flex-1 w-full mb-6">
      Your Submitted Tickets
    </h2>
    <HelpAndSupportTickerGenerator />
  </div>
  <Table>
    <TableCaption>A list of your raised tickets.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Description</TableHead>
        <TableHead class="lg:w-[200px]">Created On</TableHead>
        <TableHead class="lg:w-[160px]">Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="ticket in tickets" :key="ticket.$id">
        <TableCell>{{ ticket.title }}</TableCell>
        <TableCell>{{ ticket.description }}</TableCell>
        <TableCell>{{ formatDateTime(ticket.$createdAt) }}</TableCell>
        <TableCell
          ><p
            class="px-6 py-1 text-center bg-gray-700 rounded-r-full rounded-l-full text-white"
            :class="{
              'bg-amber-500': ticket.status === 'IN-PROGRESS',
              'bg-[#238878]': ticket.status === 'SOLVED',
              'bg-red-700': ticket.status === 'REJECTED',
            }"
          >
            {{ ticket.status }}
          </p></TableCell
        >
      </TableRow>
    </TableBody>
  </Table>
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
import { format } from "date-fns";
import getTicketsRaisedFromAppwrite from "~/appwrite/help-and-support/get-tickets";

const tickets = ref<any[]>([]);

onMounted(async () => {
  const { documents } = await getTicketsRaisedFromAppwrite();
  tickets.value = documents;
});
</script>
