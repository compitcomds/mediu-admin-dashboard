import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_GRAPHQL_API = `https://${config.shopifyDomain}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

const getAllProductOptionsAndVariantsQuery = `
query getAllProductOptions($id: ID!) {
  product(id: $id) {
    variantsCount {
      count
    }
    options {
      id
      name
      position
      optionValues {
        id
        name
      }
    }
    variants(first: 100) {
      nodes {
        price
        sku
        compareAtPrice
        inventoryItem {
          harmonizedSystemCode
        }
      }
    }
  }
}
`;

export default async function getAllProductOptionsAndVariants(id: string) {
  const { data } = await axios.post(
    SHOPIFY_GRAPHQL_API,
    {
      query: getAllProductOptionsAndVariantsQuery,
      variables: { id: `gid://shopify/Product/${id}` },
    },
    {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );
  const product = data.data.product as null | {
    variantsCount: { count: number };
    options: Array<{
      id: string;
      name: string;
      position: number;
      optionValues: Array<{ id: string; name: string }>;
    }>;
    variants: {
      nodes: Array<{
        price: string;
        compareAtPrice: string;
        sku: string;
        inventoryItem: { harmonizedSystemCode: string };
      }>;
    };
  };

  if (!product) return null;

  return {
    ...product,
    variantsCount: product.variantsCount.count,
    variants: product.variants.nodes.map((node) => ({
      ...node,
      harmonizedSystemCode: node.inventoryItem.harmonizedSystemCode,
    })),
  };
}
