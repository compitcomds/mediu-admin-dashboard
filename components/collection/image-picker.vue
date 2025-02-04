<template>
  <div class="mb-4">
    <label for="collection-image-pick" class="block text-gray-700">Image</label>
    <input
      id="collection-image-pick"
      type="file"
      @change="onImageSelected"
      accept="image/*"
      :disabled="!!disabledForm"
    />
    <img
      v-if="collectionImage.preview"
      :src="collectionImage.preview"
      class="mt-2 h-32 w-32 object-cover"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  defaultPreview?: string | null;
  disabledForm?: boolean;
}>();

const emit = defineEmits<{
  (event: "update:image", image: File): void;
}>();

const collectionImage = ref<{ image: any; preview: string | null }>({
  image: null,
  preview: props.defaultPreview || null,
});

function onImageSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    collectionImage.value.image = file;
    collectionImage.value.preview = URL.createObjectURL(file);

    emit("update:image", file);
  }
}
</script>
