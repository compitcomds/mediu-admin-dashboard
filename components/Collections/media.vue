<template>
  <div>
    <label class="block text-sm font-medium text-gray-700">Media</label>
    <!-- Upload Box -->
    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border border-dashed border-black rounded-md">
      <div class="space-y-1 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M24 4v16m0 0L8 12m16 8L40 12M4 28v16h16v-8h8v8h16V28m-24 0H8m16 0h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="flex items-center text-sm text-gray-600">
          <label for="file-upload" class="relative cursor-pointer p-1 bg-slate-100 rounded-md font-medium text-blue-600 hover:text-blue-500">
            <span>Upload New</span>
            <input id="file-upload" name="file-upload" type="file" class="sr-only" multiple @change="handleFileUpload" />
          </label>
          <p class="pl-1">or drag and drop</p>
        </div>
        <p class="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>

    <!-- Display Uploaded Images -->
    <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <!-- First Image (Large) -->
      <div v-if="files.length > 0" class="relative col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 h-60 w-full">
        <img :src="files[0].preview" class="object-cover w-full h-full border rounded-md" />
        <button @click="removeFile(0)" class="absolute w-1/3 top-2 right-0 text-red-500 bg-white rounded-full font-semibold px-2 py-1 mx-1 text-xs">Remove</button>
      </div>

      <!-- Other Images (Small) -->
      <div v-for="(file, index) in files.slice(1)" :key="index" class="relative">
        <img :src="file.preview" class="h-24 w-24 object-cover border rounded-md" />
        <button @click="removeFile(index + 1)" class="absolute top-0 left-0 text-red-500 m-1 bg-white rounded-full px-2 text-center flex items-center justify-center py-1 text-xs">x</button>
      </div>

      <!-- Add More Image Box -->
      <div v-if="files.length < maxFiles" class="relative">
        <label class="cursor-pointer border-dashed border-black border-2 rounded-md w-24 h-24 flex justify-center items-center">
          <svg class="h-8 w-8 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <input type="file" class="sr-only" @change="handleFileUpload" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      maxFiles: 12, // Set max files to limit uploads
    };
  },
  methods: {
    handleFileUpload(event) {
      const uploadedFiles = event.target.files;
      Array.from(uploadedFiles).forEach((file) => {
        if (this.files.length < this.maxFiles) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.files.push({ preview: e.target.result });
          };
          reader.readAsDataURL(file);
        }
      });
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
img {
  border: 1px solid black;
}
.col-span-2 {
  grid-column: span 2 / span 2;
}
.row-span-2 {
  grid-row: span 2 / span 2;
}
button {
  position: absolute;
}
.col-span-2 button {
  top: 2;
  right: 2;
}
.row-span-2 button {
  top: 2;
  right: 2;
}
button:not(.col-span-2):not(.row-span-2) {
  top: 2;
  left: 0;
}
</style>
