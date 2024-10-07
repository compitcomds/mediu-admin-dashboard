import { defineEventHandler } from "h3";
import fetch from "node-fetch";

const shopDomain = "admin.shopify.com";
const accessToken = "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";

export default defineEventHandler(async () => {
  const apiUrl = `https://${shopDomain}/admin/api/2024-07/orders.json?status=any`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Shopify orders: ${response.statusText}`);
    }

    const data = await response.json();
    return { orders: data.orders };
  } catch (error) {
    return { error: error };
  }
});
