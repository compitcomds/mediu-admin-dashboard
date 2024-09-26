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

      <!-- Collection Edit Form -->
      <form
        @submit.prevent="updateCollection"
        class="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            v-model="collection.title"
            type="text"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            v-model="collection.body_html"
            class="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>

        <!-- Image -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Image</label>
          <div class="flex items-center space-x-4">
            <img
              :src="collection.image?.src || '/default-image.jpg'"
              alt="Collection Image"
              class="w-20 h-20 rounded"
            />
            <input type="file" @change="handleImageUpload" />
          </div>
        </div>

        <!-- Associated Products -->
        <!-- <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Products</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="product in products"
              :key="product.id"
              class="flex items-center p-2 border border-gray-300 rounded space-x-2"
            >
              <input
                type="checkbox"
                :value="product.id"
                v-model="selectedProducts"
                class="form-checkbox h-5 w-5 text-blue-600"
              />
              <p>{{ product.title }}</p>
            </div>
          </div>
        </div> -->

        <!-- Update Button -->
        <div class="flex justify-end">
          <button type="submit" class="bg-black text-white px-4 py-2 rounded-md">
            Update Collection
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Sidenav from "~/components/Sidenav";
import NavigationButton from "~/components/NavigationButton";
import axios from "axios";

export default {
  components: {
    Sidenav,
    NavigationButton,
  },
  data() {
    return {
      collection: {
        title: "",
        body_html: "",
        image: null,
        products: [],
      },
      products: [], // List of all products to choose from
      selectedProducts: [], // Selected products in this collection
    };
  },
  async mounted() {
    const collectionId = this.$route.params.id; // Get the collection ID from the route parameters
    await this.fetchCollection(collectionId);
    await this.fetchProducts();
  },
  methods: {
    async fetchCollection(id) {
      try {
        const response = await axios.get(`/api/collections/${id}`);
        this.collection = response.data;
        this.selectedProducts = this.collection.products.map((product) => product.id); // Populate selected products
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get(`/api/products`); // Fetch all products
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.collection.image = URL.createObjectURL(file); // Preview the image
      this.uploadImage(file); // Optionally, upload the image to your server
    },
    async uploadImage(file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(`/api/upload-image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data && response.data.url) {
          this.collection.image = { src: response.data.url }; // Ensure image object is structured correctly
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
    async updateCollection() {
      if (!this.collection.title || !this.collection.body_html) {
        console.error("Title and body_html are required");
        return;
      }

      try {
        console.log("Updating collection ID:", this.collection.id); // Log the ID

        // Update the collection with the selected products
        const updatedCollection = {
          title: this.collection.title,
          body_html: this.collection.body_html,
          image: this.collection.image?.src,
          products: this.selectedProducts,
          published: true,
        };

        const response = await axios.put(
          `/api/collections/${this.collection.id}`,
          updatedCollection
        );
        console.log("Collection updated:", response.data);
        this.$router.push("/collections"); // Redirect after successful update
      } catch (error) {
        console.error(
          "Error updating collection:",
          error.response?.data || error.message
        ); // Log detailed error
      }
    },

    goBack() {
      this.$router.push("/collections");
    },
  },
};
</script>

<style scoped>
/* Additional styles to enhance form appearance */
form {
  max-width: 800px;
  margin: 0 auto;
}
</style>
