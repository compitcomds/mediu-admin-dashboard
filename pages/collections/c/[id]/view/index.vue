<template>
  <h2 class="mb-4 text-xl font-bold lg:text-3xl">
    View Collection #{{ collection?.id || handle }}
  </h2>

  <div v-if="error" class="text-center">
    <p class="mb-2 text-red-500">{{ error }}</p>
    <nuxt-link
      :to="'/collections'"
      class="text-[#28574e] underline hover:no-underline"
      >Go To All Collections</nuxt-link
    >
  </div>

  <div v-else>
    <form v-if="collection" class="flex flex-col gap-5 lg:flex-row">
      <div class="flex flex-1 flex-col gap-y-4">
        <div>
          <label class="block text-gray-700">Title</label>
          <input
            type="text"
            v-model="collection.title"
            class="w-full rounded border p-2"
            required
            :disabled="!!disabledForm"
          />
        </div>
        <div>
          <label class="block text-gray-700">Description</label>
          <textarea
            v-model="collection.descriptionHtml"
            class="w-full rounded border p-2"
            required
            rows="10"
            :disabled="!!disabledForm"
          ></textarea>
        </div>
        <div>
          <CollectionProductSelect
            v-model:products="collection.products"
            :is-collection-brand="collection.metafields.isBrandCollection"
            :disabled-form="!!disabledForm"
          />
        </div>
      </div>
      <div class="lg:w-full lg:max-w-xs">
        <CollectionImagePicker
          @update:image="handleImageUpdate"
          :default-preview="fetchedCollection?.image?.url"
          :disabled-form="!!disabledForm"
        />
        <div class="mb-4">
          <label class="block text-gray-700">Collection is a brand?</label>
          <Switch
            :checked="collection.metafields.isBrandCollection"
            @update:checked="toggleBrandCollection"
            :disabled="!!disabledForm"
          />
        </div>
      </div>
    </form>

    <div v-else class="text-center text-gray-500">
      <p>No collection selected. Please select a collection to edit.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

const disabledForm = true;

const route = useRoute();
const handle = route.params.id;
const error = ref<string | null>(null); // Error state

const collectionImage = ref<File | null>(null);
const fetchedCollection = ref<{
  title: string;
  image: any;
  isBrandCollection: boolean;
  productsCount: number;
  descriptionHtml: string;
  id: string;
  metafields: Record<string, any>;
  products: Array<{ product_id: string }>;
} | null>(null);

const collection = ref<{
  title: string;
  image: any;
  isBrandCollection: boolean;
  productsCount: number;
  descriptionHtml: string;
  id: string;
  metafields: Record<string, any>;
  products: Array<{ product_id: string }>;
} | null>(null);

const handleImageUpdate = (image: File) => {
  collectionImage.value = image;
};

const fetchCollection = async () => {
  error.value = null;
  try {
    const { data } = await axios.get(`/api/collections/${handle}`);
    collection.value = { ...data };
    fetchedCollection.value = { ...data };
  } catch (err: any) {
    console.log(err);
    error.value = `Failed to fetch collection: ${err.message}`;
  }
};

const toggleBrandCollection = () => {
  if (!collection.value) return;
  collection.value.metafields.isBrandCollection =
    !collection.value.metafields.isBrandCollection;
};

onMounted(async () => {
  await fetchCollection();
});

useHead({
  title: `Collection | ${fetchedCollection.value?.title || handle}`,
});
</script>
