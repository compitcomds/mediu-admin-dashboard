<template>
  <div class="mb-4 flex items-center justify-between">
    <h1 class="text-xl font-semibold md:text-2xl">Products</h1>
    <div class="flex flex-wrap items-center gap-x-2">
      <Search id="blog-search" placeholder="Searching all blogs" />
      <nuxt-link
        class="flex items-center gap-2 rounded-md bg-black px-2 py-1.5 text-white hover:bg-black/70 md:px-3 lg:ml-4"
        to="/blogs/add"
      >
        <span class="hidden md:block">Add New Blog</span>
        <span class=""><PlusCircle /></span>
      </nuxt-link>
    </div>
  </div>

  <DataTable :columns="columns" :data="articles" />
  <PaginationButtons :pageInfo="pageInfo" />
</template>

<script setup lang="ts">
import { PlusCircle } from "lucide-vue-next";
import DataTable from "~/components/ui/data-table.vue";
import { columns } from "./columns";
import axios from "axios";

const route = computed(() => useRoute());

const articles = ref<any[]>([]);
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

const fetchArticles = async ({
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
      `/api/articles?after=${after || ""}&before=${before || ""}&query=${
        query || ""
      }`,
    );
    articles.value = data.articles;
    pageInfo.value = data.pageInfo;
  } catch (e: any) {
    alert(e.message);
  }
};

watch(
  () => route.value.query,
  (newQuery) => {
    fetchArticles({
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
  title: "All Blogs",
});
</script>
