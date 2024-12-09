import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_GRAPHQL_API = `https://${config.shopifyDomain}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

const mutation = `
mutation editCollectionProducts($id: ID!, $addedIds: [ID!]!, $removedIds: [ID!]!) {
  collectionAddProducts(id: $id, productIds: $addedIds) {
    collection {
      id
    }
  }
  collectionRemoveProducts(id: $id, productIds: $removedIds) {
    job {
      done
    }
  }
}
`;

export default async function editCollectionProducts(variables: {
  id: string;
  addedIds: string[];
  removedIds: string[];
}) {
  const { data } = await axios.post(
    SHOPIFY_GRAPHQL_API,
    {
      query: mutation,
      variables,
    },
    {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );
}
