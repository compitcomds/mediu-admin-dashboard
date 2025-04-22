<template>
  <div
    class="w-full rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-gray-300"
  >
    <div class="mb-3">
      <h3 class="mb-1 text-lg font-semibold text-gray-800">
        {{ props.title }}
      </h3>
      <p class="text-sm text-gray-500">{{ handle }}</p>
    </div>

    <div class="flex justify-end space-x-2">
      <BlogCategoryForm
        title="Update Category"
        :id="props.id"
        :default-values="{ title: title, handle: handle }"
        :on-category-submit="handleUpdate"
      >
        <button
          class="rounded border border-[#238878] px-3 py-1 text-sm text-[#238878]"
        >
          Update
        </button>
      </BlogCategoryForm>

      <button
        @click="handleDelete"
        :disabled="isDeleting"
        class="rounded bg-red-500 px-3 py-1 text-sm text-white transition-colors duration-200 hover:bg-red-600"
      >
        <span v-if="isDeleting">Deleting...</span>
        <span v-else>Delete</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  id: string;
  handle: string;
  deleteCategory: (id: string) => Promise<void>;
  updateCategory: (id: string, values: any) => Promise<void>;
}>();

const isDeleting = ref(false);

const handleDelete = async () => {
  isDeleting.value = true;
  await props.deleteCategory(props.id);
  isDeleting.value = false;
};

const handleUpdate = (values: any) => props.updateCategory(props.id, values);
</script>
