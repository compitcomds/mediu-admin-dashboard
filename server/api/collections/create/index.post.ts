import { defineEventHandler, readBody } from "h3"; // Import readBody instead of useBody
import axios from "axios";
import config from "~/utils/config";
import publishCollectionToAllPublications from "./publishCollection";

export const COLLECTION_METAFIELDS_DEFINED: Record<
  string,
  { key: string; type: string; namespace: "custom" }
> = {
  isBrandCollection: {
    key: "isBrandCollection",
    type: "boolean",
    namespace: "custom",
  },
};

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const metafields = [];
    for (const key of Object.keys(COLLECTION_METAFIELDS_DEFINED)) {
      const value = body.metafields[key];
      if (value !== undefined) {
        metafields.push({
          ...COLLECTION_METAFIELDS_DEFINED[key],
          value,
        });
      }
    }
    const custom_collection = { ...body, metafields };

    const apiUrl = `https://${config.shopifyDomain}/admin/api/2024-07/custom_collections.json`;

    const response = await axios.post(
      apiUrl,
      { custom_collection },
      {
        headers: {
          "X-Shopify-Access-Token": config.shopifyAccessToken,
          "Content-Type": "application/json",
        },
      }
    );

    const collection = response.data.custom_collection;
    await publishCollectionToAllPublications(collection.admin_graphql_api_id);
    return collection;
  } catch (error: any) {
    console.error("Error creating collection: ", error);
    throw new Error("Failed to create collection");
  }
});
