<template>
  <Dialog :open="open" @update:open="(newOpen) => (open = newOpen)">
    <DialogTrigger :as-child="true">
      <slot
        ><button type="button">{{ props.title }}</button></slot
      >
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ props.title }}</DialogTitle>
        <DialogDescription class="sr-only"> Add/Edit a blog </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label
            for="title"
            class="mb-2 block text-sm font-medium text-gray-700"
            >Title <span class="text-red-500">*</span></label
          >
          <input
            id="title"
            v-model="formData.title"
            type="text"
            placeholder="Enter your title"
            class="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label
            for="handle"
            class="mb-2 block text-sm font-medium text-gray-700"
            >Handle <span class="text-red-500">*</span>
            <span class="text-xs">(ex: /handle/article1)</span></label
          >
          <div class="flex">
            <input
              id="handle"
              v-model="formData.handle"
              type="text"
              placeholder="mediu-blog"
              class="flex-1 rounded-r-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full rounded-md bg-[#238878] px-4 py-2 font-medium text-white transition duration-200 hover:bg-opacity-90 disabled:cursor-not-allowed"
        >
          <span v-if="isSubmitting">Submitting...</span>
          <span v-else>Submit</span>
        </button>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "vue-sonner";

const props = defineProps<{
  title: string;
  id?: string;
  defaultValues?: { title: string; handle: string };
  onCategorySubmit: (values: any) => Promise<void>;
  closeOnSubmit?: boolean;
}>();

const open = ref(false);

const formData = ref({
  title: props.defaultValues?.title || "",
  handle: props.defaultValues?.handle || "",
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    await props.onCategorySubmit(formData.value);
    if (props.closeOnSubmit) open.value = false;
  } catch (error: any) {
    toast.error(
      error?.statusText ||
        error?.message ||
        "Unable to submit at the time. Please try again later.",
      { richColors: true },
    );
  } finally {
    isSubmitting.value = false;
  }
};
</script>
