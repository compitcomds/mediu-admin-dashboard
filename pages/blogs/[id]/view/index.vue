<template>
  <h1 v-if="!article" class="text-center text-2xl text-red-500">
    Article Not Found
  </h1>
  <template v-else>
    <BlogForm
      :title="`Edit Article #${blogId}`"
      :onSubmit="editArticle"
      :default-values="article"
      :onDelete="deleteArticle"
      :is-disabled="true"
    />
  </template>
</template>

<script setup lang="ts">
import axios from "axios";

const route = useRoute();

const params = route.params.id;
const blogId = Array.isArray(params) ? params[0] : params;

const { data: article } = await axios.get(`/api/articles/${blogId}`);

const editArticle = async (values: any) => {};

const deleteArticle = async () => {};
</script>
