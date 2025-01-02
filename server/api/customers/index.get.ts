import shopifyClient from "~/server/helpers/shopify-graphql-client";

const customersAfterQuery = `
query customersAfterQuery($after: String = "") {
  customers(first: 30, after: $after) {
    nodes {
      id: legacyResourceId
      displayName
      email
      createdAt
      numberOfOrders
      amountSpent {
        amount
        currencyCode
      }
      defaultAddress {
        province
        country
        city
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}`;

const customersBeforeQuery = `
query customersQuery($before: String = "") {
  customers(last: 30, before: $before) {
    nodes {
      id: legacyResourceId
      displayName
      email
      numberOfOrders
      amountSpent {
        amount
        currencyCode
      }
      defaultAddress {
        province
        country
        city
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { data } = await shopifyClient.request({
    query: !!query.before ? customersBeforeQuery : customersAfterQuery,
    variables: {
      after: query.after || null,
      before: query.before || null,
    },
  });
  const customers = data.data.customers;
  return { customers: customers.nodes, pageInfo: customers.pageInfo };
});
