<template>
  <h2 class="mb-4 text-xl font-bold lg:text-3xl">
    Edit Collection #{{ collection?.id || handle }}
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
    <form
      v-if="collection"
      @submit.prevent="updateCollection"
      class="flex flex-col gap-5 lg:flex-row"
    >
      <div class="flex flex-1 flex-col gap-y-4">
        <div>
          <label class="block text-gray-700">Title</label>
          <input
            type="text"
            v-model="collection.title"
            class="w-full rounded border p-2"
            required
          />
        </div>
        <div>
          <label class="block text-gray-700">Description</label>
          <textarea
            v-model="collection.descriptionHtml"
            class="w-full rounded border p-2"
            required
            rows="10"
          ></textarea>
        </div>
        <div>
          <CollectionProductSelect
            v-model:products="collection.products"
            :is-collection-brand="collection.metafields.isBrandCollection"
          />
        </div>
      </div>
      <div class="lg:w-full lg:max-w-xs">
        <CollectionImagePicker
          @update:image="handleImageUpdate"
          :default-preview="fetchedCollection?.image?.url"
        />
        <div class="mb-4">
          <label class="block text-gray-700">Collection is a brand?</label>
          <Switch
            :checked="collection.metafields.isBrandCollection"
            @update:checked="toggleBrandCollection"
          />
        </div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="mb-4 block w-full rounded-md bg-[#28574e] px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span
            v-if="isSubmitting"
            class="flex items-center justify-center gap-5"
            >Updating <Loader
          /></span>
          <span v-else>Update Collection</span>
        </button>
        <button
          type="button"
          :disabled="isDeleting"
          @click="deleteCollection"
          class="block w-full rounded-md bg-red-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span v-if="isDeleting" class="flex items-center justify-center gap-5"
            >Deleting <Loader
          /></span>
          <span v-else>Delete Collection</span>
        </button>
      </div>
    </form>

    <div v-else class="text-center text-gray-500">
      <p>No collection selected. Please select a collection to edit.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { toast } from "vue-sonner";

const route = useRoute();
const router = useRouter();
const handle = route.params.id;
const isSubmitting = ref(false);
const isDeleting = ref(false);
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

const deleteCollection = async () => {
  isDeleting.value = true;
  try {
    if (!collection.value?.id) throw new Error("Invalid collection.");
    await axios.delete(`/api/collections/${collection.value.id}`);
    toast.success("Collection deleted successfully!", { richColors: true });
    router.push("/collections");
  } catch (err: any) {
    toast.error(err.message, { richColors: true });
  } finally {
    isDeleting.value = false;
  }
};

const updateCollection = async () => {
  if (!collection.value || !collection.value?.id) {
    toast.error("Invalid collection", { richColors: true });
    return;
  }

  isSubmitting.value = true;
  let image = null;
  if (collectionImage.value) {
    image = {
      attachment: (await fileToBase64(collectionImage.value)).base64Image,
    };
  }

  const updatedCollection = {
    title: collection.value.title,
    body_html: collection.value.descriptionHtml,
    metafields: collection.value.metafields,
    image,
  };

  const { addedIds, removedIds } = separateAddedAndRemovedCollections();
  try {
    await axios.put(`/api/collections/${collection.value.id}`, {
      collection: updatedCollection,
      addedProductIds: addedIds,
      removedProductIds: removedIds,
    });
    toast.success("Collection updated successfully!", { richColors: true });
  } catch (err: any) {
    toast.error(`Failed to update collection: ${err.message}`, {
      richColors: true,
    });
  } finally {
    isSubmitting.value = false;
  }
};

const separateAddedAndRemovedCollections = () => {
  const addedIds: string[] = [];
  const removedIds: string[] = [];

  const fetchedIds =
    fetchedCollection.value?.products.map((prod) => prod.product_id) || [];
  const updatedIds =
    collection.value?.products.map((prod) => prod.product_id) || [];

  for (const id of updatedIds) {
    if (!fetchedIds.includes(id)) addedIds.push(id);
  }
  for (const id of fetchedIds) {
    if (!updatedIds.includes(id)) removedIds.push(id);
  }
  return { addedIds, removedIds };
};

const toggleBrandCollection = () => {
  if (!collection.value) return;
  collection.value.metafields.isBrandCollection =
    !collection.value.metafields.isBrandCollection;
};

await fetchCollection();

useHead({
  title: `Collection | ${fetchedCollection.value?.title || handle}`,
});
</script>
