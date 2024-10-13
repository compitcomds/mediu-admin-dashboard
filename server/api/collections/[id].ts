import { defineEventHandler, readBody } from "h3";
import axios from "axios";
import config from "~/utils/config";

export default defineEventHandler(async (event) => {
  const method = event.req.method; // Get the HTTP method (GET, PUT, POST, etc.)
  const id = event.context.params?.id; // Get the collection ID from the route params

  // Ensure collection ID is provided
  if (!id) {
    throw new Error("Collection ID is missing");
  }

  try {
    // Handle HTTP Methods (GET, PUT, DELETE)
    switch (method) {
      case "GET": {
        // Fetch the collection
        const response = await axios.get(
          `https://${config.shopifyDomain}/admin/api/2024-07/custom_collections/${id}.json`,
          {
            headers: {
              "X-Shopify-Access-Token": config.shopifyAccessToken,
            },
          }
        );
        return response.data.custom_collection;
      }

      case "PUT": {
        // Read the request body to get the new collection data
        const body = await readBody(event);

        // Ensure required fields are present in the body
        if (
          !body.title ||
          !body.body_html ||
          typeof body.published === "undefined"
        ) {
          throw new Error(
            "Missing required fields: title, body_html, or published status"
          );
        }

        // Update the collection with the new data
        const response = await axios.put(
          `https://${config.shopifyDomain}/admin/api/2024-07/custom_collections/${id}.json`,
          {
            custom_collection: {
              title: body.title,
              body_html: body.body_html,
              published: body.published,
            },
          },
          {
            headers: {
              "X-Shopify-Access-Token": config.shopifyAccessToken,
            },
          }
        );

        return response.data.custom_collection;
      }

      case "DELETE": {
        // Handle the delete request for the collection
        const response = await axios.delete(
          `https://${config.shopifyDomain}/admin/api/2024-07/custom_collections/${id}.json`,
          {
            headers: {
              "X-Shopify-Access-Token": config.shopifyAccessToken,
            },
          }
        );

        if (response.status === 200) {
          return { message: "Collection deleted successfully." };
        } else {
          throw new Error("Failed to delete the collection.");
        }
      }

      // If the method is not allowed, return a 405 Method Not Allowed
      default: {
        throw new Error(`HTTP method ${method} is not allowed`);
      }
    }
  } catch (error) {
    console.error("Error handling request:", error);
    throw new Error(`Failed to handle request: ${error}`);
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
export async function fetchSingleCollection(
  CollectionId: string
): Promise<any> {
  const url = `https://${config.shopifyDomain}/admin/api/2024-07/custom_collections.json?product_id=${CollectionId}`;

  try {
    // Use GET to fetch data
    const response = await fetch(url, {
      method: "GET", // Changed method to GET
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": config.shopifyAccessToken, // Ensure access token is correct
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching collection: ${response.statusText}`);
    }

    // Parse the response JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching collection:", error);
    return null;
  }
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
