import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_GRAPHQL_API = `https://${config.shopifyDomain}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

const getProductCountQuery = `
query getProductCountQuery {
  productsCount {
    count
  }
}
`;

export default defineEventHandler(async (event: any) => {
  try {
    const { data } = await axios.post(
      SHOPIFY_GRAPHQL_API,
      { query: getProductCountQuery },
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.productsCount.count;
  } catch (error: any) {
    console.log(error.response.data);
    return error;
  }
});
