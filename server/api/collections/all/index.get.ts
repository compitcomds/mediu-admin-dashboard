import shopifyClient from "~/server/helpers/shopify-graphql-client";

const getAllCollectionsAfterQuery = `
query getAllCollectionsQuery($query: String, $after: String) {
  collections(first: 20, query: $query, after: $after) {
    nodes {
      id
      handle
      title
      isBrandCollection: metafield(key: "isBrandCollection", namespace: "custom") {
        value
      }
      productsCount {
        count
      }
      description(truncateAt: 50)
      image {
        url
        altText
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

const getAllCollectionsBeforeQuery = `
query getAllCollectionsQuery($query: String, $before: String) {
  collections(last: 20, query: $query, before: $before) {
    nodes {
      id
      handle
      title
      isBrandCollection: metafield(key: "isBrandCollection", namespace: "custom") {
        value
      }
      productsCount {
        count
      }
      description(truncateAt: 50)
      image {
        url
        altText
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
    query: !!query.before
      ? getAllCollectionsBeforeQuery
      : getAllCollectionsAfterQuery,
    variables: {
      query: !!query.query ? query.query : null,
      after: query.after || null,
      before: query.before || null,
    },
  });

  const collections = data?.data?.collections;
  return {
    collections: collections.nodes.map((node: any) => ({
      ...node,
      id: node.id.replace("gid://shopify/Collection/", ""),
      isBrandCollection: node.isBrandCollection?.value === "true",
      productsCount: node.productsCount.count,
    })),
    pageInfo: collections.pageInfo,
  };
});
