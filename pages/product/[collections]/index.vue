<template>
  <div>
    <h2 class="block text-sm font-medium text-gray-700">Product Collections</h2>
    <ProductCollectionBox v-model="collections" />
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
          const data = await response.json(); // Parse the response data
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

<style lang="scss" scoped></style>
