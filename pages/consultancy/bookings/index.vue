<script setup lang="ts">
import getConsultancyCustomerBookings from "~/appwrite/consultancy/get-bookings";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const { documents } = await getConsultancyCustomerBookings();

useHead({
  title: "Consultancy Bookings",
});
</script>

<template>
  <h1 class="text-3xl font-bold mb-4">Consultancy Bookings</h1>

  <Table>
    <TableCaption>Consultancy Bookings.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]"> ID </TableHead>
        <TableHead>Consultancy Title</TableHead>
        <TableHead>User</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Payment Status</TableHead>
        <TableHead>Booking Time</TableHead>
        <TableHead>.</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="document in documents">
        <TableCell>{{ document.$id }}</TableCell>
        <TableCell>{{
          document.consultancy.length > 0 ? document.consultancy[0].title : ""
        }}</TableCell>
        <TableCell>{{ document.firstName }} {{ document.lastName }}</TableCell>
        <TableCell>{{ document.price }}</TableCell>
        <TableCell>{{ document.paymentStatus }}</TableCell>
        <TableCell>{{
          !!document.bookingTime
            ? formatBookingDateTime(document.bookingTime)
            : "To be set"
        }}</TableCell>
        <TableCell
          ><ConsultancyBookingAllotDialog :document="document"
        /></TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
