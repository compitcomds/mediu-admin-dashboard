import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_GRAPHQL_API = `https://${config.shopifyDomain}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

const PUBLICATION_IDS = [
  "gid://shopify/Publication/114952798281", // online store
  "gid://shopify/Publication/114952896585", // point of sale
  "gid://shopify/Publication/115372490825", // headless
  "gid://shopify/Publication/115372523593", // shopify graphql app
];

const publishMutation = `
mutation publishMutation($id: ID!, $input: [PublicationInput!]!) {
  publishablePublish(id: $id, input: $input) {
    publishable {
      publicationCount
    }
    userErrors {
      field
      message
    }
  }
}
`;

export default async function publishCollectionToAllPublications(id: string) {
  await axios.post(
    SHOPIFY_GRAPHQL_API,
    {
      query: publishMutation,
      variables: {
        id,
        input: PUBLICATION_IDS.map((i) => ({
          publicationId: i,
        })),
      },
    },
    {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );
  return true;
}
