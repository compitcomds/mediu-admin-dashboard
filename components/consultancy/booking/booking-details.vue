<template>
  <div class="grid grid-cols-6 gap-3">
    <h2 class="col-span-6 font-bold text-nowrap overflow-x-hidden">
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
        class="block border p-2 px-4 mb-2"
      />
    </div>
    <div class="col-span-6">
      <button
        @click="onSubmit"
        :disabled="isSubmitting"
        class="block ml-auto disabled:opacity-80 disabled:cursor-not-allowed bg-black text-white px-6 py-2 rounded-lg"
      >
        <span class="flex gap-2 items-center" v-if="isSubmitting"
          >Submitting <Loader
        /></span>
        <span v-else>Save</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Models } from "appwrite";
import updateConsultancyBooking from "~/appwrite/consultancy/update-booking-time";

const { document } = defineProps<{
  document: Models.Document;
}>();

const isSubmitting = ref(false);
const showingDate = ref<string | Date | null>(document.bookingTime);
const date = ref<Date | null>(null);
const onSubmit = async () => {
  if (!date.value) {
    alert("Please select a booking date and time.");
    return;
  }

  isSubmitting.value = true;
  try {
    await updateConsultancyBooking(document.$id, date.value);
    alert("Successfully updated the booking time!");
    showingDate.value = date.value;
  } catch (error: any) {
    alert(error.message);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
