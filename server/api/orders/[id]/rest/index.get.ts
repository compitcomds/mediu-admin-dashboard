import { defineEventHandler } from "h3";
import axios from "axios";
import config from "~/utils/config";

export default defineEventHandler(async (event) => {
  const params = event.context.params as Record<string, string>;
  const id = params.id;

  if (!id) {
    return { error: "Order ID not provided" };
  }

  const shopifyOrderUrl = `https://${config.shopifyDomain}/admin/api/2024-07/orders/${id}.json`;
  const orderMetafieldUrl = `https://${config.shopifyDomain}/admin/api/2024-07/orders/${id}/metafields.json`;

  try {
    const orderResponse = await axios.get(shopifyOrderUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": config.shopifyAccessToken,
      },
    });

    const orderMetafields = await axios.get(orderMetafieldUrl, {
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
      order: { ...order, metafields: orderMetafields.data.metafields },
    };
  } catch (error) {
    console.error("Error fetching order:", error || error);
    return { error: "Unable to fetch order data." };
  }
});
