<template>
  <h1 class="mb-4 text-3xl font-bold">Edit Consultancy #{{ consultancyId }}</h1>

  <div v-if="!consultancy">
    <p class="text-red-500">Consultancy Not Found.</p>
  </div>

  <ConsultancyForm
    v-else
    :default-values="consultancy"
    :consultancy-id="consultancyId"
    :disabled-form="true"
  />
</template>

<script setup lang="ts">
import {
  getConsultancyServiceById,
  updateConsultancyService,
} from "~/appwrite/consultancy/service";

const route = useRoute();
const consultancyId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;
let consultancy: any = null;

try {
  const fetchedConsultancy = await getConsultancyServiceById(consultancyId);
  consultancy = {
    title: fetchedConsultancy.title,
    descriptionHtml: fetchedConsultancy.descriptionHtml,
    image: undefined,
    price: fetchedConsultancy.price,
    tags: fetchedConsultancy.tags,
  };
} catch (error) {}

useHead({
  title: `Consultancy | ${consultancy?.title || consultancyId}`,
});
</script>
