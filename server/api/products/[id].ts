import { defineEventHandler, readBody } from "h3";
import fetch from "node-fetch";

const shopDomain = "dev-mediu.myshopify.com";
const accessToken = "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";

async function fetchProductCollections(productId: string): Promise<any> {
  const url = `https://${shopDomain}//admin/api/2024-07/custom_collections.json?product_id=${productId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching collections: ${response.statusText}`);
    }

    const data = await response.json();
    return data.custom_collections; // Returns the collections associated with the product
  } catch (error) {
    console.error("Error:", error);
    return null; // Handle error as needed
  }
}

async function fetchProductCollects(productId: string): Promise<any> {
  const url = `https://${shopDomain}//admin/api/2024-07/collects.json?product_id=${productId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching collections: ${response.statusText}`);
    }

    const data = await response.json();
    return data.collects; // Returns the collections associated with the product
  } catch (error) {
    console.error("Error:", error);
    return null; // Handle error as needed
  }
}

// Function to fetch metafields for a specific product
async function fetchMetafields(productId: string) {
  const metafieldsUrl = `https://${shopDomain}/admin/api/2024-07/products/${productId}/metafields.json`;
  const response = await fetch(metafieldsUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching metafields: ${response.statusText}`);
  }

  return await response.json();
}

// Function to update a single metafield
async function updateMetafield(metafield: any) {
  const metafieldUrl = `https://${shopDomain}/admin/api/2024-07/metafields/${metafield.id}.json`;
  const response = await fetch(metafieldUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify({ metafield }),
  });

  if (!response.ok) {
    throw new Error(`Error updating metafield: ${response.statusText}`);
  }

  return await response.json();
}

export default defineEventHandler(async (event) => {
  const productId = event.context.params?.id;

  if (!productId) {
    return {
      error: "Product ID is required.",
    };
  }

  const apiUrl = `https://${shopDomain}/admin/api/2024-07/products/${productId}.json`;

  if (event.method === "PUT") {
    const body = await readBody(event); // Read the updated product data

    try {
      // Update product details
      const productResponse = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
        body: JSON.stringify({ product: body }), // Send the updated product data
      });

      if (!productResponse.ok) {
        throw new Error(
          `Error updating product: ${productResponse.statusText}`
        );
      }

      const updatedProduct = await productResponse.json();

      // Update metafields if provided in the body
      if (body.metafields && body.metafields.length > 0) {
        const metafieldPromises = body.metafields.map(updateMetafield);
        await Promise.all(metafieldPromises);
      }

      return updatedProduct; // Return the updated product data
    } catch (error) {
      console.error("Error updating product or metafields:", error); // Log error details
    }
  }

  // Fetch product details and metafields if method is GET
  try {
    const productResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    });

    if (!productResponse.ok) {
      throw new Error(`Error fetching product: ${productResponse.statusText}`);
    }

    const productData = await productResponse.json();

    // Fetch metafields
    const metafieldsData = await fetchMetafields(productId);
    const productCollections = await fetchProductCollections(productId);

    // Combine product and metafields data
    return {
      product: productData.product,
      metafields: metafieldsData.metafields,
      collections: productCollections,
      collects: await fetchProductCollects(productId),
    };
  } catch (error) {
    console.error("Error fetching product or metafields:", error); // Log error details
  }
});
