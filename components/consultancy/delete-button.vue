<template>
  <button
    type="button"
    :disabled="isDeleting"
    class="w-full rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
    @click="deleteConsultancy"
  >
    <span v-if="isDeleting" class="flex items-center justify-center gap-1"
      >Deleting... <Loader
    /></span>
    <span v-else>Delete Consultancy</span>
  </button>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import { deleteConsultancyService } from "~/appwrite/consultancy/service";

const { consultancyId } = defineProps<{ consultancyId: string }>();
const router = useRouter();
const isDeleting = ref(false);

const deleteConsultancy = async () => {
  isDeleting.value = true;
  try {
    await deleteConsultancyService(consultancyId);
    toast.success(
      "Successfully deleted the consultancy! Redirecting to all consultancy services page...",
      { richColors: true },
    );
    router.push("/consultancy/services");
  } catch (err: any) {
    toast.error(
      err.message ||
        "Unable to delete the consultancy at the time. Please try again later.",
      { richColors: true },
    );
  } finally {
    isDeleting.value = false;
  }
};
</script>
