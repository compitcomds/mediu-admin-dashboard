<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidenav />

    <div class="lg:ml-64 flex-1 overflow-y-auto p-8 mt-10 bg-gray-100">
      <NavigationButton />
      <h1 class="text-2xl font-bold" v-if="product">
        Edit Product: {{ product.title }}
      </h1>
      <div v-if="error" class="error">{{ error }}</div>

      <form v-if="product" @submit.prevent="saveProduct">
        <div class="space-y-8">
          <div class="bg-white p-6 rounded-xl shadow-md space-y-8">
            <div>
              <div class="form-group">
                <label
                  class="block text-sm font-medium text-gray-700"
                  for="title"
                  >Product Title</label
                >
                <input
                  class="mt-1 py-3 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  type="text"
                  v-model="product.title"
                  id="title"
                />
              </div>

              <div class="form-group">
                <label
                  class="block text-sm font-medium text-gray-700 mt-6"
                  for="description"
                  >Product Description</label
                >
                <textarea
                  rows="4"
                  class="mt-1 py-3 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  v-model="product.body_html"
                  id="description"
                ></textarea>
              </div>
            </div>
            <!-- Media -->
            <div>
              <ProductImages
                :images="product.images"
                v-model:removed-images="removedImages"
                v-model:added-images="addedImages"
              />
              <h2 class="block text-sm font-medium text-gray-700">
                Product Collections
              </h2>
              <ProductCollectionBox v-model="collections" />
            </div>

            <div class="bg-white p-6 rounded-xl shadow-md">
              <label class="block text-sm font-medium text-gray-700"
                >Pricing</label
              >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                <div>
                  <label for="price"
                    >Price (Discounted Price)<span class="text-red-500"
                      >*</span
                    ></label
                  >
                  <input
                    class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    type="number"
                    v-model="product.variants[0].price"
                    id="price"
                    required
                  />
                </div>

                <div>
                  <label
                    class="block text-sm font-medium text-gray-500"
                    for="compare-price"
                    >MRP (Original Price)<span class="text-red-500"
                      >*</span
                    ></label
                  >
                  <input
                    class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    type="number"
                    v-model="product.variants[0].compare_at_price"
                    id="compare-price"
                    required
                  />
                </div>
              </div>
            </div>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
              Product Metafields
            </h2>

            <div
              v-for="(metafield, index) in filteredMetafields"
              :key="metafield.id"
              class="form-group mb-4"
            >
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ formatLabel(metafield) }}
              </label>
              <div v-if="metafield.namespace.startsWith('custom')">
                <textarea
                  v-model="metafield.value"
                  class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"
                  rows="3"
                ></textarea>
              </div>
              <div v-else>
                <ul v-if="Array.isArray(metafield.value)" class="space-y-2">
                  <li
                    v-for="value in metafield.value"
                    :key="value"
                    class="bg-gray-50 p-2 rounded-md border border-gray-200 shadow-sm"
                  >
                    {{ formatMetaobject(value) }}
                  </li>
                </ul>
                <input
                  v-else
                  type="text"
                  v-model="metafield.value"
                  class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <button type="submit">Save Product</button>
            <button
              type="button"
              class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              @click="deleteProduct"
            >
              Delete Product
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const productId = ref(route.params.id);
const product = ref(null);
const metafields = ref([]);
const error = ref(null);
const collections = ref([]);
const collects = ref([]);
const removedImages = ref([]);
const addedImages = ref([]);

const validMetafields = [
  "safety_information_precaution",
  "how_to_use",
  "key_benefits",
  "manufacturers",
];

const filteredMetafields = computed(() =>
  metafields.value.filter((metafield) =>
    validMetafields.includes(metafield.key.toLowerCase())
  )
);

const fetchProduct = async () => {
  try {
    const response = await fetch(`/api/products/${productId.value}`);
    const data = await response.json();
    if (response.ok) {
      product.value = data.product;
      console.log(data.product);
      metafields.value = processMetafields(data.metafields || []);
      collections.value = data.collections || [];
      collects.value = data.collects || [];
    } else {
      error.value = data.error || "Failed to fetch product details";
    }
  } catch (err) {
    error.value = err.message;
  }
};

const processMetafields = (metafields) => {
  return metafields.map((metafield) => {
    if (metafield.namespace.startsWith("custom")) {
      metafield.value = convertCustomMetafield(metafield.value);
    } else if (Array.isArray(metafield.value)) {
      metafield.value = metafield.value.map(formatMetaobject);
    }
    return metafield;
  });
};

const convertCustomMetafield = (value) => {
  try {
    const parsedValue = JSON.parse(value);
    if (parsedValue.type === "root" && Array.isArray(parsedValue.children)) {
      return parsedValue.children
        .map((child) => child.children[0].value)
        .join("\n");
    }
    return value;
  } catch {
    return value;
  }
};

const formatMetaobject = (gid) => {
  const gidParts = gid.split("/");
  return gidParts[gidParts.length - 1];
};

const formatLabel = (metafield) => {
  return `${metafield.namespace.replace("custom:", "").replace("-", " ")}: ${
    metafield.key
  }`;
};

const saveProduct = async () => {
  try {
    const response = await fetch(`/api/products/${productId.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: product.value,
        metafields: metafields.value,
      }),
    });

    await fetch("/api/collections/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collections: collections.value,
        collects: collects.value,
        productId: productId.value,
      }),
    });

    await fetch("/api/products/edit-images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: productId.value,
        addedImages: addedImages.value,
        removedImages: removedImages.value.map((image) => image.id),
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      error.value = data.error || "Failed to save product";
    } else {
      alert("Product updated successfully!");
    }
  } catch (err) {
    error.value = err.message;
  }
};

const deleteProduct = async () => {
  try {
    const response = await fetch(`/api/products/${productId.value}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      alert("Product deleted successfully!");
      router.push("/product");
    } else {
      error.value = data.error || "Failed to delete product";
    }
  } catch (err) {
    error.value = err.message;
  }
};

// Lifecycle hook to fetch product on mount
onMounted(() => {
  fetchProduct();
});
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  height: 100px;
}

button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
}

.bg-red-600 {
  background-color: #e3342f;
}

.bg-red-600:hover {
  background-color: #cc1f24;
}
</style>
