import shopifyClient from "~/server/helpers/shopify-graphql-client";

const ordersCountQuery = `
query getOrdersCount {
  ordersCount {
    count
  }
}
`;

const getCurrentDayOrderCountQuery = `
query getCurrentDayOrderCountQuery($query: String!) {
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
    query: getCurrentDayOrderCountQuery,
    variables: { query: `created_at:${formattedDate}` },
  });
  return {
    totalOrders: data.data.ordersCount.count,
    currentDayOrders: currentDayOrders.data.ordersCount.count,
  };
}
