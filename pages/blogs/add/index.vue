<template>
  <BlogForm :onSubmit="onSubmit" />
</template>

<script setup lang="ts">
import axios from "axios";

const router = useRouter();

const onSubmit = async (values: any) => {
  console.log(values);
  const { data } = await axios.post("/api/articles/create", {
    article: values,
  });
  router.replace(`/blogs/${data?.id || ""}`);
};
</script>
