import axios from "axios";
import config from "~/utils/config";

const apiUrl = `https://${config.shopifyDomain}/admin/api/2024-07/products.json`;

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
  }
});
