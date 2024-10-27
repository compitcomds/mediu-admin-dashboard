<template>
  <div class="space-y-4">
    <label class="sr-only block text-sm font-medium text-gray-700"
      >Images</label
    >
    <input
      type="file"
      multipleu
      accept="image/*"
      @change="handleFileChange"
      class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
    />

    <div class="flex flex-wrap space-x-2">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative w-24 h-24 border border-gray-300"
      >
        <img
          :src="getImageUrl(image)"
          alt="Selected Image"
          class="w-full h-full object-cover"
        />
        <button
          @click="removeImage(index)"
          class="absolute top-1 right-1 bg-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 focus:outline-none"
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

<script setup>
import { X } from "lucide-vue-next";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const images = ref([...props.modelValue]);

watch(
  () => props.modelValue,
  (newVal) => {
    images.value = [...newVal];
  }
);

const handleFileChange = (event) => {
  const selectedFiles = Array.from(event.target.files);
  images.value.push(...selectedFiles);
  emit("update:modelValue", images.value);
};

const removeImage = (index) => {
  images.value.splice(index, 1);
  emit("update:modelValue", images.value);
};

const getImageUrl = (image) => {
  return URL.createObjectURL(image);
};
</script>

<style scoped>
/* Add any custom styles here if necessary */
</style>
