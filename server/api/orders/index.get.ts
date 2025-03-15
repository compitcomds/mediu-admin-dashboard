import { defineEventHandler } from "h3";
import shopifyClient from "~/server/helpers/shopify-graphql-client";

const ordersAfterQuery = `
query ordersAfterQuery($after: String, $query: String) {
  orders(first: 30, after: $after, query: $query){
    nodes{
      id: legacyResourceId
      createdAt
      displayFinancialStatus
      displayFulfillmentStatus
      customer{
        displayName
      }
      totalPriceSet{
        presentmentMoney{
          amount
          currencyCode
        }
      }
      lineItems(first: 100){
        nodes{
          id
        }
      }
    }
    pageInfo{
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
`;

const ordersBeforeQuery = `
query ordersBeforeQuery($before: String, $query: String) {
  orders(last: 30, before: $before, query: $query){
    nodes{
      id: legacyResourceId
      createdAt
      displayFinancialStatus
      displayFulfillmentStatus
      customer{
        displayName
      }
      totalPriceSet{
        presentmentMoney{
          amount
          currencyCode
        }
      }
      lineItems(first: 100){
        nodes{
          id
        }
      }
    }
    pageInfo{
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    const { data } = await shopifyClient.request({
      query: !!query.before ? ordersBeforeQuery : ordersAfterQuery,
      variables: {
        query: !!query.query ? `title:*${query.query}*` : null,
        after: query.after || null,
        before: query.before || null,
      },
    });
    const orders = data.data.orders;
    return {
      orders: orders.nodes,
      pageInfo: orders.pageInfo,
    };
  } catch (error: any) {
    console.log(error.response.data);
    return error;
  }
});
