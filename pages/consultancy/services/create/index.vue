<template>
  <h1 class="text-3xl font-bold mb-4">Create Consultancy Service</h1>
  <ConsultancyForm :on-submit="addConsultancyService" />
</template>
<script setup lang="ts">
import createConsultancyService from "~/appwrite/consultancy/create-service";

const router = useRouter();

const addConsultancyService = async (service: {
  title: string;
  descriptionHtml: string;
  image?: string;
  price: number;
  tags: string[];
}) => {
  const document = await createConsultancyService(service);
  alert("Successfully created the service!");
  router.replace(`/consultancy/services/s/${document.$id}`);
};
</script>
