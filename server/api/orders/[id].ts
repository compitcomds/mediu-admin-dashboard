import { defineEventHandler } from "h3";
import axios from "axios";
import config from "~/utils/config";
export default defineEventHandler(async (event) => {
  try {
    const params = event.context.params as Record<string, string>;
    const id = params.id;

    if (!id) {
      return { error: "Order ID not provided" };
    }

    const shopifyUrl = `https://${config.shopifyDomain}/admin/api/2024-07/orders/${id}.json`;

    console.log("Fetching order data from:", shopifyUrl);
    console.log("Using access token:", config.shopifyAccessToken);

    const response = await axios.get(shopifyUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": config.shopifyAccessToken,
      },
    });

    console.log("API response data:", response.data);

   
    if (response.data && response.data.order) {
      return response.data;
    } else {
      console.error("Unexpected response structure:", response.data);
    }
  } catch (error) {

    console.error("Error fetching order data:", error || error);
    if (error) {
      console.error("Error details:", error);
    }
    return { error: "Unable to fetch order data" };
  }
});
