import { defineEventHandler } from "h3";
import axios from "axios";
import config from "~/utils/config";

export default defineEventHandler(async (event) => {
  const { req } = event;
  const params = event.context.params as Record<string, string>;
  const orderId = params.id;

  if (req.method === "POST") {
    try {
      // Step 1: Fetch fulfillment orders
      const fulfillmentOrdersUrl = `https://${config.shopifyDomain}/admin/api/2024-07/orders/${orderId}/fulfillment_orders.json`;

      const fulfillmentOrdersResponse = await axios.get(fulfillmentOrdersUrl, {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
      });

      const fulfillmentOrders =
        fulfillmentOrdersResponse.data.fulfillment_orders;

      if (!fulfillmentOrders || fulfillmentOrders.length === 0) {
        console.error("No fulfillment orders found for this order");
        return { error: "No fulfillment orders found for this order" };
      }

      // Get the correct location ID from the fulfillment orders
      const locationId = fulfillmentOrders[0].assigned_location_id;

      if (!locationId) {
        console.error("No assigned location ID found for this order");
        return { error: "No assigned location ID found for this order" };
      }

      // Step 2: Create fulfillment using location_id
      const fulfillmentsUrl = `https://${config.shopifyDomain}/admin/api/2024-07/orders/${orderId}/fulfillments.json`;

      const fulfillmentResponse = await axios.post(
        fulfillmentsUrl,
        {
          fulfillment: {
            location_id: locationId, // Pass the location ID dynamically
            notify_customer: true, // Optionally notify customer
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": config.shopifyAccessToken,
          },
        }
      );

      // Log the API response for debugging
      console.log("Fulfillment API response:", fulfillmentResponse.data);

      if (fulfillmentResponse.data && fulfillmentResponse.data.fulfillment) {
        console.log(
          "Fulfillment created successfully:",
          fulfillmentResponse.data
        );
        return {
          success: true,
          fulfillment: fulfillmentResponse.data.fulfillment,
        };
      } else {
        console.error(
          "Unexpected response from Shopify:",
          fulfillmentResponse.data
        );
        return { error: "Unexpected response from Shopify" };
      }
    } catch (error) {
      // Log error response details
      console.error("Error creating fulfillment:", error || error);
      return { error: error || "Unable to fulfill the order" };
    }
  } else {
    return { error: "Invalid request method" };
  }
});
