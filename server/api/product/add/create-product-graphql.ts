// CURRENTLY NOT BEING USED ANYWHERE

import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_GRAPHQL_API = `https://${config.shopifyDomain}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

const createProductMutation = `
mutation createNewProductMutation($title: String!, $tags: [String!], $descriptionHtml: String = "", $metafields: [MetafieldInput!] = {}, $collectionsToJoin: [ID!], $productOptions: [OptionCreateInput!], $handle: String) {
  productCreate(
    product: {title: $title, tags: $tags, descriptionHtml: $descriptionHtml, metafields: $metafields, collectionsToJoin: $collectionsToJoin, productOptions: $productOptions, handle: $handle}
  ) {
    product {
      id
      handle
    }
  }
}
`;

export default function createNewProduct(product: {
  title: string;
  tags: string[];
  descriptionHtml: string;
  metafields: Array<{
    namespace: string;
    key: string;
    value: string;
    type: string;
  }>;
  collectionsToJoin: string[];
  productOptions: Array<{
    name: string;
    position?: number;
    values: Array<{ name: string }>;
  }>;
  handle?: string;
}) {}
