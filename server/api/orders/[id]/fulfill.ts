import { defineEventHandler } from "h3";
import axios from "axios";
import config from "~/utils/config";
import sendOrderConfirmationMail from "~/server/helpers/mail/order-confirmation-mail";

export default defineEventHandler(async (event) => {
  const params = event.context.params as Record<string, string>;
  const id = params.id;
  const body = await readBody(event);
  const email = body.email;
  const orderName = body?.orderName || "";

  if (!id) {
    return { error: "Order ID not provided" };
  }

  try {
    const getFullfillmentIdUrl = `https://${config.shopifyDomain}/admin/api/2024-07/orders/${id}/fulfillment_orders.json`;
    const { data: orderFulfillmentData } = await axios.get(
      getFullfillmentIdUrl,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
      },
    );

    if (orderFulfillmentData.fulfillment_orders.length === 0)
      throw new Error("Invalid order.");

    const fulfillment_order_id = orderFulfillmentData.fulfillment_orders[0].id;

    const fulfillmentUrl = `https://${config.shopifyDomain}/admin/api/2024-07/fulfillments.json`;
    const { data: fulfillmentResponse } = await axios.post(
      fulfillmentUrl,
      {
        fulfillment: {
          line_items_by_fulfillment_order: [
            {
              fulfillment_order_id,
            },
          ],
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
      },
    );

    const fulfillment = fulfillmentResponse.fulfillment;
    if (!fulfillment) {
      return { error: "Unable to fulfill order." };
    }

    await sendOrderConfirmationMail(email, orderName);

    return fulfillment;
  } catch (error) {
    console.error("Error fulfilling order:", error || error);
    return { error: "Unable to fulfill order." };
  }
});
