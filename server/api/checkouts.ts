import { defineEventHandler } from "h3";
import fetch from "node-fetch";
import config from "~/utils/config";

export default defineEventHandler(async () => {
  const apiUrl = `https://${config.shopifyDomain}/admin/api/2024-07/checkouts.json`;

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
        `Failed to fetch Shopify checkouts: ${response.statusText}`
      );
    }

    const data = await response.json();
    return { checkouts: data.checkouts };
  } catch (error) {
    return { error: error };
  }
});
