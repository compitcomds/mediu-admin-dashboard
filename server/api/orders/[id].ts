import { defineEventHandler } from "h3";
import axios from "axios";
import config from "~/utils/config";

export default defineEventHandler(async (event) => {
  const params = event.context.params as Record<string, string>;
  const id = params.id;

  if (!id) {
    return { error: "Order ID not provided" };
  }

  // Shopify API URL to fetch order data
  const shopifyOrderUrl = `https://${config.shopifyDomain}/admin/api/2024-07/orders/${id}.json`;

  try {
    // Fetch order details
    const orderResponse = await axios.get(shopifyOrderUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": config.shopifyAccessToken,
      },
    });

    const order = orderResponse.data.order;
    if (!order) {
      return { error: "Order not found" };
    }

    // Return the order data in the expected format
    return {
      order, // this is the correct format expected by the frontend
    };

  } catch (error) {
    console.error("Error fetching order:", error);
    return { error: "Unable to fetch order data." };
  }
});
