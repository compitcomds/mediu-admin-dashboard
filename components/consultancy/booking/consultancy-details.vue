<template>
  <h2 class="min-w-fit mb-3 font-bold text-nowrap overflow-x-hidden">
    Consultancy Booked #{{ document.consultancy[0].$id }}
  </h2>
  <div class="mb-5">
    <p>Title: {{ document.consultancy[0].title }}</p>
    <p>Price: {{ document.consultancy[0].price }}</p>
    <p>Description: {{ document.consultancy[0].descriptionHtml }}</p>
    <div>
      Image:
      <img
        v-if="document.consultancy[0].image"
        :src="document.consultancy[0].image"
        alt=""
      />
      <p v-else class="text-xs text-yellow-500">
        Consultancy does not have any image.
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
