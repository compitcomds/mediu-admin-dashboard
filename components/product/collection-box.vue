<template>
  <div class="select-container">
    <!-- Label for the select box -->
    <label for="collection-select" class="select-label">Manage Collections:</label>

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

    <!-- Display the currently selected collections -->
    <div class="selected-collections">
      <h4>Selected Collections</h4>
      <ul>
        <li v-for="collection in selectedCollectionsModel" :key="collection.id" class="collection-item">
          {{ collection.title }}
          <button class="remove-btn" @click="removeCollection(collection.id)">
            ✖
          </button>
        </li>
      </ul>
    </div>
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
  
  margin: 30px auto;
  padding: 20px;
  background-color: #f7fafc;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.select-label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 12px;
}

.select-box {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #fff;
  font-size: 16px;
  color: #2d3748;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.select-box:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px #fff;
}

.selected-collections {
  margin-top: 30px;
}

.selected-collections h4 {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 15px;
  text-align: center;
}

.collection-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #edf2f7;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.remove-btn {
  background-color: #e53e3e;
  color: white;
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-btn:hover {
  background-color: #c53030;
}
</style>
