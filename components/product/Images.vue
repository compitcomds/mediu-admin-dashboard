<template>
  <div class="image-gallery">
    <h2 class="block text-sm font-medium text-gray-700">Product Images</h2>
    <div class="image-list-container">
      <!-- Display images passed via props, hiding those in removedImages -->
      <template v-for="(image, index) in images" :key="image.id">
        <div v-if="!removedImages.includes(image)" :class="['image-item', index === 0 ? 'first-image' : '']">
          <img :src="image.src" :alt="image.alt || 'Product Image'" class="product-image" />
          <button type="button" @click="removeImage(image)" class="remove-btn">
            X
          </button>
        </div>
      </template>

      <!-- Display newly added images -->
      <div v-for="(image, index) in addedImages" :key="image.name" :class="['image-item', images.length === 0 && index === 0 ? 'first-image' : '']">
        <img :src="image.base64" :alt="image.name || 'New Image'" class="product-image" />
        <button type="button" @click="removeAddedImage(index)" class="remove-btn">
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
  width: 100%;
}

.image-list-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 50px;
  flex-wrap: nowrap;
  overflow-x: auto; /* Allows scrolling for overflowing images */
}

.image-item {
  position: relative;
  margin: 0 10px;
}

.first-image .product-image {
  width: 200px; /* Larger width for the first image */
  height: 200px;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 2px;
  height: 25px;
  width: 25px;
}
</style>
