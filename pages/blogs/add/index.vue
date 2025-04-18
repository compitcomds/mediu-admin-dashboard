<template>
  <BlogForm :onSubmit="onSubmit" />
</template>

<script setup lang="ts">
import axios from "axios";

const onSubmit = async (values: any) => {
  const { data } = await axios.post("/api/articles/create", {
    article: values,
  });
};
</script>
