<template>
  <div class="flex flex-col h-screen py-10 lg:py-5">
    <!-- Sidebar -->
    <Sidenav />
    <div class="lg:ml-64 flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 mt-4 bg-gray-100">
      <NavigationButton />

      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl md:text-2xl font-semibold">Edit Collection</h1>
        <button @click="goBack" class="bg-gray-200 px-3 py-1.5 rounded-md">Back</button>
      </div>

      <!-- Loading Message -->
      <div v-if="loading" class="text-center">
        <p>Loading collection...</p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="text-center text-red-500">
        <p>{{ error }}</p>
      </div>

      <!-- Collection Edit Form -->
      <form
        v-if="selectedCollection && selectedCollection.id"
        @submit.prevent="updateCollection"
        class="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            v-model="selectedCollection.title"
            type="text"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            v-model="selectedCollection.body_html"
            class="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>

        <!-- Update Button -->
        <div class="flex justify-end">
          <button type="submit" class="bg-black text-white px-4 py-2 rounded-md">
            Update Collection
          </button>
        </div>
      </form>

      <!-- No Collection Selected Message -->
      <div v-else class="text-center text-gray-500">
        <p>No collection selected. Please select a collection to edit.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedCollection: {
        id: '',
        title: '',
        body_html: ''
      },
      loading: false, // Loading state for fetching collections
      error: null // Error state
    };
  },

  async mounted() {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    if (!true) {
      // Redirect to login page if not authenticated
      this.$router.push('/login');
    } else {
      await this.fetchCollection();
    }
  },

  methods: {
    // Fetch the collection by ID from the URL
    async fetchCollection() {
      this.loading = true;
      this.error = null;

      try {
        const collectionId = this.$route.params.id;
        const response = await axios.get(`/api/collections/${collectionId}`); // Use API endpoint correctly

        if (response.data) {
          this.selectedCollection = { ...response.data };
        } else {
          throw new Error("Collection not found");
        }
      } catch (error) {
        this.error = `Failed to fetch collection: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },

    // Update the selected collection with the new data
    async updateCollection() {
      try {
        if (!this.selectedCollection.id) {
          throw new Error("No collection ID found");
        }

        const updatedCollection = {
          title: this.selectedCollection.title,
          body_html: this.selectedCollection.body_html,
          published: true
        };

        const response = await axios.put(
          `/api/collections/${this.selectedCollection.id}`,
          updatedCollection
        );

        alert("Collection updated successfully!");

      } catch (error) {
        this.error = `Failed to update collection: ${error.message}`;
      }
    },

    // Navigate back to the previous page
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
