<template>
  <div
    class="mb-4 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0"
  >
    <h1 class="text-xl font-semibold md:text-2xl">Collections</h1>
    <nuxt-link
      class="rounded-md bg-black px-2 py-1.5 text-white hover:bg-black/80 md:px-3 lg:ml-4"
      to="collections/create"
      >Create New Collection</nuxt-link
    >
  </div>

  <div
    class="mb-4 flex items-center justify-between rounded bg-white p-2 shadow"
  >
    <div class="flex gap-x-4">
      <template v-for="filter in availableFilterList">
        <button
          @click="setFilter(filter)"
          class="px-4 py-2 capitalize hover:border-b-2 hover:border-gray-300"
          :class="{
            'border-b-2 border-b-gray-700 hover:border-gray-700':
              filter === activeFilter,
          }"
        >
          {{ filter.replace("-", " ") }}
        </button>
      </template>
    </div>
    <Search id="collection-search" placeholder="Searching all collections" />
  </div>

  <Table>
    <TableCaption class="sr-only">A list of all the collections.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]"> Image </TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Description</TableHead>
        <TableHead> * </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-for="collection in collections" :key="collection.id">
        <TableRow v-if="checkCollection(collection)">
          <TableCell>
            <nuxt-link :to="`/collections/edit/${collection.handle}`">
              <img
                :src="
                  collection.image?.url ||
                  'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                "
                :alt="collection.image?.altText || collection.title"
                class="mr-4 h-16 w-16 rounded"
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
              class="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/80"
              >Edit</nuxt-link
            >
          </TableCell>
        </TableRow>
      </template>
    </TableBody>
  </Table>
  <PaginationButtons :pageInfo="pageInfo" />
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

const route = useRoute();

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

const pageInfo = ref<{
  endCursor: string;
  hasNextPage: boolean;
  startCursor: string;
  hasPreviousPage: boolean;
}>({
  endCursor: "",
  startCursor: "",
  hasNextPage: false,
  hasPreviousPage: false,
});

const availableFilterList = ["all", "brands", "non-brands"] as const;

const activeFilter = ref<(typeof availableFilterList)[number]>("all");

const fetchCollections = async ({
  after,
  before,
  query,
}: {
  after?: string;
  before?: string;
  query?: string;
}) => {
  try {
    const { data } = await axios.get(
      `/api/collections/all?after=${after || ""}&before=${before || ""}&query=${
        query || ""
      }`,
    );
    collections.value = data.collections;
    pageInfo.value = data.pageInfo;
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};

const setFilter = (newFilter: typeof activeFilter.value) => {
  activeFilter.value = newFilter;
};

const checkCollection = (collection: any): boolean => {
  const active = activeFilter.value;
  if (active === "all") return true;
  if (active === "brands" && collection.isBrandCollection) return true;
  if (active === "non-brands" && !collection.isBrandCollection) return true;
  return false;
};

watch(
  () => route.query,
  (newQuery) => {
    fetchCollections({
      after: newQuery.after?.toString(),
      before: newQuery.before?.toString(),
      query: newQuery.query?.toString(),
    });
  },
  {
    deep: true,
    immediate: true,
  },
);

useHead({
  title: "Collections",
});
</script>

<style scoped></style>
