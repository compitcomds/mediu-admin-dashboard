import { defineEventHandler } from "h3";
import axios from "axios";
import config from "~/utils/config";

export default defineEventHandler(async (event) => {
  const params = event.context.params as Record<string, string>;
  const id = params.id;

  if (!id) {
    return { error: "Order ID not provided" };
  }

  const fulfillmentUrl = `https://${config.shopifyDomain}/admin/api/2024-07/orders/${id}/fulfillments.json`;

  console.log("Fulfillment URL:", fulfillmentUrl); // Log the request URL

  try {
    const fulfillmentResponse = await axios.post(
      fulfillmentUrl,
      {
        fulfillment: {
          location_id: 69352587337,  // Ensure this is a valid location_id
          notify_customer: true,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
      }
    );

    console.log("Fulfillment Response:", fulfillmentResponse.data); // Log the response

    const fulfillment = fulfillmentResponse.data.fulfillment;
    if (!fulfillment) {
      return { error: "Unable to fulfill order." };
    }

    return { fulfillment };
  } catch (error) {
    console.error("Error fulfilling order:", error || error); // Log the error response
    return { error: "Unable to fulfill order." };
  }
});
