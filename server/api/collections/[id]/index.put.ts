import axios from "axios";
import config from "~/utils/config";
import { COLLECTION_METAFIELDS_DEFINED } from "../create/index.post";
import editCollectionProducts from "./edit-collection-products";

const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    throw new Error("Collection ID is missing");
  }
  const body = await readBody(event);
  const collection = body.collection;
  const metafields = [];
  for (const key of Object.keys(COLLECTION_METAFIELDS_DEFINED)) {
    const value = collection.metafields[key];
    if (value !== undefined) {
      metafields.push({
        ...COLLECTION_METAFIELDS_DEFINED[key],
        value,
      });
    }
  }
  const custom_collection = { ...collection, metafields };
  const { data } = await axios.put(
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

  const updatedCollection = data.custom_collection;

  await editCollectionProducts({
    id: updatedCollection.admin_graphql_api_id,
    addedIds: body.addedProductIds.map(
      (id: string) => `gid://shopify/Product/${id}`
    ),
    removedIds: body.removedProductIds.map(
      (id: string) => `gid://shopify/Product/${id}`
    ),
  });

  return updatedCollection;
});
