import shopifyClient from "~/server/helpers/shopify-graphql-client";

const SHIPROCKET_CONFIRM_COD_TOKEN = process.env
  .SHIPROCKET_CONFIRM_COD_TOKEN as string;

const orderMarkAsPaidMutation = `
mutation markOrderAsPaid($orderId: ID!) {
  orderMarkAsPaid(input: {id: $orderId}) {
    order {
      displayFinancialStatus
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const header = getHeader(event, "x-api-key");

  if (header !== SHIPROCKET_CONFIRM_COD_TOKEN) return "Invalid Access";

  if (body.current_status.toLowerCase() !== "delivered")
    return "Invalid Status";

  try {
    const orderId = body.channel_order_id;
    await shopifyClient.request({
      query: orderMarkAsPaidMutation,
      variables: { orderId: `gid://shopify/Order/${orderId}` },
    });
  } catch (error) {
    console.error(error);
  }

  return "Executed Successfully";
});
