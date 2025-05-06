<template>
  <form
    @submit.prevent="submitForm"
    class="flex flex-col justify-between gap-2 lg:flex-row"
  >
    <div class="flex flex-1 flex-col gap-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Consultancy Title <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="title"
          v-model="service.title"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          required
          :disabled="!!props.disabledForm"
        />
      </div>
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700"
          >Price <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="price"
          v-model.number="service.price"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          required
          :disabled="!!props.disabledForm"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700"
          >Description <span class="text-red-500">*</span></label
        >
        <textarea
          id="description"
          v-model="service.descriptionHtml"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          rows="6"
          required
          :disabled="!!props.disabledForm"
        ></textarea>
      </div>
    </div>
    <div class="flex max-w-sm flex-col gap-y-4">
      <div>
        <p class="block text-sm font-medium text-gray-700">
          Tags <span class="text-red-500">*</span>
        </p>
        <ConsultancyTags
          v-model="service.tags"
          :disabled-form="!!props.disabledForm"
        />
      </div>
      <button
        v-if="!props.disabledForm"
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-[#28574e] px-4 py-2 font-semibold text-white hover:bg-[#1f4d42] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span v-if="isSubmitting" class="flex items-center justify-center gap-1"
          >Submitting <Loader
        /></span>
        <span v-else>Submit</span>
      </button>
      <ConsultancyDeleteButton
        v-if="props.consultancyId && !props.disabledForm"
        :consultancy-id="props.consultancyId"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";

type ServiceType = {
  title: string;
  descriptionHtml: string;
  image?: string;
  price: number;
  tags: string[];
};

const props = defineProps<{
  defaultValues?: ServiceType;
  onSubmit?: (service: ServiceType) => Promise<void>;
  consultancyId?: string;
  disabledForm?: boolean;
}>();

const isSubmitting = ref(false);
const service = ref<ServiceType>(
  props.defaultValues || {
    title: "",
    descriptionHtml: "",
    price: 0,
    tags: [],
  },
);

const checkValidForm = () => {
  if (isNaN(parseFloat(service.value.price as any))) {
    toast.error("Please enter valid price.", { richColors: true });
    return false;
  }
  if (service.value.tags.length === 0) {
    toast.error("Please enter atleast one tag.", { richColors: true });
    return false;
  }
  return true;
};

const submitForm = async () => {
  if (!props.onSubmit) return;
  if (!checkValidForm()) return;
  isSubmitting.value = true;
  try {
    props.onSubmit(service.value);
  } catch (error: any) {
    toast.error(error.message, { richColors: true });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
