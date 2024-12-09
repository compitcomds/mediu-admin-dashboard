import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_GRAPHQL_API = `https://${config.shopifyDomain}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

const setProductMutation = `
mutation setProductMutation($input: ProductSetInput!) {
  productSet(input: $input, synchronous: true) {
    product {
      options {
        name
        values
      }
      variants(first: 100) {
        nodes {
          id
        }
      }
    }
    userErrors {
      field
      message
      code
    }
  }
}
`;

export default async function setProduct(
  id: string,
  product: {
    title: string;
    tags: string[];
    status: "ACTIVE" | "ARCHIVED" | "DRAFT";
    collections: string[];
    metafields: Array<{
      namespace: string;
      key: string;
      value: string;
      type: string;
    }>;
    descriptionHtml: string;
    productOptions: Array<{
      name: string;
      position?: number;
      values: Array<{ name: string }>;
    }>;
    variants: Array<{
      taxable: false;
      price: string;
      compareAtPrice: string;
      inventoryPolicy: "DENY" | "CONTINUE"; // can be used for backorder
      sku: string;
      optionValues: Array<{
        name: string;
        optionName: string;
        id?: string;
        optionId?: string;
      }>;
    }>;
  }
) {
  const { data } = await axios.post(
    SHOPIFY_GRAPHQL_API,
    {
      query: setProductMutation,
      variables: {
        input: { ...product, id: `gid://shopify/Product/${id}` },
      },
    },
    {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );

  const updatedProduct = data.data?.productSet?.product as {
    options: Array<{ name: string; values: string[] }>;
    variants: { nodes: Array<{ id: string }> };
  };

  return updatedProduct;
}
