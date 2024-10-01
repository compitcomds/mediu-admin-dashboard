import { defineEventHandler } from "h3";
import axios from "axios";
import config from "~/utils/config";

export default defineEventHandler(async (event) => {
  const params = event.context.params as Record<string, string>;
  console.log("Params:", params); // Log the parameters to check what's coming through
  const id = params.id;

  if (!id) {
    console.error("Order ID not provided");
    return { error: "Order ID not provided" };
  }

  const shopifyOrderUrl = `https://${config.shopifyDomain}/admin/api/2024-07/orders/${id}.json`;

  console.log("Shopify Order URL:", shopifyOrderUrl);

  try {
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

    return {
      order,
    };
  } catch (error) {
    console.error("Error fetching order:", error || error);
    return { error: "Unable to fetch order data." };
  }
});
