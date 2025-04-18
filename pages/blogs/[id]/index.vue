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
    />
  </template>
</template>

<script setup lang="ts">
import axios from "axios";

const route = useRoute();
const router = useRouter();

const params = route.params.id;
const blogId = Array.isArray(params) ? params[0] : params;

const { data: article } = await axios.get(`/api/articles/${blogId}`);

const editArticle = async (values: any) => {
  await axios.put(`/api/articles/${blogId}`, { article: values });
};

const deleteArticle = async () => {
  await axios.delete(`/api/articles/${blogId}`);
  alert("Successfully deleted the article.");
  router.replace("/blogs");
};
</script>
