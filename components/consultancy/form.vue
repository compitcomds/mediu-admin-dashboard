<template>
  <form @submit.prevent="">
    <div class="flex flex-col gap-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Consultancy Title <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="title"
          v-model="service.title"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          required
        />
      </div>
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700"
          >Price <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="price"
          v-model.number="service.price"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          required
        />
      </div>
      <div>
        <p class="block text-sm font-medium text-gray-700">
          Tags <span class="text-red-500">*</span>
        </p>
        <ConsultancyTags v-model="service.tags" />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const service = ref<{
  title: string;
  descriptionHtml: string;
  image?: string;
  price: number;
  tags: string[];
}>({
  title: "",
  descriptionHtml: "",
  price: 0,
  tags: [],
});
</script>
