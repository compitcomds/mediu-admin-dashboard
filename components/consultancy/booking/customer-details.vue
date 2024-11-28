<template>
  <div class="grid flex-1 grid-cols-6 gap-3">
    <h2 class="col-span-6 font-bold">
      Customer Details #{{ document.userId }}
    </h2>
    <div class="col-span-3">
      <label for="first-name">First Name</label>
      <input
        type="text"
        id="first-name"
        v-model="document.firstName"
        class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
        placeholder=""
        disabled
      />
    </div>
    <div class="col-span-3">
      <label for="last-name">Last Name</label>
      <input
        type="text"
        id="last-name"
        v-model="document.lastName"
        class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
        placeholder=""
        disabled
      />
    </div>
    <div class="col-span-3">
      <label for="phone">User Phone</label>
      <input
        type="text"
        id="phone"
        v-model="document.phone"
        class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
        placeholder=""
        disabled
      />
    </div>
    <div class="col-span-3">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model="document.email"
        class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
        placeholder=""
        disabled
      />
    </div>

    <div class="col-span-6">
      <label for="note">Note</label>
      <textarea
        id="note"
        v-model="document.note"
        class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
        rows="3"
        disabled
      ></textarea>
    </div>
    <div class="col-span-6">
      <p class="mb-2">Image</p>
      <img v-if="document.image" :src="document.image" class="max-w-32" />
      <p v-else class="text-xs text-yellow-500">
        No image uploaded by the user.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Models } from "appwrite";

const { document } = defineProps<{
  document: Models.Document;
}>();
</script>
