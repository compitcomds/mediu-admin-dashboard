<template>
  <div class="flex items-center">
    <div
      v-if="searchVisible || searchQuery"
      class="flex items-center rounded-lg bg-gray-100"
    >
      <div class="relative">
        <input
          v-model="searchQuery"
          :id="searchid"
          type="text"
          :placeholder="placeholder || 'Search'"
          class="w-24 border bg-white px-4 py-2 pl-7 text-sm focus:outline md:w-48 lg:w-64"
          @input="performSearch"
        />
        <Search
          class="absolute left-2 top-1/2 w-4 -translate-y-1/2 text-gray-500"
        />
        <button
          @click="clearSearch"
          class="absolute right-2 top-1/2 ml-2 -translate-y-1/2 text-gray-500 hover:text-black"
        >
          <X class="w-5" />
        </button>
      </div>
    </div>
    <button
      v-else
      @click="toggleSearch"
      class="rounded-lg bg-gray-200 p-2 text-gray-500 hover:text-black focus:outline-none"
    >
      <Search />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Search, X } from "lucide-vue-next";

const props = defineProps<{
  pathToRedirect?: string;
  placeholder?: string;
  id?: string;
}>();

const route = useRoute();
const searchVisible = ref(false);
const searchQuery = ref(route.query.query || "");

const searchid =
  props.id || `search-input-${Math.random().toString(36).substring(2, 15)}`;

const toggleSearch = () => {
  searchVisible.value = !searchVisible.value;
  if (!searchVisible.value) {
    searchQuery.value = "";
  }

  nextTick(() => {
    if (searchVisible.value) {
      document.getElementById(searchid)?.focus();
    }
  });
};

const performSearch = useDebounceFn(async () => {
  await navigateTo({
    path: props.pathToRedirect || route.path,
    query: { query: searchQuery.value || undefined },
  });
}, 1000);

const clearSearch = async () => {
  searchQuery.value = "";
  searchVisible.value = false;
  await navigateTo({
    path: props.pathToRedirect || route.path,
    query: { query: undefined },
  });
};
</script>
