import { defineEventHandler, readBody } from "h3";
import axios from "axios";
import config from "~/utils/config";

const apiUrl = `https://${config.shopifyDomain}/admin/api/2024-07/products.json`;

// Function to fetch collections
async function fetchCollections() {
  try {
    const response = await axios.get<{
      custom_collections: Array<{
        id: number;
        title: string;
        handle: string;
        body_html: string;
        published_at: string;
        total_products: string;
        updated_at: string;
      }>;
    }>(
      `https://${config.shopifyDomain}/admin/api/2024-07/custom_collections.json`,
      {
        headers: {
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
      }
    );

    const collections = response.data.custom_collections;

    return collections; // Return collections to the caller
  } catch (error) {
    console.error("Error fetching collections: ", error);
    throw new Error("Failed to fetch collections");
  }
}

export default defineEventHandler(async (event) => {
  if (event.req.method === "GET") {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch Shopify products: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return { error: error };
    }
  } else if (event.req.method === "POST") {
    try {
      const { product, productImages, collectionId } = await readBody(event);

      // Fetch all collections
      const collections = await fetchCollections();

      // Find the selected collection based on the passed collectionId
      const selectedCollection = collections.find(
        (collection) => collection.id === collectionId
      );

      const newProduct = {
        product: {
          title: product.title,
          body_html: product.description || "",
          tags: product.tags.join(", "),
          images: productImages.map((image: string) => ({
            attachment: image.split(",")[1],
          })),
          metafields: product?.metafields || [],
          variants: [
            {
              price: product.price,
              inventory_management: "shopify",
              inventory_quantity: parseInt(product.quantity, 10) || 0,
              product_type: product.category || "",
              
            },
          ],
        },
      };

      // Step 1: Create the product in Shopify
      const productResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
        body: JSON.stringify(newProduct),
      });

      if (!productResponse.ok) {
        throw new Error(
          `Failed to create product: ${productResponse.statusText}`
        );
      }

      const createdProduct = await productResponse.json();

      // Step 2: Add product to collection if a matching collection is found
      if (selectedCollection) {
        const addProductToCollectionUrl = `https://${config.shopifyDomain}/admin/api/2024-07/collects.json`;

        const collectResponse = await fetch(addProductToCollectionUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": config.shopifyAccessToken,
          },
          body: JSON.stringify({
            collect: {
              product_id: createdProduct.product.id,
              collection_id: selectedCollection.id,
            },
          }),
        });

        if (!collectResponse.ok) {
          throw new Error(
            `Failed to add product to collection: ${collectResponse.statusText}`
          );
        }
      }

      return createdProduct;
    } catch (error) {
      console.error("Error adding product to collection: ", error);
      return { error: error };
    }
  }
});
