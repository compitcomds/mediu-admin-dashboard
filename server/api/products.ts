import { defineEventHandler, readBody } from "h3";
import fetch from "node-fetch";

// Define the type for the image object if needed
interface ProductImage {
  attachment: string;
}

const shopDomain = "dev-mediu.myshopify.com";
const accessToken = "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";
const apiUrl = `https://${shopDomain}/admin/api/2024-07/products.json`;
const collectionsApiUrl = `https://${shopDomain}/admin/api/2024-07/custom_collections.json`;

export default defineEventHandler(async (event) => {
  if (event.req.method === "GET") {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch Shopify products: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return { error: error };
    }
  } else if (event.req.method === "POST") {
    try {
      const { product, productImages } = await readBody(event);

      // Fetch collections if needed
      const collectionsResponse = await fetch(collectionsApiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
      });
      const collectionsData = await collectionsResponse.json();

      const selectedCollection = collectionsData.custom_collections.find(
        (collection:any) => collection.title === product.category
      );

      const newProduct = {
        product: {
          title: product.title,
          images: productImages.map((image: string) => ({ // Explicitly declare the type
            attachment: image.split(",")[1],
          })),
          metafields: product?.metafields || [],
          variants: [
            {
              price: product.price,
              inventory_management: "shopify",
              inventory_quantity: parseInt(product.quantity),
              product_type: product.category || "",
            },
          ],
          collections: selectedCollection ? [{ id: selectedCollection.id }] : [],
        },
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(`Failed to create product: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return { error: error };
    }
  }
});
