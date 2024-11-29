<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Models } from "appwrite";

const { document } = defineProps<{
  document: Models.Document;
}>();
</script>

<template>
  <Dialog>
    <DialogTrigger
      class="bg-black text-white px-6 py-2 font-semibold rounded-lg"
      >{{
        !!document.bookingTime ? "View Details" : "Allot Booking"
      }}</DialogTrigger
    >
    <DialogContent class="min-w-fit max-w-[90%] p-0 max-h-[90vh]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>Alott Booking #{{ document.$id }}</DialogTitle>
      </DialogHeader>
      <div
        class="mb-10 px-6 flex flex-col lg:flex-row gap-4 overflow-y-auto max-h-[70vh] min-w-fit overflow-x-clip"
      >
        <ConsultancyBookingCustomerDetails :document="document" />
        <div class="flex-1">
          <ConsultancyBookingConsultancyDetails :document="document" />
          <ConsultancyBookingDetails :document="document" />
        </div>
      </div>
      <DialogFooter class="p-6 pt-0"> </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
