<template>
  <div class="border rounded-md p-4 bg-white w-full max-w-sm mx-auto">
    <h3 class="font-bold text-lg mb-2">Image</h3>
    
    <!-- Initial State: Add Image -->
    <div v-if="!imageSrc" class="border-dashed border-2 rounded-lg p-6 text-center cursor-pointer" @click="triggerFileInput">
      <input type="file" class="hidden" id="fileInput" @change="handleFileChange" accept="image/*" />
      <button class="bg-white border px-4 py-2 rounded mb-2">Add image</button>
      <p>or drop an image to upload</p>
    </div>

    <!-- After Image Upload: Show Image with Edit Options -->
    <div v-else class="relative border rounded-lg overflow-hidden">
      <img :src="imageSrc" class="w-full h-auto" alt="Uploaded image" />
      <button class="absolute top-0 right-0 mt-2 mr-2 text-blue-600" @click="toggleEditOptions">Edit</button>
      <div v-if="showEditOptions" class="absolute top-0 right-0 mt-10 mr-2 bg-white border rounded shadow-lg z-10">
        <ul class="py-2 text-left">
          <li class="px-4 py-2 cursor-pointer hover:bg-gray-100" @click="changeImage">Change image</li>
          <li class="px-4 py-2 cursor-pointer hover:bg-gray-100" @click="openAltTextModal">Edit alt text</li>
          <li class="px-4 py-2 cursor-pointer hover:bg-gray-100 text-red-600" @click="removeImage">Remove</li>
        </ul>
      </div>
    </div>

    <!-- Alt Text Modal -->
    <div v-if="isAltTextModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div class="mb-4">
          <img :src="imageSrc" class="w-full h-auto" alt="Uploaded image" />
        </div>
        <div>
          <label for="altText" class="block text-sm font-medium mb-1">Alt text</label>
          <textarea id="altText" rows="3" v-model="altText" class="border rounded w-full p-2" placeholder="Write a brief description of the file for people with visual impairment or low-bandwidth connections."></textarea>
        </div>
        <div class="mt-4 flex justify-end">
          <button class="mr-4 text-gray-700" @click="closeAltTextModal">Cancel</button>
          <button class="bg-blue-600 text-white px-4 py-2 rounded" @click="saveAltText">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: null, // Holds the source of the uploaded image
      altText: '', // Holds the alt text for the image
      showEditOptions: false, // Controls the visibility of the edit options
      isAltTextModalOpen: false // Controls the visibility of the alt text modal
    };
  },
  methods: {
    // Opens the file input to allow users to select an image
    triggerFileInput() {
      const fileInput = document.getElementById('fileInput');
      if (fileInput) {
        fileInput.click();
      } else {
        console.error('File input element not found.');
      }
    },
    // Handles the file input change event and loads the selected image
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result; // Update the image source with the uploaded image
          this.showEditOptions = false; // Hide edit options
        };
        reader.readAsDataURL(file); // Read the image file as a data URL
      }
    },
    // Triggers the file input to change the image
    changeImage() {
      const fileInput = document.getElementById('fileInput');
      if (fileInput) {
        fileInput.value = ''; // Reset the file input to allow re-uploading the same file
        fileInput.click(); // Open the file input to allow user to select a new image
      } else {
        console.error('File input element not found.');
      }
    },
    // Toggles the visibility of the edit options menu
    toggleEditOptions() {
      this.showEditOptions = !this.showEditOptions;
    },
    // Opens the alt text modal for editing
    openAltTextModal() {
      this.isAltTextModalOpen = true;
      this.showEditOptions = false; // Hide edit options when modal is open
    },
    // Closes the alt text modal without saving changes
    closeAltTextModal() {
      this.isAltTextModalOpen = false;
    },
    // Saves the alt text and closes the modal
    saveAltText() {
      this.closeAltTextModal();
      alert(`Alt text saved: ${this.altText}`);
    },
    // Removes the uploaded image and resets the component to the initial state
    removeImage() {
      this.imageSrc = null;
      this.altText = '';
      this.showEditOptions = false;
    }
  }
};
</script>

<style scoped>
/* Add specific styles if needed */
</style>
