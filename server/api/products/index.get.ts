import shopifyClient from "~/server/helpers/shopify-graphql-client";

const getAllProductsAfterQuery = `
query getAllProductsQuery($query: String, $after: String) {
  products(first: 50, query: $query, after: $after) {
    nodes {
      id
      featuredImage {
        url
        altText
        height
        width
      }
      title
      status
      totalInventory
      productType
      vendor
      variants(first: 100) {
        nodes {
          legacyResourceId
          sku
          inventoryQuantity
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
query getAllProductsQuery($query: String, $before: String) {
  products(last: 50, query: $query, before: $before) {
    nodes {
      id
      featuredImage {
        url
        altText
        height
        width
      }
      title
      status
      totalInventory
      productType
      vendor
      variants(first: 100) {
        nodes {
          legacyResourceId
          sku
          inventoryQuantity
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
  try {
    const { data } = await shopifyClient.request({
      query: !!query.before
        ? getAllProductsBeforeQuery
        : getAllProductsAfterQuery,
      variables: {
        query: !!query.query ? `title:*${query.query}*` : null,
        after: query.after || null,
        before: query.before || null,
      },
    });
    const products = data.data.products;
    return {
      products: products.nodes.map((prod: any) => ({
        ...prod,
        id: prod.id.replace("gid://shopify/Product/", ""),
        variants: prod.variants.nodes,
      })),
      pageInfo: products.pageInfo,
    };
  } catch (error: any) {
    console.log(error.response.data);
    return error;
  }
});
