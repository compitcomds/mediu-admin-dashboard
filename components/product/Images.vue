<template>
  <div class="image-gallery">
    <h2>Product Images</h2>

    <div class="image-list">
      <!-- Display images passed via props, hiding those in removedImages -->
      <template v-for="(image, index) in images">
        <div
          :key="image.id"
          v-if="!removedImages.includes(image)"
          class="image-item"
        >
          <img
            :src="image.src"
            :alt="image.alt || 'Product Image'"
            class="product-image"
          />
          <button type="button" @click="removeImage(image)" class="remove-btn">
            X
          </button>
        </div>
      </template>

      <!-- Display newly added images -->
      <div
        v-for="(image, index) in addedImages"
        :key="image.name"
        class="image-item"
      >
        <img
          :src="image.base64"
          :alt="image.name || 'New Image'"
          class="product-image"
        />
        <button
          type="button"
          @click="removeAddedImage(index)"
          class="remove-btn"
        >
          X
        </button>
      </div>
    </div>

    <ProductImagePicker @imageAdded="addImage" />
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const removedImages = defineModel("removedImages", { default: () => [] });
const addedImages = defineModel("addedImages", { default: () => [] });

// Method to "remove" an image (hide it by adding to removedImages array)
const removeImage = (image) => {
  removedImages.value.push(image);
};

// Method to handle adding a new image (stores base64 and image name)
const addImage = (newImage) => {
  addedImages.value.push({
    name: newImage.name, // image name
    base64: newImage.base64, // base64 data
  });
};

// Method to remove newly added images
const removeAddedImage = (index) => {
  addedImages.value.splice(index, 1);
};
</script>

<style scoped>
.image-gallery {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}
.image-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.image-item {
  position: relative;
  margin: 10px;
}
.product-image {
  width: 100px;
  height: auto;
}
.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
</style>
