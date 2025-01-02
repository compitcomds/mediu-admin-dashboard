import shopifyClient from "~/server/helpers/shopify-graphql-client";

const customerCountQuery = `
query totalCustomerQuery($query: String = "") {
  customersCount(query: $query) {
    count
  }
}`;

export default async function fetchCustomerCount() {
  const { data } = await shopifyClient.request({ query: customerCountQuery });
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const { data: currentDayCustomers } = await shopifyClient.request({
    query: customerCountQuery,
    variables: { query: `created_at:${formattedDate}` },
  });
  return {
    total: data.data.customersCount.count,
    today: currentDayCustomers.data.customersCount.count,
  };
}
