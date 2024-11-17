import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_GRAPHQL_API = `https://${config.shopifyDomain}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

const setProductMutation = `
mutation setProductMutation($id: ID!, $productOptions: [OptionSetInput!], $variants: [ProductVariantSetInput!], $title: String, $tags: [String!], $status: ProductStatus, $metafields: [MetafieldInput!], $descriptionHtml: String) {
  productSet(
    input: {id: $id, productOptions: $productOptions, variants: $variants, title: $title, tags: $tags, status: $status, metafields: $metafields, descriptionHtml: $descriptionHtml}
    synchronous: true
  ) {
    product {
      options {
        name
        values
      }
      variants(first: 100) {
        nodes {
          id
          inventoryItem {
            id
          }
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
        id: `gid://shopify/Product/${id}`,
        ...product,
      },
    },
    {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );

  console.log(data);

  const updatedProduct = data.data?.productSet?.product as {
    options: Array<{ name: string; values: string[] }>;
    variants: { nodes: Array<{ id: string; inventoryItem: { id: string } }> };
  };

  return updatedProduct;
}
