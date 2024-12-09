import axios from "axios";
import config from "~/utils/config";
import convertOptionsForRest from "~/utils/convertOptionsForRest";
import bulkpdateProductVariants from "../helpers/bulk-update-prod-variants";

const SHOPIFY_API = `https://${config.shopifyDomain}/admin/api/2024-10/products.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;
const SHOPIFY_COLLECTION_ADD_PRODUCT = `https://${config.shopifyDomain}/admin/api/2024-10/collects.json`;
const PRODUCTION_API = process.env.VITE_PRODUCTION_API;

export const DEFINED_METAFIELDS: Record<
  string,
  { key: string; type: string; namespace: string }
> = {
  safetyInformationAndPrecaution: {
    key: "safety_information_precaution",
    type: "multi_line_text_field",
    namespace: "custom",
  },
  howToUse: {
    key: "how_to_use",
    type: "multi_line_text_field",
    namespace: "custom",
  },
  keyBenefits: {
    key: "key_benefits",
    type: "multi_line_text_field",
    namespace: "custom",
  },
  gstApplied: {
    key: "gst_applied",
    type: "number_decimal",
    namespace: "custom",
  },
  requiresPrescription: {
    key: "requiresPrescription",
    namespace: "custom",
    type: "boolean",
  },
  productSubtitle: {
    key: "productSubtitle",
    namespace: "custom",
    type: "single_line_text_field",
  },
};

export async function addProductToCollection(
  productId: string,
  collectionId: string
) {
  const collectResponse = await axios.post(
    SHOPIFY_COLLECTION_ADD_PRODUCT,
    {
      collect: { product_id: productId, collection_id: collectionId },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
    }
  );
  return collectResponse;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

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
    images: body.images.map((image: any) => ({
      attachment: image.base64Image,
    })),
    status: body.status,
    options: body.options.map((option: any) => ({
      name: option.name,
      values: option.values.map((value: any) => value.name),
    })),
    variants: body.variants.map((variant: any) => ({
      taxable: false,
      price: variant.price,
      compare_at_price: variant.compareAtPrice || variant.price,
      sku: variant.sku,
      inventory_management: "shopify",
      inventory_quantity: variant.quantity || 0,
      ...convertOptionsForRest(variant.optionValues),
    })),
  };

  const errors: any[] = [];

  const { data } = await axios.post(
    SHOPIFY_API,
    { product },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
    }
  );

  const createdProduct = data.product;
  const createdProductId = createdProduct.id;

  for (const collection of body.collections) {
    await addProductToCollection(createdProductId, collection);
  }

  await bulkpdateProductVariants(
    createdProduct.admin_graphql_api_id,
    createdProduct.variants.map((variant: any) => ({
      id: variant.admin_graphql_api_id,
      inventoryItem: {
        harmonizedSystemCode: body.hsnCode,
        countryCodeOfOrigin: "IN",
      },
    }))
  );

  return { ...data, errors };
});
