<template>
  <div class="flex flex-col h-screen py-10 lg:py-5">
    <!-- Sidebar -->
    <Sidenav />
    <div class="lg:ml-64 flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 mt-4 bg-gray-100">
      <NavigationButton />

      <!-- Header Buttons -->
      <div
        class="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0"
      >
        <h1 class="text-xl md:text-2xl font-semibold">Products</h1>
        <nuxt-link
          to="/createCollection"
          class="bg-black text-white px-2 md:px-3 py-1.5 rounded-md lg:ml-4"
        >
          Create Collection
        </nuxt-link>
      </div>

      <FilterBarCollections @changeTab="setTab" />

      <!-- Responsive Product Cards for Small and Medium Screens -->
      <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:hidden">
        <div
          v-for="(product, index) in filteredProducts"
          :key="product.id"
          class="bg-white p-4 rounded-lg shadow-md space-y-2"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img
                :src="product.image"
                alt="Product Image"
                class="w-16 h-16 mr-4 rounded"
              />
              <div>
                <p class="text-lg font-semibold">{{ product.name }}</p>
                <p class="text-sm text-gray-500">{{ product.desc }}</p>
              </div>
            </div>
            <input type="checkbox" />
          </div>
          <div class="text-sm text-gray-700 space-y-1">
            <p><strong>Inventory:</strong> {{ product.inventory }}</p>
            <p><strong>Vendor:</strong> {{ product.vendor }}</p>
          </div>
          <div class="flex justify-end space-x-2">
            <button class="bg-gray-200 text-sm px-3 py-1 rounded-md">Edit</button>
            <button class="bg-gray-200 text-sm px-3 py-1 rounded-md">Delete</button>
          </div>
        </div>
      </div>

      <!-- Responsive Table for Large Screens -->
      <div
        class="hidden lg:block overflow-x-auto bg-white shadow-md rounded-lg w-full h-full"
      >
        <table class="min-w-full table-auto divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <input type="checkbox" />
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>

              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Products
              </th>

              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product Conditions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(product, index) in filteredProducts"
              :key="product.id"
              class="hover:bg-gray-100"
            >
              <td class="px-4 py-4 whitespace-nowrap">
                <input type="checkbox" />
              </td>
              <td class="px-4 py-4 break-words whitespace-normal relative group">
                <a :href="product.link" class="flex items-center hover:text-blue-600">
                  <img
                    :src="product.image"
                    alt="Product Image"
                    class="w-10 h-10 mr-3 rounded"
                  />
                  <div>
                    <p class="hover:underline">{{ product.name }}</p>
                    <div class="relative group inline-block">
                      {{ product.desc }}
                      <div
                        class="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute w-48 mt-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg py-2 z-10"
                      >
                        <p class="px-4 py-2">{{ product.hover }}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </td>

              <td class="px-4 py-4 break-words whitespace-normal">
                {{ product.inventory }}
              </td>

              <td class="px-4 py-4 break-words whitespace-normal">
                {{ product.vendor }}
              </td>
            </tr>
          </tbody>
        </table>
        
        {{collections }}
      </div>
    </div>
  </div>
 
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      collections: [],
      selectedCollection: null,
    };
  },
  // async mounted() {
  //   const isAuthenticated = localStorage.getItem('authenticated') === 'true';
  //   if (!isAuthenticated) {
  //     // Redirect to login page if not authenticated
  //     this.$router.push('/login');
  //   } else {
  //     await this.fetchCollections();
  //   }
  // },
  methods: {
    async fetchCollections() {
      try {
        const response = await axios.get("/api/collections");
        this.collections = response.data;
        console.log(this.collections)
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    },
    selectCollection(collection) {
      this.selectedCollection = { ...collection };
    },
    cancelEdit() {
      this.selectedCollection = null;
    },
    async createCollection() {
      try {
        const newCollection = {
          title: "New Collection",
          body_html: "Description of the new collection",
          published: true,
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
          published: true,
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
