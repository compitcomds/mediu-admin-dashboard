import { defineEventHandler } from "h3";
import fetch from "node-fetch";
import config from "~/utils/config";

export default defineEventHandler(async (event) => {
  // Use optional chaining and type assertion to get customerId
  const customerId = event.context.params?.customerId as string;

  if (!customerId) {
    // If customerId is not available, return an error
    return { error: "Customer ID is required." };
  }

  const apiUrl = `https://${config.shopifyDomain}/admin/api/2024-07/orders.json?customer_id=${customerId}`;

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
        `Failed to fetch orders for customer ${customerId}: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error };
  }
});
