<template>
  <div class="grid grid-cols-6 gap-3">
    <h2 class="col-span-6 overflow-x-hidden text-nowrap font-bold">
      Booking Details
    </h2>
    <div class="col-span-3">
      <label for="transaction-id">Transaction Id</label>
      <input
        type="text"
        id="transaction-id"
        v-model="document.transactionId"
        class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
        placeholder=""
        disabled
      />
    </div>
    <div class="col-span-3">
      <label for="user-id">User Id</label>
      <input
        type="text"
        id="user-id"
        v-model="document.userId"
        class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
        placeholder=""
        disabled
      />
    </div>
    <div class="col-span-3">
      <label for="payment-status">Payment Status</label>
      <input
        type="text"
        id="payment-status"
        v-model="document.paymentStatus"
        class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
        placeholder=""
        disabled
      />
    </div>
    <div class="col-span-3">
      <label for="price">Price</label>
      <input
        type="text"
        id="price"
        v-model="document.price"
        class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
        placeholder=""
        disabled
      />
    </div>
    <div class="col-span-6 pt-2">
      <label for="booking-time mb-2 block ">Booking Time: </label>
      <p class="mb-2">Alotted Time: {{ formatBookingDateTime(showingDate) }}</p>
      <input
        v-model="date"
        type="datetime-local"
        class="mb-2 block border p-2 px-4"
      />
    </div>
    <div class="col-span-6">
      <button
        @click="onSubmit"
        :disabled="isSubmitting"
        class="ml-auto block rounded-lg bg-black px-6 py-2 text-white disabled:cursor-not-allowed disabled:opacity-80"
      >
        <span class="flex items-center gap-2" v-if="isSubmitting"
          >Submitting <Loader
        /></span>
        <span v-else>Save</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Models } from "appwrite";
import axios from "axios";
import { toast } from "vue-sonner";
import updateConsultancyBooking from "~/appwrite/consultancy/update-booking-time";

const { document } = defineProps<{
  document: Models.Document;
}>();

const isSubmitting = ref(false);
const showingDate = ref<string | Date | null>(document.bookingTime);
const date = ref<Date | null>(null);
const onSubmit = async () => {
  if (!date.value) {
    toast.error("Please select a booking date and time.", { richColors: true });
    return;
  }

  isSubmitting.value = true;
  try {
    await updateConsultancyBooking(document.$id, date.value);
    await axios.post("/api/consultancy/confirmation", {
      email: document.email,
      alottedTime: date.value,
      title: document.consultancy[0]?.title || "",
    });
    toast.success("Successfully updated the booking time!", {
      richColors: true,
    });
    showingDate.value = date.value;
  } catch (error: any) {
    toast.error(error.message, { richColors: true });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
