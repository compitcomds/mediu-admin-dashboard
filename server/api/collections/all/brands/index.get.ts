import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_GRAPHQL_API = `https://${config.shopifyDomain}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

const getAllCollectionsQuery = `
query getAllCollectionsQuery {
  collections(first: 250) {
    nodes {
      id: legacyResourceId
      isBrandCollection: metafield(key: "isBrandCollection", namespace: "custom") {
        value
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
  const { data } = await axios.post(
    SHOPIFY_GRAPHQL_API,
    {
      query: getAllCollectionsQuery,
    },
    {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );

  const collections = data?.data?.collections;
  return {
    collections: collections.nodes
      .filter((node: any) => node.isBrandCollection?.value === "true")
      .map((node: any) => node.id),
    pageInfo: collections.pageInfo,
  };
});
