<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidenav />

    <div class="lg:ml-64 flex-1 overflow-y-auto p-8 mt-10 bg-gray-100">
      <NavigationButton />
      <h1 class="text-2xl font-bold" v-if="product">Edit Product: {{ product.title }}</h1>
      <div v-if="error" class="error">{{ error }}</div>

      <form v-if="product" @submit.prevent="saveProduct">
        <div class="space-y-8">
          <div class="bg-white p-6 rounded-xl shadow-md space-y-8">
            <div>
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700" for="title">Product Title</label>
                <input
                  class="mt-1 py-3 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  type="text" v-model="product.title" id="title" />
              </div>

              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mt-6" for="description">Product
                  Description</label>
                <textarea rows="4"
                  class="mt-1 py-3 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  v-model="product.body_html" id="description"></textarea>
              </div>
            </div>
            <!-- Media -->
            <div>
              <ProductImages :images="product.images" v-model:removed-images="removedImages"
                v-model:added-images="addedImages" />
              <h2 class="block text-sm font-medium text-gray-700">Product Collections</h2>
              <ProductCollectionBox v-model="collections" />


            </div>

            <div class="bg-white p-6 rounded-xl shadow-md">
              <label class="block text-sm font-medium text-gray-700">Pricing</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                <div>
                  <label for="price">Price</label>
                  <input class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" type="number" v-model="product.variants[0].price" id="price" />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-500" for="compare-price">Compare Price</label>
                  <input
                    class="block w-full border p-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    type="number" v-model="product.variants[0].compare_at_price" id="compare-price" />
                </div>
              </div>
            </div>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Product Metafields</h2>
            <div v-for="(metafield, index) in metafields.slice(0, 3)" :key="metafield.id" class="form-group mb-4">

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
                  <li v-for="value in metafield.value" :key="value" class="bg-gray-50 p-2 rounded-md border border-gray-200 shadow-sm">
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
            <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onclick="deleteProduct()">Delete Product</button>

          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: null,
      metafields: [],
      error: null,
      collections: [],
      collects: [],
      removedImages: [],
      addedImages: [],
    };
  },
  async mounted() {
    const productId = this.$route.params.id;
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        this.product = data.product;
        this.metafields = this.processMetafields(data.metafields || []);
        this.collections = data.collections || [];
        this.collects = data.collects || [];
      } else {
        this.error = data.error || "Failed to fetch product details";
      }
    } catch (error) {
      this.error = error.message;
    }
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    if (!true) {
      // Redirect to login page if not authenticated
      this.$router.push("/login");
    } else {
      await this.fetchProducts();
    }
  },
  methods: {
    processMetafields(metafields) {
      return metafields.map((metafield) => {
        if (metafield.namespace.startsWith("custom")) {
          metafield.value = this.convertCustomMetafield(metafield.value);
        } else if (Array.isArray(metafield.value)) {
          metafield.value = metafield.value.map(this.formatMetaobject);
        }
        return metafield;
      });
    },

    convertCustomMetafield(value) {
      try {
        const parsedValue = JSON.parse(value);
        if (parsedValue.type === "root" && Array.isArray(parsedValue.children)) {
          return parsedValue.children.map((child) => child.children[0].value).join("\n");
        }
        return value;
      } catch (e) {
        return value;
      }
    },
    formatLabel(metafield) {
      return `${metafield.namespace.replace("custom:", "").replace("-", " ")}: ${metafield.key
        }`;
    },
    formatMetaobject(gid) {
      const gidParts = gid.split("/");
      return gidParts[gidParts.length - 1];
    },
    async saveProduct() {
      const productId = this.$route.params.id;
      try {
        const updatedProduct = {
          ...this.product,
          metafields: this.metafields,
        };

        const response = await fetch(`/api/products/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        });

        await fetch("/api/collections/edit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            collections: this.collections,
            collects: this.collects,
            productId,
          }),
        });

        await fetch("/api/products/edit-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId,
            addedImages: this.addedImages,
            removedImages: this.removedImages.map((image) => image.id),
          }),
        });

        if (!response.ok) {
          this.error = data.error || "Failed to save product";
        } else {
          alert("Product updated successfully!");
        }
      } catch (error) {
        this.error = error.message;
      }
    },
    async deleteProduct() {
      const productId = this.$route.params.id;
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json(); // Parse the response data

        if (response.ok) {
          alert("Product deleted successfully!");
          console.log("Deleted product response:", data); // Log the response for debugging
          this.$router.push("/product"); // Redirect to product list page
        } else {
          console.error("Failed to delete product:", data);
          this.error = data.error || "Failed to delete product";
        }
      } catch (error) {
        console.error("Error during delete operation:", error);
        this.error = error.message;
      }
    },
  },
};
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
</style>
