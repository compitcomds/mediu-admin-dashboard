<template>
  <div>
    <input
      type="file"
      @change="onFileChange"
      accept="image/*"
      class="image-picker"
    />
  </div>
</template>

<script setup>
const emit = defineEmits(["imageAdded"]);

// Method to handle file selection and emit the new image
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const newImage = {
        name: file.name, // Image file name
        base64: reader.result, // Base64 string of the image
      };
      emit("imageAdded", newImage); // Emit the new image to parent
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
.image-picker {
  display: block;
}
</style>
