<template>
  <div
    class="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0"
  >
    <h1 class="text-xl md:text-2xl font-semibold">Collections</h1>
    <nuxt-link
      class="bg-black text-white px-2 md:px-3 py-1.5 rounded-md lg:ml-4 hover:bg-black/80"
      to="collections/create"
      >Create New Collection</nuxt-link
    >
  </div>

  <Table>
    <TableCaption>A list of all the collections.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]"> Image </TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Description</TableHead>
        <TableHead> * </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="collection in collections" :key="collection.id">
        <TableCell>
          <nuxt-link :to="`/collections/edit/${collection.handle}`">
            <img
              :src="
                collection.image?.url ||
                'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
              "
              :alt="collection.image?.altText || collection.title"
              class="w-16 h-16 mr-4 rounded"
            />
          </nuxt-link>
        </TableCell>
        <TableCell
          ><nuxt-link
            :to="`/collections/edit/${collection.handle}`"
            class="hover:underline"
            >{{ collection.title }}</nuxt-link
          ></TableCell
        >
        <TableCell>{{ collection.description }}</TableCell>
        <TableCell>
          <nuxt-link
            :to="`/collections/edit/${collection.handle}`"
            class="bg-black text-white rounded-lg px-4 py-2 hover:bg-black/80"
            >Edit</nuxt-link
          >
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const collections = ref<
  {
    id: string;
    handle: string;
    title: string;
    isBrandCollection: boolean;
    productsCount: number;
    description: string;
    image?: { url: string; altText?: string | null } | null;
  }[]
>([]);

onMounted(async () => {
  await fetchCollections();
});

const fetchCollections = async () => {
  try {
    const { data } = await axios.get("/api/collections/all");
    collections.value = data.collections;
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};
</script>

<style scoped>
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
