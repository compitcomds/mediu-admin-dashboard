<template>
  <h1 class="text-3xl font-bold mb-4">Edit Consultancy #{{ consultancyId }}</h1>

  <div v-if="!consultancy">
    <p class="text-red-500">Consultancy Not Found.</p>
  </div>

  <ConsultancyForm
    v-else
    :on-submit="updateConsultancy"
    :default-values="consultancy"
    :consultancy-id="consultancyId"
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

const updateConsultancy = async (service: {
  title: string;
  descriptionHtml: string;
  image?: string;
  price: number;
  tags: string[];
}) => {
  await updateConsultancyService(consultancyId, service);
  alert("Successfully updated the consultancy");
};

useHead({
  title: `Consultancy | ${consultancy?.title || consultancyId}`,
});
</script>
