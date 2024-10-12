<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidenav />

    <div class="lg:ml-64 flex-1 overflow-y-auto p-8 mt-10 bg-gray-100">
      <NavigationButton />
      <div class="flex justify-between items-center mb-8 border-b pb-4">
        <h1 class="text-2xl font-bold">Add New Product</h1>
        <div class="flex space-x-4">
          <button
            @click="$router.push('/product')"
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
          >
            Discard
          </button>
          <button @click="addProduct" class="bg-blue-600 text-white px-4 py-2 rounded-md">
            Save
          </button>
        </div>
      </div>
      <div class="space-y-8">
        <div class="bg-white p-6 rounded-xl shadow-md space-y-8">
          <!-- Title and Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="newProduct.title"
              type="text"
              class="mt-1 py-3 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Short sleeve t-shirt"
              required
            />

            <label class="block text-sm font-medium text-gray-700 mt-6"
              >Description</label
            >
            <textarea
              v-model="newProduct.description"
              class="mt-1 py-3 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="4"
              placeholder="Description"
            ></textarea>
          </div>

          <!-- Media -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Media</label>
            <div
              class="mt-1 flex justify-center px-6 pt-5 pb-6 border border-dashed border-black rounded-md"
            >
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M24 4v16m0 0L8 12m16 8L40 12M4 28v16h16v-8h8v8h16V28m-24 0H8m16 0h16"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex items-center text-sm text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer p-1 bg-slate-100 rounded-md font-medium text-blue-600 hover:text-blue-500"
                  >
                    <span>Upload New</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      class="sr-only"
                      multiple
                      @change="handleFileUpload"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>

            <!-- Display Uploaded Images -->
            <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div
                v-if="files.length > 0"
                class="relative col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 h-60 w-full"
              >
                <img
                  :src="files[0].preview"
                  class="object-cover w-full h-full border rounded-md"
                />
                <button
                  @click="removeFile(0)"
                  class="absolute w-1/3 top-2 right-0 text-red-500 bg-white rounded-full font-semibold px-2 py-1 mx-1 text-xs"
                >
                  Remove
                </button>
              </div>
              <div v-for="(file, index) in files.slice(1)" :key="index" class="relative">
                <img
                  :src="file.preview"
                  class="h-24 w-24 object-cover border rounded-md"
                />
                <button
                  @click="removeFile(index + 1)"
                  class="absolute top-0 left-0 text-red-500 m-1 bg-white rounded-full px-2 text-center flex items-center justify-center py-1 text-xs"
                >
                  x
                </button>
              </div>
              <div v-if="files.length < maxFiles" class="relative">
                <label
                  class="cursor-pointer border-dashed border-black border-2 rounded-md w-24 h-24 flex justify-center items-center"
                >
                  <svg
                    class="h-8 w-8 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <input type="file" class="sr-only" @change="handleFileUpload" />
                </label>
              </div>
            </div>
          </div>

          <!-- Collection Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mt-6">Collection</label>
            <h2 class="block text-sm font-medium text-gray-700">Product Collections</h2>
            <select v-model="newProduct.collectionId">
              <option
                v-for="collection in collections"
                :key="collection.id"
                :value="collection.id"
              >
                {{ collection.title }}
              </option>
            </select>
          </div>

          <!-- Pricing -->
          <div class="bg-white p-6 rounded-xl shadow-md">
            <label class="block text-sm font-medium text-gray-700">Pricing</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
              <div>
                <label class="block text-sm font-medium text-gray-500"
                  >Discounted Price</label
                >
                <input
                  v-model="newProduct.price"
                  type="number"
                  class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">MRP</label>
                <input
                  type="number"
                  class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div class="mt-4 flex items-center">
              <input
                id="tax-checkbox"
                name="tax-checkbox"
                type="checkbox"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label for="tax-checkbox" class="ml-2 block text-sm text-gray-900">
                Charge tax on this product
              </label>
            </div>

            <!-- Inventory -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Inventory</label>
              <div class="mt-1">
                <div class="flex items-center">
                  <input
                    id="track-quantity"
                    name="track-quantity"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    required
                  />
                  <label for="track-quantity" class="ml-2 block text-sm text-gray-900">
                    Track quantity
                  </label>
                </div>
                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700"
                    >Stock Quantity</label
                  >
                  <input
                    v-model="newProduct.quantity"
                    id="quantity"
                    type="number"
                    class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mt-6">Tags</label>
            <div
              class="mt-1 py-3 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus-within:ring-blue-500 focus-within:border-blue-500 sm:text-sm flex flex-wrap space-x-2 space-y-2"
            >
              <!-- Display each tag as a "chip" -->
              <span
                v-for="(tag, index) in newProduct.tags"
                :key="index"
                class="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
              >
                {{ tag }}
                <button
                  @click="removeTag(index)"
                  type="button"
                  class="ml-1 bg-transparent hover:bg-red-200 text-red-600 rounded-full focus:outline-none"
                >
                  &times;
                </button>
              </span>

              <!-- Input field for new tags -->
              <input
                v-model="tagInput"
                @keydown.enter.prevent="addTag"
                @keydown.space.prevent="addTag"
                @keydown.comma.prevent="addTag"
                @blur="addTag"
                type="text"
                class="border-none focus:ring-0 flex-1"
                placeholder="Type a tag and press space"
              />
            </div>
          </div>

          <!-- Metafields -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mt-6"
              >Safety Information & Precaution</label
            >
            <textarea
              v-model="customMetafields.safety_information_precaution"
              class="mt-1 py-3 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="4"
              placeholder="Safety information & precaution"
            ></textarea>

            <label class="block text-sm font-medium text-gray-700 mt-6"
              >How to use?</label
            >
            <textarea
              v-model="customMetafields.how_to_use"
              class="mt-1 py-3 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="4"
              placeholder="How to use"
            ></textarea>

            <label class="block text-sm font-medium text-gray-700 mt-6"
              >Key Benefits</label
            >
            <textarea
              v-model="customMetafields.key_benefits"
              class="mt-1 py-3 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="4"
              placeholder="Key benefits"
            ></textarea>

            <label class="block text-sm font-medium text-gray-700 mt-6"
              >Manufacturer</label
            >
            <textarea
              v-model="customMetafields.manufacturers"
              class="mt-1 py-3 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="4"
              placeholder="Manufacturers"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

