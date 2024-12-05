<template>
  <h2 class="min-w-fit mb-3 font-bold text-nowrap overflow-x-hidden">
    Consultancy Booked #{{ consultancy?.$id || "n/a" }}
  </h2>
  <div class="mb-5">
    <p>Title: {{ consultancy?.title || "n/a" }}</p>
    <p>Price: {{ consultancy?.price || "n/a" }}</p>
    <p>Description: {{ consultancy?.descriptionHtml || "n/a" }}</p>
    <div>
      Image:
      <img
        v-if="consultancy?.image"
        :src="consultancy.image"
        :alt="`Consultancy Image | ${consultancy?.title}`"
      />
      <p v-else class="text-xs text-yellow-500">
        Consultancy does not have any image.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Models } from "appwrite";

const { consultancy } = defineProps<{
  consultancy: Models.Document | null | undefined;
}>();
</script>
