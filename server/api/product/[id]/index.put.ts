import axios from "axios";
import config from "~/utils/config";
import { DEFINED_METAFIELDS } from "../add/index.post";
import setProduct from "./set";

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
        value:
          typeof body[key] !== "string" ? JSON.stringify(body[key]) : body[key],
      });
    }
    const product = {
      title: body.title,
      descriptionHtml: body.description,
      tags: body.tags,
      metafields,
      status: body.status.toUpperCase(),
      productOptions: body.options,
      variants: body.variants.map((variant: any) => ({
        ...variant,
        taxable: false,
        inventoryPolicy: "DENY",
      })),
    };

    const updatedProduct = await setProduct(productId, product);
    // console.log(updatedProduct.variants.nodes);
    // const hsnPromises = [];
    // for (const variant of updatedProduct.variants.nodes) {
    //   const promise = axios.put(
    //     `${PRODUCTION_API}/api/product/update-hsn`,
    //     {
    //       hsnCode: body.hsnCode,
    //       inventoryItemId: variant.inventoryItem.id,
    //     }
    //   );
    //   if (hsnUpdateResponse.error) errors.push(hsnUpdateResponse.error);
    // }

    return { product: updatedProduct, errors };
  } catch (error: any) {
    return { error: error.message };
  }
});