interface Product {
  title: string;
  description: string;
  price: string;
  quantity: string;
  category: string;
  collectionId: string;
  metafields: Array<object>;
  tags: string[]; // Tags as an array
}

interface CustomMetafields {
  safety_information_precaution: string;
  how_to_use: string;
  key_benefits: string;
  manufacturers: string;
}

interface ShopifyCollection {
  id: number;
  title: string;
}

export default defineComponent({
  data() {
    return {
      newProduct: {
        title: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        collectionId: "",
        tags: [] as string[], // Tags initialized as an array of strings
      } as Product,
      files: [] as Array<{ file: File; preview: string }>,
      maxFiles: 5,
      customMetafields: {
        safety_information_precaution: "",
        how_to_use: "",
        key_benefits: "",
        manufacturers: "",
      } as CustomMetafields,
      categories: [
        { id: 1, name: "Skin Care" },
        { id: 2, name: "Hair Care" },
        { id: 3, name: "Baby Care" },
      ],
      collections: [] as ShopifyCollection[],
      collects: [],
      tagInput: "",
    };
  },
  computed: {
    filteredCollections() {
      return this.collections;
    },
  },
  methods: {
    addTag() {
      const tag: string = this.tagInput.trim(); // Specify type for tag
      if (tag && !this.newProduct.tags.includes(tag)) {
        this.newProduct.tags.push(tag); // Add tag to array if unique
      }
      this.tagInput = ""; // Clear input field
    },
    removeTag(index: number) {
      this.newProduct.tags.splice(index, 1); // Remove tag by index
    },
    async fetchCollections(): Promise<void> {
      try {
        const response = await axios.get("/api/collections");
        this.collections = response.data.map((collection: any) => ({
          id: collection.id,
          title: collection.title,
        }));
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    },
    handleFileUpload(event: Event): void {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const preview = URL.createObjectURL(file);
          this.files.push({ file, preview });
        }
      }
    },
    removeFile(index: number): void {
      this.files.splice(index, 1);
    },
    async addProduct(): Promise<void> {
      try {
        const collectionId = this.newProduct.collectionId;
        if (!collectionId) {
          throw new Error("No collection selected");
        }

        const base64Images = await Promise.all(
          this.files.map((fileObj) => convertFileToBase64(fileObj.file))
        );

        const metafields = Object.keys(this.customMetafields).map((key) => {
          const value = (this.customMetafields as any)[key as keyof CustomMetafields];
          return {
            key,
            value,
            namespace: "custom",
          };
        });

        const product: Product = {
          ...this.newProduct,
          metafields,
        };

        // Use newProduct.tags directly since it's already an array
        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product,
            productImages: base64Images,
            collectionId, // Pass the collection ID here to handle in product.ts
            tags: this.newProduct.tags,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add product");
        }

        alert("Product added successfully and added to the collection!");
        this.$router.push("/product");
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
  },
  mounted() {
    this.fetchCollections();
  },
});

const richTextMetafields: string[] = [
  "safety_information_precaution",
  "how_to_use",
  "key_benefits",
];

function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

function convertTextToRichText(text: string): string {
  // Implement your rich text conversion logic here
  return text;
}
</script>

<style scoped>
/* Add any scoped styles for this component */
</style>
