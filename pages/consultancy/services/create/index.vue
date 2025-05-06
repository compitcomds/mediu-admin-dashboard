<template>
  <h1 class="mb-4 text-3xl font-bold">Create Consultancy Service</h1>
  <ConsultancyForm :on-submit="addConsultancyService" />
</template>
<script setup lang="ts">
import { toast } from "vue-sonner";
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
  toast.success("Successfully created the service!", { richColors: true });
  router.replace(`/consultancy/services/s/${document.$id}`);
};

useHead({
  title: "Create Consultancy Service",
});
</script>
