import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_API = `https://${config.shopifyDomain}/admin/api/2024-10/products.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;
const SHOPIFY_COLLECTION_ADD_PRODUCT = `https://${config.shopifyDomain}/admin/api/2024-10/collects.json`;

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
  manufacturer: {
    key: "manufacturers",
    type: "single_line_text_field",
    namespace: "custom",
  },
  gstApplied: {
    key: "gst_applied",
    type: "number_decimal",
    namespace: "custom",
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
  console.log({ ...body, images: [] });

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

  console.log(SHOPIFY_ACCESS_TOKEN);
  try {
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

    const createdProductId = data.product.id;

    for (const collection of body.collections) {
      await addProductToCollection(createdProductId, collection.id);
    }

    return data;
  } catch (error: any) {
    console.log(error.response.data.errors.type);
    return { error: error.message };
  }
});
