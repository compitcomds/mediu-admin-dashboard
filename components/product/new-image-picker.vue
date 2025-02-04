<template>
  <div class="space-y-4">
    <label class="sr-only block text-sm font-medium text-gray-700"
      >Images</label
    >
    <input
      type="file"
      multiple
      accept="image/*"
      @change="handleFileChange"
      class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
      :disabled="!!disabledForm"
    />

    <div class="flex flex-wrap space-x-2">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative h-24 w-24 border border-gray-300"
      >
        <img
          :src="getImageUrl(image)"
          alt="Selected Image"
          class="h-full w-full object-cover"
        />
        <button
          v-if="!disabledForm"
          @click="removeImage(index)"
          class="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white hover:bg-red-500 focus:outline-none"
          title="Remove Image"
          type="button"
        >
          <span class="sr-only">Remove image</span>
          <X />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";

const props = defineProps<{
  modelValue: Array<File>;
  disabledForm?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const images = ref<File[]>([...props.modelValue]);

watch(
  () => props.modelValue,
  (newVal) => {
    images.value = [...newVal];
  },
);

const handleFileChange = (event: any) => {
  const selectedFiles = Array.from(event.target.files) as File[];
  images.value.push(...selectedFiles);
  emit("update:modelValue", images.value);
};

const removeImage = (index: number) => {
  images.value.splice(index, 1);
  emit("update:modelValue", images.value);
};

const getImageUrl = (image: File) => {
  return URL.createObjectURL(image);
};
</script>

<style scoped>
/* Add any custom styles here if necessary */
</style>
