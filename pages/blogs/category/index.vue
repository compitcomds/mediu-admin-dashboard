<template>
  <div class="mb-4 flex items-center justify-between">
    <h1 class="text-xl font-semibold md:text-2xl">Blog Categories</h1>
    <div class="flex flex-wrap items-center gap-x-2">
      <BlogCategoryForm
        title="Add Category"
        :on-category-submit="addCategory"
        :close-on-submit="true"
      >
        <button class="rounded-md bg-black px-6 py-2 text-white">
          Add Category
        </button>
      </BlogCategoryForm>
    </div>
  </div>
  <div
    class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
  >
    <BlogCategoryCard
      v-for="category in categories"
      :key="category.id"
      :title="category.title"
      :handle="category.handle"
      :id="category.id"
      :delete-category="deleteCategory"
      :update-category="updateCategory"
    />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { toast } from "vue-sonner";

const { data: categories } = await useLazyFetch("/api/articles/categories");

const addCategory = async (values: any) => {
  const { data: blogId } = await axios.post(
    "/api/articles/categories/create",
    values,
  );
  const blog = { ...values, id: blogId };
  if (categories.value) categories.value.push(blog);
  else categories.value = [blog];
};

const deleteCategory = async (id: string) => {
  try {
    await axios.delete(`/api/articles/categories/${id}`);
    categories.value = categories.value?.filter((cat) => cat.id !== id) || [];
  } catch (error: any) {
    toast.error(
      error.statusText ||
        error.message ||
        "Unable to delete the category. Please try agian later.",
      { richColors: true },
    );
  }
};

const updateCategory = async (id: string, values: any) => {
  await axios.put(`/api/articles/categories/${id}`, values);
  const index = categories.value?.findIndex((category) => category.id === id);
  if (index !== undefined && index !== -1 && categories.value) {
    categories.value[index] = { id, ...values };
  }
};
</script>
