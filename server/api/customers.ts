import { defineEventHandler } from "h3";
import fetch from "node-fetch";
import config from "~/utils/config";

export default defineEventHandler(async (event) => {
  const apiUrl = `https://${config.shopifyDomain}/admin/api/2024-07/customers.json`;

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
        `Failed to fetch Shopify customers: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error };
  }
});
