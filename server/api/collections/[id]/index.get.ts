import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_GRAPHQL_API = `https://${config.shopifyDomain}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

const getCollectionQuery = `
query getCollectionQuery($handle: String!, $after: String) {
  collectionByHandle(handle: $handle) {
    id
    title
    descriptionHtml
    productsCount {
      count
    }
    image {
      url
      altText
      height
      width
    }
    products(first: 100, after: $after) {
      nodes {
        title
        product_id: legacyResourceId
      }
    }
    isBrandCollection: metafield(key: "isBrandCollection", namespace: "custom") {
      value
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    throw new Error("Collection ID is missing");
  }

  const { data } = await axios.post(
    SHOPIFY_GRAPHQL_API,
    {
      query: getCollectionQuery,
      variables: {
        handle: id,
      },
    },
    {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );

  const collection = data?.data?.collectionByHandle;

  if (collection) {
    return {
      ...collection,
      metafields: {
        isBrandCollection: collection.isBrandCollection?.value === "true",
      },
      productsCount: collection.productsCount?.count,
      id: collection.id.replace("gid://shopify/Collection/", ""),
      products: collection.products.nodes,
    };
  }
  throw new Error("Collection with provided slug could not be found.");
});
