<template>
  <div class="bg-white p-6 rounded-xl shadow-md">
    <!-- Search Engine Listing -->
    <div>
      <!-- Compact View -->
      <div v-if="!isEditing" class="p-4 rounded-lg border border-gray-300 flex justify-between items-center">
        <div>
          <h3 class="text-lg font-semibold">Search engine listing</h3>
          <p class="text-gray-500">Add a title and description to see how this product might appear in a search engine listing</p>
        </div>
        <button @click="toggleEdit" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil w-6 h-6"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
        </button>
      </div>

      <!-- Expanded View -->
      <div v-else class="bg-gray-50 p-4 rounded-lg border">
        <h3 class="text-lg font-semibold mb-2">Search engine listing</h3>
        <label class="block text-sm font-medium text-gray-700">Page title</label>
        <input v-model="pageTitle" type="text"
          class="mt-1 block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Page title" />
        <p class="text-sm text-gray-500 mt-1">{{ pageTitle.length }} of 70 characters used</p>

        <label class="block text-sm font-medium text-gray-700 mt-4">Meta description</label>
        <textarea v-model="metaDescription"
          class="mt-1 block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          rows="2" placeholder="Meta description"></textarea>
        <p class="text-sm text-gray-500 mt-1">{{ metaDescription.length }} of 320 characters used</p>

        <label class="block text-sm font-medium text-gray-700 mt-4">URL handle</label>
        <div class="mt-1 block w-full border p-3 border-gray-300 rounded-md bg-gray-100 text-gray-700">
          {{ urlHandle }}
        </div>

        <div class="flex justify-end mt-4">
          <button @click="saveChanges" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save</button>
          <button @click="toggleEdit" class="ml-2 bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false,        // Control the edit mode
      pageTitle: '',           // SEO page title
      metaDescription: '',     // SEO meta description
      urlHandle: 'https://dev-mediu.myshopify.com/products/' // URL handle, permanent and uneditable
    };
  },
  methods: {
    // Toggle the edit mode
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
    // Save the changes (you can add further functionality here)
    saveChanges() {
      this.isEditing = false;
      console.log(`Page Title: ${this.pageTitle}`);
      console.log(`Meta Description: ${this.metaDescription}`);
      console.log(`URL Handle: ${this.urlHandle}`);
    }
  }
};
</script>

<style scoped>
/* Optional styles */
</style>
