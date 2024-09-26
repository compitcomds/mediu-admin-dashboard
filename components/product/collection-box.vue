<template>
  <div class="select-container">
    <!-- Display the currently selected collections -->
    <div class="selected-collections">
      <h4>Selected Collections</h4>
      <ul>
        <li v-for="collection in selectedCollectionsModel" :key="collection.id">
          {{ collection.title }}
          <button class="remove-btn" @click="removeCollection(collection.id)">
            Remove
          </button>
        </li>
      </ul>
    </div>

    <!-- Label for the select box -->
    <label for="collection-select" class="select-label"
      >Manage Collections:</label
    >

    <!-- Select box to toggle collections -->
    <select
      id="collection-select"
      v-model="selectedCollection"
      class="select-box"
      @change="toggleCollection(selectedCollection)"
    >
      <option value="" disabled>Select a collection</option>
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
// Import necessary functions from Vue
import { ref, onMounted } from "vue";

// Define the interface for collection data
interface ShopifyCollection {
  id: number;
  title: string;
}

// Fetch collections from an API and store in a reactive ref
const collections = ref<ShopifyCollection[]>([]);

// Define a model with defineModel (two-way binding for selected collections)
const selectedCollectionsModel = defineModel<ShopifyCollection[]>(
  "modelValue",
  {
    required: true,
    default: () => [],
  }
);
// Reactive state for the select box value (for toggling collections)
const selectedCollection = ref<number | null>(null);

// Fetch collections from API on component mount
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

<style scoped>
.select-container {
  max-width: 400px;
  margin: 20px 0;
}

.select-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 8px;
}

.select-box {
  width: 100%;
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  background-color: #fff;
  font-size: 14px;
  color: #2d3748;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.select-box:focus {
  border-color: #5a67d8;
  box-shadow: 0 0 0 3px rgba(90, 103, 216, 0.3);
}

.selected-collections {
  margin-top: 20px;
}

.remove-btn {
  background-color: #e53e3e;
  color: white;
  padding: 4px 8px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
