import axios from "axios";
import config from "~/utils/config";
import { DEFINED_METAFIELDS } from "../add/index.post";

const PRODUCTION_API = process.env.VITE_PRODUCTION_API;
const SHOPIFY_API = `https://${config.shopifyDomain}/admin/api/2024-10/products`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

export default defineEventHandler(async (event) => {
  const productId = event.context.params?.id;
  if (!productId) throw new Error("Product id not provided.");

  const body = await readBody(event);
  const errors: string[] = [];

  try {
    const metafields: any[] = [];

    for (const key of Object.keys(DEFINED_METAFIELDS)) {
      metafields.push({
        ...DEFINED_METAFIELDS[key],
        value: body[key],
      });
    }
    const product = {
      title: body.title,
      body_html: body.description,
      tags: body.tags.join(","),
      metafields,
      variants: [
        {
          taxable: false,
          price: body.price,
          compare_at_price: body.compareAtPrice,
          inventory_management: "shopify",
          inventory_quantity: body.quantity || 0,
          sku: body.sku,
        },
      ],
    };
    const { data } = await axios.put(
      `${SHOPIFY_API}/${productId}.json`,
      { product },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        },
      }
    );

    const { data: hsnUpdateResponse } = await axios.put(
      `${PRODUCTION_API}/api/product/update-hsn`,
      {
        hsnCode: body.hsnCode,
        inventoryItemId: data.product.variants[0].inventory_item_id,
      }
    );

    if (hsnUpdateResponse.error) errors.push(hsnUpdateResponse.error);

    return { ...data, errors };
  } catch (error: any) {
    return { error: error.message };
  }
});
