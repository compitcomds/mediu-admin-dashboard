import shopifyClient from "~/server/helpers/shopify-graphql-client";

const orderCancelMutation = `
mutation orderCancelMutation($orderId: ID!) {
  orderCancel(
    orderId: $orderId
    reason: OTHER
    refund: false
    restock: true
    notifyCustomer: true
  ) {
    job {
      done
    }
    orderCancelUserErrors {
      code
      field
      message
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as Record<string, string>;
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Order ID is required",
    });
  }

  const { data } = await shopifyClient.request({
    query: orderCancelMutation,
    variables: { orderId: `gid://shopify/Order/${id}` },
  });
  const orderCancelUserErrors = data.data.orderCancel.orderCancelUserErrors;
  if (orderCancelUserErrors.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: orderCancelUserErrors
        .map((error: any) => error.message)
        .join(", "),
    });
  }
  return {
    success: true,
  };
});
