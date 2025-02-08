import axios from "axios";
import config from "~/utils/config";

import { DEFINED_METAFIELDS } from "../add/index.post";

const SHOPIFY_BASE_API = `https://${config.shopifyDomain}/admin/api/2024-10`;
const SHOPIFY_API = `${SHOPIFY_BASE_API}/products`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;
const SHOPIFY_CUSTOM_COLLECTION_API = `${SHOPIFY_BASE_API}/custom_collections.json`;
const SHOPIFY_COLLECTS_API = `${SHOPIFY_BASE_API}/collects.json`;

async function fetchProductCollections(productId: string): Promise<any> {
  try {
    const { data } = await axios.get(
      `${SHOPIFY_CUSTOM_COLLECTION_API}?product_id=${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
      },
    );

    return data.custom_collections;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function fetchProductCollects(productId: string): Promise<any> {
  try {
    const { data } = await axios.get(
      `${SHOPIFY_COLLECTS_API}?product_id=${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
      },
    );
    return data.collects;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function fetchMetafields(productId: string) {
  const metafieldsUrl = `${SHOPIFY_API}/${productId}/metafields.json`;
  const { data } = await axios.get(metafieldsUrl, {
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": config.shopifyAccessToken,
    },
  });

  const metafields: Record<string, any> = {};

  for (const objKey of Object.keys(DEFINED_METAFIELDS)) {
    const obj = DEFINED_METAFIELDS[objKey];
    metafields[objKey] =
      data.metafields.find((field: any) => field.key === obj.key)?.value || "";
  }
  return metafields;
}

async function fetchHSNCode(inventoryItemId: string) {
  const apiUrl = `${SHOPIFY_BASE_API}/inventory_items/${inventoryItemId}.json`;
  const { data } = await axios.get(apiUrl, {
    headers: { "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN },
  });

  return data.inventory_item.harmonized_system_code;
}

export default defineEventHandler(async (event) => {
  const productId = event.context.params?.id;
  if (!productId) throw new Error("Product id not provided.");
  const { data } = await axios.get(`${SHOPIFY_API}/${productId}.json`, {
    headers: { "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN },
  });
  const metafields = await fetchMetafields(productId);
  const collections = await fetchProductCollections(productId);
  const collects = await fetchProductCollects(productId);
  const hsnCode = await fetchHSNCode(
    data.product.variants[0].inventory_item_id,
  );

  return { ...data, metafields, collections, collects, hsnCode };
});
