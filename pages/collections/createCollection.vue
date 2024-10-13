<template>
  <div class="flex flex-col lg:flex-row h-screen">
    <!-- Sidebar for lg and xl -->
    <Sidenav />

    <!-- Mobile Sidebar Toggle Button -->
    <button
      class="lg:hidden p-4 fixed z-20 top-2 left-2 bg-gray-800 text-white rounded-md"
      @click="toggleSidebar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>

    <!-- Sidebar for Mobile -->
    <Sidenav
      v-if="sidebarVisible"
      class="lg:hidden fixed z-30 inset-y-0 left-0 bg-white shadow-md w-64"
      @close="toggleSidebar"
    />

    <div
      class="lg:ml-64 flex-1 overflow-y-auto p-4 mt-10 bg-gray-100 md:p-8 lg:mt-10"
    >
      <NavigationButton />

      <!-- Header Section -->
      <CollectionsHeader class="mb-6" />

      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <!-- Main Form Section -->
        <div class="w-full lg:w-2/3 mb-6 lg:mb-0">
          <h2 class="text-xl font-semibold mb-4">Create Collection</h2>
          <form @submit.prevent="createCollection">
            <div class="mb-4">
              <label class="block text-gray-700">Title</label>
              {{ newCollection.title }}
              <input
                type="text"
                v-model="newCollection.title"
                class="w-full p-2 border rounded"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Description</label>
              <textarea
                v-model="newCollection.body_html"
                class="w-full p-2 border rounded"
                required
              ></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Image</label>
              <input type="file" @change="onImageSelected" />
              <img
                v-if="collectionImage.image"
                :src="collectionImage.preview"
                class="mt-2 w-32 h-32 object-cover"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Select Products</label>
              <div
                v-for="product in products"
                :key="product.id"
                class="flex items-center mb-2"
              >
                <input
                  type="checkbox"
                  :value="{ product_id: product.id }"
                  v-model="newCollection.collects"
                  class="mr-2"
                />
                <span>{{ product.title }}</span>
              </div>
            </div>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Create Collection
            </button>
          </form>
        </div>

        <!-- Additional Details Section (Placeholder) -->
        <div class="w-full lg:w-1/3">
          <!-- Placeholder for additional details section -->
          <CollectionsAdditionalDetails />

          {{ newCollection }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import Sidenav from "~/components/Sidenav";
// import NavigationButton from "~/components/NavigationButton";
// import CollectionsHeader from "~/components/CollectionsHeader";
// import CollectionsAdditionalDetails from "~/components/CollectionsAdditionalDetails";

export default {
  data() {
    return {
      collections: [],
      products: [],
      newCollection: {
        title: "",
        body_html: "",
        collects: [],
      },
      collectionImage: { image: null, preview: null },
      sidebarVisible: false,
    };
  },
  async mounted() {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    if (!true) {
      // Redirect to login page if not authenticated
      this.$router.push("/login");
    } else {
      await this.fetchCollections();
      await this.fetchProducts(); // Fetch products on mount
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    async fetchCollections() {
      try {
        const response = await axios.get("/api/collections");
        this.collections = response.data;
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get("/api/products");
        this.products = response.data.products; // Assuming API returns a products array
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    onImageSelected(event) {
      const file = event.target.files[0];
      if (file) {
        this.collectionImage.image = file;
        this.collectionImage.preview = URL.createObjectURL(file);
      }
    },
    async createCollection() {
      try {
        const { title, body_html, collects } = this.newCollection; // Collects should be directly from newCollection

        let image = null;
        if (this.collectionImage.image)
          image = {
            attachment: (
              await convertFileToBase64(this.collectionImage.image)
            ).split(",")[1],
          };

        // Construct the payload as per the valid format
        const newCollection = {
          custom_collection: {
            title,
            body_html,
            collects, // This should be an array of objects like [{ product_id: 123 }]
            image,
          },
        };

        const response = await axios.post(
          "/api/create-collections",
          newCollection
        );

        // Check if the response has the expected format
        if (response.data && response.data.custom_collection) {
          this.collections.push(response.data.custom_collection);
          alert("Successfully created the collection");
          this.newCollection = {
            title: "",
            body_html: "",
            image: null,
            collects: [],
          };
        } else {
          throw new Error(
            response.statusText || "Succes"
          );
        }
      } catch (error) {
        alert(error.message);
        console.error("Sucess:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* Add any additional styles if necessary */
</style>
