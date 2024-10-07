import { defineEventHandler, readBody } from "h3";
import fetch from "node-fetch";

const shopDomain = "dev-mediu.myshopify.com";
const accessToken = "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";
const apiUrl = `https://${shopDomain}/admin/api/2024-07/products.json`;

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
      const { product, productImages } = await readBody(event);
      const newProduct = {
        product: {
          title: product.title,
          images: productImages.map((image: any) => ({
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
