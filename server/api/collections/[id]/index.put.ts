import axios from "axios";
import config from "~/utils/config";
import { COLLECTION_METAFIELDS_DEFINED } from "../../create-collections";

const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    throw new Error("Collection ID is missing");
  }
  const body = await readBody(event);
  const metafields = [];
  for (const key of Object.keys(COLLECTION_METAFIELDS_DEFINED)) {
    const value = body.metafields[key];
    if (value) {
      metafields.push({
        ...COLLECTION_METAFIELDS_DEFINED[key],
        value,
      });
    }
  }
  const custom_collection = { ...body, metafields };
  const response = await axios.put(
    `https://${config.shopifyDomain}/admin/api/2024-07/custom_collections/${id}.json`,
    {
      custom_collection,
    },
    {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.custom_collection;
});
