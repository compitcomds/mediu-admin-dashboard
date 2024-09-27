<template>
  <div>
    <h1 v-if="product">Edit Product: {{ product.title }}</h1>
    <div v-if="error" class="error">{{ error }}</div>

    <form v-if="product" @submit.prevent="saveProduct">
      <div class="form-group">
        <label for="title">Product Title</label>
        <input type="text" v-model="product.title" id="title" />
      </div>

      <div class="form-group">
        <label for="description">Product Description</label>
        <textarea v-model="product.body_html" id="description"></textarea>
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" v-model="product.variants[0].price" id="price" />
      </div>

      <div class="form-group">
        <label for="compare-price">Compare Price</label>
        <input
          type="number"
          v-model="product.variants[0].compare_at_price"
          id="compare-price"
        />
      </div>

      <h2>Product Metafields</h2>
      <div v-for="metafield in metafields" :key="metafield.id" class="form-group">
        <label>{{ formatLabel(metafield) }}</label>
        <div v-if="metafield.namespace.startsWith('custom')">
          <textarea v-model="metafield.value"></textarea>
        </div>
        <div v-else>
          <ul v-if="Array.isArray(metafield.value)">
            <li v-for="value in metafield.value" :key="value">
              {{ formatMetaobject(value) }}
            </li>
          </ul>
          <input v-else type="text" v-model="metafield.value" />
        </div>
      </div>

      <h2>Product Collections</h2>
      <ProductCollectionBox v-model="collections" />

      <ProductImages
        :images="product.images"
        v-model:removed-images="removedImages"
        v-model:added-images="addedImages"
      />

      <button type="submit">Save Product</button>
    </form>
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
      return `${metafield.namespace.replace("custom:", "").replace("-", " ")}: ${
        metafield.key
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
