import { defineEventHandler, readBody } from "h3";
import fetch from "node-fetch";
import config from "~/utils/config";
import axios from "axios";

async function fetchProductCollections(productId: string): Promise<any> {
  const url = `https://${config.shopifyDomain}/admin/api/2024-07/custom_collections.json?product_id=${productId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": config.shopifyAccessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching collections: ${response.statusText}`);
    }

    const data = await response.json();
    return data.custom_collections;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function fetchProductCollects(productId: string): Promise<any> {
  const url = `https://${config.shopifyDomain}/admin/api/2024-07/collects.json?product_id=${productId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": config.shopifyAccessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching collections: ${response.statusText}`);
    }

    const data = await response.json();
    return data.collects;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function fetchMetafields(productId: string) {
  const metafieldsUrl = `https://${config.shopifyDomain}/admin/api/2024-07/products/${productId}/metafields.json`;
  const response = await fetch(metafieldsUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": config.shopifyAccessToken,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching metafields: ${response.statusText}`);
  }

  return await response.json();
}

async function updateMetafield(metafield: any) {
  const metafieldUrl = `https://${config.shopifyDomain}/admin/api/2024-07/metafields/${metafield.id}.json`;

  const response = await axios.put(metafieldUrl, metafield, {
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": config.shopifyAccessToken,
    },
  });

  if (!response.data) {
    throw new Error(`Error updating metafield: ${response.statusText}`);
  }

  return response.data;
}

export default defineEventHandler(async (event) => {
  const productId = event.context.params?.id;

  if (!productId) {
    return {
      error: "Product ID is required.",
    };
  }

  const apiUrl = `https://${config.shopifyDomain}/admin/api/2024-07/products/${productId}.json`;

  if (event.method === "PUT") {
    const { product, metafields } = await readBody(event);

    try {
      const productResponse = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
        body: JSON.stringify({ product }),
      });

      if (!productResponse.ok) {
        throw new Error(
          `Error updating product: ${productResponse.statusText}`
        );
      }

      const updatedProduct = await productResponse.json();

      if (metafields && metafields.length > 0) {
        const metafieldPromises = metafields.map(updateMetafield);
        await Promise.all(metafieldPromises);
      }

      return updatedProduct;
    } catch (error) {
      console.error("Error updating product or metafields:", error);
    }
  } else if (event.method === "DELETE") {
    // DELETE product logic
    try {
      const deleteResponse = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
      });

      if (!deleteResponse.ok) {
        throw new Error(`Error deleting product: ${deleteResponse.statusText}`);
      }

      return {
        success: true,
        message: "Product deleted successfully",
      };
    } catch (error) {
      console.error("Error deleting product:", error);
      return {
        error: "Failed to delete product",
      };
    }
  }

  // Fetch product details and metafields if method is GET
  try {
    const productResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": config.shopifyAccessToken,
      },
    });

    if (!productResponse.ok) {
      throw new Error(`Error fetching product: ${productResponse.statusText}`);
    }

    const productData = await productResponse.json();

    const metafieldsData = await fetchMetafields(productId);
    const productCollections = await fetchProductCollections(productId);

    return {
      product: productData.product,
      metafields: metafieldsData.metafields,
      collections: productCollections,
      collects: await fetchProductCollects(productId),
    };
  } catch (error) {
    console.error("Error fetching product or metafields:", error);
  }
});
