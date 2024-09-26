import { defineEventHandler, readBody } from "h3";
import axios from "axios";
import config from "~/utils/config";

export default defineEventHandler(async (event) => {
  try {
    if (!event.context.params || !event.context.params.id) {
      throw new Error("Collection ID is missing");
    }

    const id = event.context.params.id;
    const body = await readBody(event);

    // Ensure the body contains the necessary properties
    if (
      !body.title ||
      !body.body_html ||
      
      typeof body.published === "undefined"
    ) {
      throw new Error(
        "Missing required fields: title, body_html, or published status"
      );
    }

    const response = await axios.put(
      `https://${config.shopifyDomain}/admin/api/2024-07/custom_collections/${id}.json`,
      {
        custom_collection: {
          title: body.title,
          body_html: body.body_html,
          published: body.published, // Ensure this is coming from the client correctly
        },
      },
      {
        headers: {
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
      }
    );

    return response.data.custom_collection;
  } catch (error) {
    console.error("Error updating collection:", error);
    throw new Error("Failed to update collection: " + error);
  }
});

// Get products in a collection
// Fetch products in a collection
export const fetchProductsInCollection = defineEventHandler(async (event) => {
  try {
    if (!event.context.params || !event.context.params.id) {
      throw new Error("Collection ID is missing");
    }

    const id = event.context.params.id;

    const response = await axios.get(
      `https://${config.shopifyDomain}/admin/api/2024-07/custom_collections/${id}/products.json`,
      {
        headers: {
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
      }
    );

    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products: " + error);
  }
});

// Add a product to a collection
// Add a product to a collection
export const addProductToCollection = defineEventHandler(async (event) => {
  try {
    if (!event.context.params || !event.context.params.id) {
      throw new Error("Collection ID is missing");
    }

    const id = event.context.params.id;
    const body = await readBody(event);

    // Ensure the body contains the necessary product ID
    if (!body.productId) {
      throw new Error("Missing required field: productId");
    }

    const response = await axios.post(
      `https://${config.shopifyDomain}/admin/api/2024-07/collects.json`,
      {
        collect: {
          product_id: body.productId,
          collection_id: id,
        },
      },
      {
        headers: {
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
      }
    );

    return response.data.collect;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product: " + error);
  }
});

// Remove a product from a collection
interface Collect {
  id: number;
  collection_id: number;
  product_id: number;
}

export const removeProductFromCollection = defineEventHandler(async (event) => {
  try {
    if (
      !event.context.params ||
      !event.context.params.id ||
      !event.context.params.productId
    ) {
      throw new Error("Collection ID or Product ID is missing");
    }

    const collectionId = event.context.params.id;
    const productId = event.context.params.productId;

    // Get collects for the product to find the collect ID
    const collectsResponse = await axios.get(
      `https://${config.shopifyDomain}/admin/api/2024-07/products/${productId}/collects.json`,
      {
        headers: {
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
      }
    );

    const collects: Collect[] = collectsResponse.data.collects; // Explicitly type collects

    const collect = collects.find(
      (c: Collect) => c.collection_id === parseInt(collectionId)
    ); // Specify the type for `c`
    if (collect) {
      await axios.delete(
        `https://${config.shopifyDomain}/admin/api/2024-07/collects/${collect.id}.json`,
        {
          headers: {
            "X-Shopify-Access-Token": config.shopifyAccessToken,
          },
        }
      );
    }
  } catch (error) {
    console.error("Error removing product:", error);
    throw new Error("Failed to remove product: " + error);
  }
});
