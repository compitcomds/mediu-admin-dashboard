import shopifyClient from "~/server/helpers/shopify-graphql-client";

const ordersCountQuery = `
query getCurrentDayOrderCountQuery($query: String) {
  ordersCount(query: $query) {
    count
    precision
  }
}
`;

export default async function fetchOrderCount() {
  const { data } = await shopifyClient.request({ query: ordersCountQuery });
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const { data: currentDayOrders } = await shopifyClient.request({
    query: ordersCountQuery,
    variables: { query: `created_at:${formattedDate}` },
  });
  return {
    total: data.data.ordersCount.count,
    today: currentDayOrders.data.ordersCount.count,
  };
}
