import shopifyClient from "~/server/helpers/shopify-graphql-client";

const getAllProductsAfterQuery = `
query getAllProductsQuery($query: String, $after: String, $limit: Int!) {
  products(first: $limit, query: $query, after: $after) {
    nodes {
      id: legacyResourceId
      title
      handle
      tags
      priceRangeV2 {
        minVariantPrice {
          amount
          currencyCode
        }
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

const getAllProductsBeforeQuery = `
query getAllProductsQuery($query: String, $before: String, $limit: Int!) {
  products(last: $limit, query: $query, before: $before) {
    nodes {
      id: legacyResourceId
      title
      handle
      tags
      priceRangeV2 {
        minVariantPrice {
          amount
          currencyCode
        }
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
  const limit = parseInt(query.limit?.toString() || "30") || 30;
  try {
    const { data } = await shopifyClient.request({
      query: !!query.before
        ? getAllProductsBeforeQuery
        : getAllProductsAfterQuery,
      variables: {
        query: !!query.query ? query.query : null,
        after: query.after || null,
        before: query.before || null,
        limit,
      },
    });

    const products = data?.data?.products || [];
    return {
      products: products.nodes.map((prod: any) => ({
        ...prod,
        id: prod.id.toString(),
        price: parseFloat(prod.priceRangeV2?.minVariantPrice?.amount || "0"),
      })),
      pageInfo: products.pageInfo,
    };
  } catch (error: any) {
    console.log(error.response.data);
    return error;
  }
});
