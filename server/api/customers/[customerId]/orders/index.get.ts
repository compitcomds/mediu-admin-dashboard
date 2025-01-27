import shopifyClient from "~/server/helpers/shopify-graphql-client";

const query = `
query getCustomerOrders($id: ID!) {
  customer(id: $id) {
    orders(first: 10, sortKey: CREATED_AT, reverse: true) {
      nodes {
        id: legacyResourceId
        cancelledAt
        createdAt
        displayFulfillmentStatus
        totalPriceSet{
          presentmentMoney{
            amount
            currencyCode
          }
        }
        lineItems(first: 10) {
          nodes{
            quantity
            title
          }
        }
      }
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const customerId = event.context.params?.customerId;
  if (!customerId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Customer ID is required",
    });
  }
  const { data } = await shopifyClient.request({
    query,
    variables: { id: `gid://shopify/Customer/${customerId}` },
  });
  const customer = data.data.customer;
  if (!customer) {
    throw createError({
      statusCode: 404,
      statusMessage: "Customer not found",
    });
  }
  const orders = customer.orders.nodes;
  return orders.map((order: any) => ({
    ...order,
    items: order.lineItems.nodes,
    totalPriceSet: order.totalPriceSet.presentmentMoney,
    status: order.cancelledAt ? "CANCELLED" : order.displayFulfillmentStatus,
  }));
});
