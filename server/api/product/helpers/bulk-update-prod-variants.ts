import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_GRAPHQL_API = `https://${config.shopifyDomain}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

const bulkpdateProductVariantsMutation = `
mutation bulkUpdateProductVariants($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
  productVariantsBulkUpdate(productId: $productId, variants: $variants, allowPartialUpdates: true) {
    product {
      id
    }
  }
}
`;

export default async function bulkpdateProductVariants(
  productId: string,
  variants: Array<{
    id: string;
    inventoryItem?: {
      harmonizedSystemCode?: string;
      countryCodeOfOrigin?: "IN";
    };
  }>
) {
  const { data } = await axios.post(
    SHOPIFY_GRAPHQL_API,
    {
      query: bulkpdateProductVariantsMutation,
      variables: {
        productId,
        variants,
      },
    },
    {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );

  return data.data;
}
