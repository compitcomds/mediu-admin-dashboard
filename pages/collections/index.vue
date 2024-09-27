<template>
  <div class="flex flex-col h-screen py-10 lg:py-5">
    <!-- Sidebar -->
    <Sidenav />
    <div class="lg:ml-64 flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 mt-4 bg-gray-100">
      <NavigationButton />

      <!-- Header Buttons -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h1 class="text-xl md:text-2xl font-semibold">Collections</h1>
        <!-- <nuxt-link
          to="/collections/createCollection"
          class="bg-black text-white px-2 md:px-3 py-1.5 rounded-md lg:ml-4"
        >
          Create Collection
        </nuxt-link> -->
        <!-- <button class="bg-black text-white px-2 md:px-3 py-1.5 rounded-md lg:ml-4" @click="createCollection">Create New
          Collection</button> -->
          <nuxt-link class="bg-black text-white px-2 md:px-3 py-1.5 rounded-md lg:ml-4" to="collections/createCollection">Create New
            Collection</nuxt-link>
      </div>

      <FilterBarCollections @changeTab="setTab" />

      <!-- Responsive Collection Cards for Small and Medium Screens -->
      <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:hidden">
        <div v-for="(collection, index) in filteredCollections" :key="collection.id"
          class="bg-white p-4 rounded-lg shadow-md space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img :src="collection.image?.src || '/default-image.jpg'" alt="Collection Image"
                class="w-16 h-16 mr-4 rounded" />
              <div>
                <p class="text-lg font-semibold">{{ collection.title }}</p>
                <p class="text-sm text-gray-500">{{ collection.body_html }}</p>
              </div>
            </div>
            <input type="checkbox" />
          </div>
          <div class="flex justify-end space-x-2">
            <button @click="selectCollection(collection)" class="bg-gray-200 text-sm px-3 py-1 rounded-md">
              Edit
            </button>
            <button @click="deleteCollection(collection.id)" class="bg-red-500 text-white text-sm px-3 py-1 rounded-md">
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Responsive Table for Large Screens -->
      <div class="hidden lg:block overflow-x-auto bg-white shadow-md rounded-lg w-full h-full">
        <table class="min-w-full table-auto divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" />
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(collection, index) in filteredCollections" :key="collection.id" class="hover:bg-gray-100">
              <td class="px-4 py-4 whitespace-nowrap">
                <input type="checkbox" />
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                <img :src="collection.image?.src || 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'" alt="Collection Image"
                  class="w-16 h-16 mr-4 rounded" />
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                <p class="hover:underline">{{ collection.title }}</p>
              </td>
              <td class="px-4 py-4 break-words whitespace-normal">
                {{ collection.body_html }}
              </td>
            </tr>
          </tbody>
        </table>
        <!-- {{ collections[0] }} -->
      </div>
    </div>
  </div>
</template>

<script>
import FilterBarCollections from "~/components/FilterBarCollections"; // Assuming the component is named FilterBarCollections
import Sidenav from "~/components/Sidenav";
import NavigationButton from "~/components/NavigationButton";
import axios from "axios";

export default {
  components: {
    FilterBarCollections,
    Sidenav,
    NavigationButton,
  },
  data() {
    return {
      collections: [],
      activeTab: "All",
      selectedCollection: null,
    };
  },
  async mounted() {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    if (!true) {
      // Redirect to login page if not authenticated
      this.$router.push("/login");
    } else {
      await this.fetchCollections();
    }
  },
  computed: {
    filteredCollections() {
      return this.collections; // Return all collections without filtering
    },
  },
  methods: {
    setTab(tab) {
      this.activeTab = tab;
    },
    async fetchCollections() {
      try {
        const response = await axios.get("/api/collections");
        this.collections = response.data;
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    },
    async deleteCollection(id) {
      try {
        await axios.delete(`/api/collections/${id}`);
        this.collections = this.collections.filter((collection) => collection.id !== id);
      } catch (error) {
        console.error("Error deleting collection:", error);
      }
    },
    selectCollection(collection) {
      this.selectedCollection = { ...collection };
      this.$router.push(`/collections/edit/${collection.id}`); // Redirect to edit page
    },
    cancelEdit() {
      this.selectedCollection = null;
    },
    async createCollection() {
      try {
        const newCollection = {
          title: "New Collection",
          body_html: "Description of the new collection",
        };

        const response = await axios.post("/api/create-collections", newCollection);

        if (response.data && response.data.id) {
          this.collections.push(response.data);
          console.log("Collection created:", response.data);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error creating collection:", error);
      }
    },
    async updateCollection() {
      try {
        const updatedCollection = {
          title: this.selectedCollection.title,
          body_html: this.selectedCollection.body_html,
        };

        const response = await axios.put(
          `/api/collections/${this.selectedCollection.id}`,
          updatedCollection
        );

        const index = this.collections.findIndex(
          (col) => col.id === this.selectedCollection.id
        );
        if (index !== -1) {
          this.collections.splice(index, 1, response.data);
        }

        console.log("Collection updated:", response.data);
        this.selectedCollection = null;
      } catch (error) {
        console.error("Error updating collection:", error);
      }
    },
  },
};
</script>


<style scoped>
/* Responsive grid layout for small and medium screens */
.grid {
  display: grid;
  grid-template-columns: 1fr;
}

/* Styles for larger screens */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    display: none;
    /* Hide the grid layout on large screens */
  }
}

/* Scrollable table container for large screens */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
}
</style>
