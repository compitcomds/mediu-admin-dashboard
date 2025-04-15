import shopifyClient from "~/server/helpers/shopify-graphql-client";

const query = `
query allCollectionsCount {
  collectionsCount {
    count
  }
}
`;

export default defineEventHandler(async (event) => {
  const { data } = await shopifyClient.request({ query });
  return data?.data?.collectionsCount || { count: 0 };
});
