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
      <div>
        <div class="mb-4">
          <label class="block text-gray-700">Image</label>
          <input type="file" @change="onImageSelected" accept="image/*" />
          <img
            v-if="collectionImage.image && collectionImage.preview"
            :src="collectionImage.preview"
            class="mt-2 w-32 h-32 object-cover"
          />
        </div>
        <button
          type="submit"
          class="bg-[#28574e] block w-full text-white px-4 py-2 rounded-md"
        >
          Create Collection
        </button>
      </div>
    </form>
  </AttachSidebar>
</template>

<script setup lang="ts">
import axios from "axios";

const products = ref<any[]>([]);
const newCollection = ref({
  title: "",
  body_html: "",
  collects: [],
});
const collectionImage = ref<{ image: any; preview: string | null }>({
  image: null,
  preview: null,
});

const router = useRouter();

async function fetchProducts() {
  try {
    const response = await axios.get("/api/products");
    products.value = response.data.products; // Assuming API returns a products array
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function onImageSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    collectionImage.value.image = file;
    collectionImage.value.preview = URL.createObjectURL(file);
  }
}

// Create collection
async function createCollection() {
  try {
    const { title, body_html, collects } = newCollection.value;

    let image = null;
    if (collectionImage.value.image) {
      image = {
        attachment: (await fileToBase64(collectionImage.value.image))
          .base64Image,
      };
    }

    const newCollectionPayload = {
      custom_collection: {
        title,
        body_html,
        collects,
        image,
      },
    };

    const response = await axios.post(
      "/api/create-collections",
      newCollectionPayload
    );

    console.log("API Response:", response);

    if (
      response.status === 200 &&
      response.data &&
      response.data.custom_collection
    ) {
      alert("Successfully created the collection");

      // Reset the form fields
      newCollection.value = { title: "", body_html: "", collects: [] };
      collectionImage.value = { image: null, preview: null };
      router.push("/collections");
    } else {
      console.error("Unexpected response format:", response);
      alert("Successfully created the collection.");
      router.push("/collections");
    }
  } catch (error: any) {
    console.error("Error creating collection:", error);
    alert("Failed to create collection: " + (error.message || "Unknown error"));
  }
}
// Authentication check on mount
onMounted(async () => {
  await fetchProducts();
});
</script>

<style lang="scss" scoped>
/* Add any additional styles if necessary */
</style>
