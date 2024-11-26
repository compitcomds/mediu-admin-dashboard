<template>
  <button
    type="button"
    :disabled="isDeleting"
    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full disabled:cursor-not-allowed disabled:opacity-70"
    @click="deleteConsultancy"
  >
    <span v-if="isDeleting" class="flex items-center justify-center gap-1"
      >Deleting... <Loader
    /></span>
    <span v-else>Delete Consultancy</span>
  </button>
</template>

<script setup lang="ts">
import { deleteConsultancyService } from "~/appwrite/consultancy/service";

const { consultancyId } = defineProps<{ consultancyId: string }>();
const router = useRouter();
const isDeleting = ref(false);

const deleteConsultancy = async () => {
  isDeleting.value = true;
  try {
    await deleteConsultancyService(consultancyId);
    alert(
      "Successfully deleted the consultancy! Redirecting to all consultancy services page..."
    );
    router.push("/consultancy/services");
  } catch (err: any) {
    alert(
      err.message ||
        "Unable to delete the consultancy at the time. Please try again later."
    );
  } finally {
    isDeleting.value = false;
  }
};
</script>
