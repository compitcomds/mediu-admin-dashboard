import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_GRAPHQL_API = `https://${config.shopifyDomain}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

class ShopifyClient {
  async request({ query, variables }: { query: string; variables?: any }) {
    return await axios.post(
      SHOPIFY_GRAPHQL_API,
      {
        query,
        variables: variables || {},
      },
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
  }
}

const shopifyClient = new ShopifyClient();

export default shopifyClient;
