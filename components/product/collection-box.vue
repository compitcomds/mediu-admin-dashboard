<template>
  <div class="bg-gray-100 rounded-lg">
    <label
      for="collection-select"
      class="block sr-only text-lg font-semibold text-gray-800 mb-3"
    >
      Manage Collections:
    </label>
    <div class="my-2">
      <ul class="flex items-center flex-wrap gap-3">
        <li
          v-for="collection in selectedCollectionsModel"
          :key="collection.id"
          class="flex justify-between items-center bg-gray-200 py-1 px-4 gap-2 rounded-xl"
        >
          {{ collection.title }}
          <button class="text-black" @click="removeCollection(collection.id)">
            <span class="sr-only">Remove collection</span>
            <X />
          </button>
        </li>
      </ul>
    </div>
    <select
      id="collection-select"
      v-model="selectedCollection"
      class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-blue-500"
      @change="toggleCollection(selectedCollection)"
      placeholder="Select a collection"
    >
      <option value="" disabled selected>Select a collection</option>
      <option
        v-for="collection in collections"
        :key="collection.id"
        :value="collection.id"
      >
        {{ collection.title }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { X } from "lucide-vue-next";

interface ShopifyCollection {
  id: number;
  title: string;
}

const collections = ref<ShopifyCollection[]>([]);

const selectedCollectionsModel = defineModel<ShopifyCollection[]>(
  "modelValue",
  {
    required: true,
    default: () => [],
  }
);
const selectedCollection = ref<number | null>(null);

const fetchCollections = async () => {
  try {
    const response = await fetch("/api/collections");
    const data: ShopifyCollection[] = await response.json();
    collections.value = data;
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};

// Run fetchCollections on mounted lifecycle
onMounted(fetchCollections);

// Toggle a collection (add if not present, remove if present)
const toggleCollection = (collectionId: number | null) => {
  if (!collectionId) return;

  // Find the collection from the collections list
  const collection = collections.value.find((c) => c.id === collectionId);
  if (!collection) return;

  // Check if the collection is already selected
  const isSelected = selectedCollectionsModel.value.some(
    (c) => c.id === collection.id
  );

  if (isSelected) {
    // If already selected, remove the collection
    selectedCollectionsModel.value = selectedCollectionsModel.value.filter(
      (c) => c.id !== collection.id
    );
  } else {
    // Otherwise, add the collection
    selectedCollectionsModel.value.push(collection);
  }

  // Reset the selected value
  selectedCollection.value = null;
};

// Remove a collection directly from the list
const removeCollection = (collectionId: number) => {
  selectedCollectionsModel.value = selectedCollectionsModel.value.filter(
    (c) => c.id !== collectionId
  );
};
</script>

<style scoped></style>
