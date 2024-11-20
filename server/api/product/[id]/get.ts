import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_GRAPHQL_API = `https://${config.shopifyDomain}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

const getProductByIdQuery = `
query getProductById($id: ID!) {
  product(id: $id) {
    title
    descriptionHtml
    tags
    status
    images(first: 100) {
      nodes {
        id
        url
        altText
      }
    }
    metafields(first: 100) {
      nodes {
        key
        value
      }
    }
    options {
      name
      id
      position
      optionValues {
        id
        name
      }
    }
    variants(first: 100) {
      nodes {
        id
        price
        compareAtPrice
        sku
        inventoryQuantity
        inventoryItem {
          id
          harmonizedSystemCode
        }
      }
    }
    collections(first: 100) {
      nodes {
        id
        title
      }
    }
  }
}
`;

export default async function getProductById(id: string) {
  const { data } = await axios.post(
    SHOPIFY_GRAPHQL_API,
    {
      query: getProductByIdQuery,
      variables: {
        id: `gid://shopify/Product/${id}`,
      },
    },
    {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );

  return data?.data.product;
}
