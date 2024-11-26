<template>
  <div
    class="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0"
  >
    <h1 class="text-xl md:text-2xl font-semibold">Collections</h1>
    <nuxt-link
      class="bg-black text-white px-2 md:px-3 py-1.5 rounded-md lg:ml-4"
      to="collections/create"
      >Create New Collection</nuxt-link
    >
  </div>

  <!-- Responsive Table for Large Screens -->
  <div class="overflow-x-auto bg-white shadow-md rounded-lg w-full h-full">
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
            Image
          </th>
          <th
            class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Title
          </th>
          <th
            class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Description
          </th>
          <th
            class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            *
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="collection in collections"
          :key="collection.id"
          class="hover:bg-gray-100"
        >
          <td class="px-4 py-4 whitespace-nowrap">
            <input type="checkbox" />
          </td>
          <td class="px-4 py-4 break-words whitespace-normal">
            <nuxt-link :to="`/collections/edit/${collection.handle}`">
              <img
                :src="
                  collection.image?.src ||
                  'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                "
                alt="Collection Image"
                class="w-16 h-16 mr-4 rounded"
              />
            </nuxt-link>
          </td>
          <td class="px-4 py-4 break-words whitespace-normal">
            <nuxt-link :to="`/collections/edit/${collection.handle}`">{{
              collection.title
            }}</nuxt-link>
          </td>
          <td class="px-4 py-4 break-words whitespace-normal">
            {{ collection.body_html }}
          </td>
          <td>
            <nuxt-link
              :to="`/collections/edit/${collection.handle}`"
              class="bg-black text-white rounded-lg px-4 py-2"
              >Edit</nuxt-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

const collections = ref<
  {
    id: number;
    title: string;
    body_html: string;
    image: any;
    handle: string;
  }[]
>([]);

onMounted(async () => {
  await fetchCollections();
});

const fetchCollections = async () => {
  try {
    const response = await axios.get("/api/collections");
    collections.value = response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
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
