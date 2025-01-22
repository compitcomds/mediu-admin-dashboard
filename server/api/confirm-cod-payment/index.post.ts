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

  if (header !== SHIPROCKET_CONFIRM_COD_TOKEN) {
    console.log("COD CONFIRM: Invalid access");
    return "Invalid Access";
  }

  if (body.current_status.toLowerCase() !== "delivered") {
    console.log("COD CONFIRM: Invalid status");
    return "Invalid Status";
  }

  try {
    const orderId = body.channel_order_id;
    await shopifyClient.request({
      query: orderMarkAsPaidMutation,
      variables: { orderId: `gid://shopify/Order/${orderId}` },
    });
    console.log(`Marked as paid: ${orderId}`);
    return `Marked as paid: ${orderId}`;
  } catch (error) {
    console.error(error);
  }
  return "Executed with error!!";
});
