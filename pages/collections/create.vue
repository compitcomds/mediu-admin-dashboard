<template>
  <AttachSidebar>
    <h2 class="text-xl lg:text-3xl font-bold mb-4">Create Collection</h2>
    <form
      @submit.prevent="createCollection"
      class="flex flex-col lg:flex-row gap-5"
    >
      <div class="flex-1">
        <div class="mb-4">
          <label class="block text-gray-700">Title</label>
          <input
            type="text"
            v-model="newCollection.title"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Description</label>
          <textarea
            v-model="newCollection.body_html"
            class="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div class="mb-6">
          <!-- Label -->
          <label class="block text-sm font-semibold text-gray-800 mb-2"
            >Select Products</label
          >

          <!-- Product List -->
          <div class="space-y-2">
            <div
              v-for="product in products"
              :key="product.id"
              class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              <!-- Checkbox -->
              <input
                type="checkbox"
                :value="{ product_id: product.id }"
                v-model="newCollection.collects"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <!-- Product Title -->
              <span class="ml-3 text-gray-700">{{ product.title }}</span>
            </div>
          </div>
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
          class="bg-[#28574e] block w-full disabled:cursor-not-allowed disabled:opacity-70 text-white px-4 py-2 rounded-md"
        >
          <span
            v-if="isSubmitting"
            class="flex items-center justify-center gap-5"
            >Submitting <Loader
          /></span>
          <span v-else>Create Collection</span>
        </button>
      </div>
    </form>
  </AttachSidebar>
</template>

<script setup lang="ts">
import axios from "axios";
import Switch from "~/components/ui/switch/Switch.vue";

const products = ref<any[]>([]);
const newCollection = ref({
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

onMounted(async () => {
  await fetchProducts();
});

const toggleBrandCollection = () => {
  newCollection.value.metafields.isBrandCollection =
    !newCollection.value.metafields.isBrandCollection;
};

const handleImageUpdate = (image: File) => {
  collectionImage.value = image;
};

async function fetchProducts() {
  try {
    const response = await axios.get("/api/products");
    products.value = response.data.products; // Assuming API returns a products array
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

async function createCollection() {
  isSubmitting.value = true;
  try {
    let image = null;
    if (collectionImage.value) {
      image = {
        attachment: (await fileToBase64(collectionImage.value)).base64Image,
      };
    }

    const response = await axios.post("/api/collections/create", {
      ...newCollection.value,
      image,
    });

    if (
      response.status === 200 &&
      response.data &&
      response.data.custom_collection
    ) {
      alert("Successfully created the collection");

      newCollection.value = {
        title: "",
        body_html: "",
        collects: [],
        metafields: { isBrandCollection: false },
      };
      collectionImage.value = null;
      router.push("/collections");
    } else {
      alert("Successfully created the collection.");
      router.push("/collections");
    }
  } catch (error: any) {
    alert("Failed to create collection: " + (error.message || "Unknown error"));
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style lang="scss" scoped>
/* Add any additional styles if necessary */
</style>
