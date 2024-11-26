<template>
  <form
    @submit.prevent="submitForm"
    class="flex flex-col lg:flex-row justify-between gap-2"
  >
    <div class="flex-1 flex flex-col gap-y-4">
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
        ></textarea>
      </div>
    </div>
    <div class="flex flex-col gap-y-4 max-w-sm">
      <div>
        <p class="block text-sm font-medium text-gray-700">
          Tags <span class="text-red-500">*</span>
        </p>
        <ConsultancyTags v-model="service.tags" />
      </div>
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full py-2 px-4 bg-[#28574e] text-white font-semibold hover:bg-[#1f4d42] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span v-if="isSubmitting" class="flex items-center justify-center gap-1"
          >Submitting <Loader
        /></span>
        <span v-else>Submit</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
type ServiceType = {
  title: string;
  descriptionHtml: string;
  image?: string;
  price: number;
  tags: string[];
};

const props = defineProps<{
  defaultValues?: ServiceType;
  onSubmit: (service: ServiceType) => Promise<void>;
}>();

const isSubmitting = ref(false);
const service = ref<ServiceType>(
  props.defaultValues || {
    title: "",
    descriptionHtml: "",
    price: 0,
    tags: [],
  }
);

const checkValidForm = () => {
  if (isNaN(parseFloat(service.value.price as any))) {
    alert("Please enter valid price.");
    return false;
  }
  if (service.value.tags.length === 0) {
    alert("Please enter atleast one tag.");
    return false;
  }
  return true;
};

const submitForm = async () => {
  if (!checkValidForm()) return;
  isSubmitting.value = true;
  try {
    props.onSubmit(service.value);
  } catch (error: any) {
    alert(error.message);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
