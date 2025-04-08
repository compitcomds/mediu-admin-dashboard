import shopifyClient from "~/server/helpers/shopify-graphql-client";

const fetchProductTagsQuery = `
query fetchProductTagsQuery {
  shop {
    productTags(first: 250) {
      edges{
        node
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  try {
    const { data } = await shopifyClient.request({
      query: fetchProductTagsQuery,
    });
    return data.data.shop.productTags;
  } catch (error: any) {
    console.log(error);
    return error;
  }
});
