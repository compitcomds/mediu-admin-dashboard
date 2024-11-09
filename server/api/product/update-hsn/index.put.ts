import axios from "axios";

import config from "~/utils/config";

const SHOPIFY_API = `https://${config.shopifyDomain}/admin/api/2024-10/inventory_items`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.inventoryItemId || !body.hsnCode)
    return { error: "Please provide a valid hsn code." };

  try {
    const { data } = await axios.put(
      `${SHOPIFY_API}/${body.inventoryItemId}.json`,
      {
        inventory_item: {
          id: body.inventoryItemId,
          harmonized_system_code: body.hsnCode,
          country_code_of_origin: "IN",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        },
      }
    );

    return {};
  } catch (error: any) {
    return {
      error: "Unable to update the HSN code. Please enter a valid HSN code.",
    };
  }
});
