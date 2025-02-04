<template>
  <h2 class="mb-4 text-xl font-bold lg:text-3xl">Create Collection</h2>
  <form
    @submit.prevent="createCollection"
    class="flex flex-col gap-5 lg:flex-row"
  >
    <div class="flex-1">
      <div class="mb-4">
        <label class="block text-gray-700">Title</label>
        <input
          type="text"
          v-model="newCollection.title"
          class="w-full rounded border p-2"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Description</label>
        <textarea
          v-model="newCollection.body_html"
          class="w-full rounded border p-2"
          required
        ></textarea>
      </div>
      <div class="mb-6">
        <CollectionProductSelect
          v-model:products="newCollection.collects"
          :is-collection-brand="newCollection.metafields.isBrandCollection"
        />
      </div>
    </div>
    <div class="lg:w-full lg:max-w-xs">
      <CollectionImagePicker @update:image="handleImageUpdate" />
      <div class="mb-4">
        <label class="block text-gray-700">Collection is a brand?</label>
        <Switch
          :checked="newCollection.metafields.isBrandCollection"
          @update:checked="toggleBrandCollection"
        />
      </div>
      <button
        type="submit"
        :disabled="isSubmitting"
        class="block w-full rounded-md bg-[#28574e] px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span v-if="isSubmitting" class="flex items-center justify-center gap-5"
          >Submitting <Loader
        /></span>
        <span v-else>Create Collection</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import axios from "axios";
import Switch from "~/components/ui/switch/Switch.vue";

const newCollection = ref<{
  title: string;
  body_html: string;
  collects: any[];
  metafields: { isBrandCollection: boolean };
}>({
  title: "",
  body_html: "",
  collects: [],
  metafields: {
    isBrandCollection: false,
  },
});
const collectionImage = ref<File | null>(null);
const isSubmitting = ref(false);

const router = useRouter();

const toggleBrandCollection = () => {
  newCollection.value.metafields.isBrandCollection =
    !newCollection.value.metafields.isBrandCollection;
};

const handleImageUpdate = (image: File) => {
  collectionImage.value = image;
};

async function createCollection() {
  isSubmitting.value = true;
  try {
    let image = null;
    if (collectionImage.value) {
      image = {
        attachment: (await fileToBase64(collectionImage.value)).base64Image,
      };
    }

    const { data } = await axios.post("/api/collections/create", {
      ...newCollection.value,
      image,
      collects: newCollection.value.collects.map((collect) => ({
        product_id: collect.product_id,
      })),
    });

    alert("Successfully created the collection.");
    router.replace(`/collections/${data.handle}`);
  } catch (error: any) {
    alert("Failed to create collection: " + (error.message || "Unknown error"));
  } finally {
    isSubmitting.value = false;
  }
}

useHead({
  title: "Create Collection",
});
</script>

<style lang="scss" scoped>
/* Add any additional styles if necessary */
</style>
