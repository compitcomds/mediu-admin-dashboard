<template>
  <div class="flex items-center gap-5 my-5 justify-center">
    <nuxt-link
      v-if="pageInfo.hasPreviousPage"
      :to="{
        query: {
          ...route.query,
          before: pageInfo.startCursor || '',
          after: undefined,
        },
      }"
      class="py-3 px-8 rounded-lg hover:bg-gray-200"
      >Previous</nuxt-link
    >
    <button
      v-else
      class="py-3 px-8 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
      disabled
    >
      Previous
    </button>
    <nuxt-link
      class="py-3 px-8 rounded-lg hover:bg-gray-200"
      v-if="pageInfo.hasNextPage"
      :to="{
        query: {
          ...route.query,
          before: undefined,
          after: pageInfo.endCursor || '',
        },
      }"
      >Next</nuxt-link
    >
    <button
      v-else
      class="py-3 px-8 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
      disabled
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { pageInfo } = defineProps<{
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    startCursor: string;
    hasPreviousPage: boolean;
  };
}>();
</script>
