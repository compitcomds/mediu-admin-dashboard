import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_GRAPHQL_API = `https://${config.shopifyDomain}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

const fetchProductTagsQuery = `
query fetchProductTagsQuery {
  shop {
    productTags(first: 100) {
      edges {
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
    const { data } = await axios.post(
      SHOPIFY_GRAPHQL_API,
      { query: fetchProductTagsQuery },
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.shop.productTags;
  } catch (error: any) {
    console.log(error.response.data);
    return error;
  }
});
