import { DEFINED_METAFIELDS } from "../add/index.post";
import setProduct from "./set";
import bulkpdateProductVariants from "../helpers/bulk-update-prod-variants";

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
      collections: body.collections.map(
        (collection: any) => `gid://shopify/Collection/${collection}`,
      ),
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

    await bulkpdateProductVariants(
      `gid://shopify/Product/${productId}`,
      updatedProduct.variants.nodes.map((variant: any) => ({
        id: variant.id,
        inventoryItem: {
          harmonizedSystemCode: body.hsnCode,
          countryCodeOfOrigin: "IN",
        },
      })),
    );

    return { product: updatedProduct, errors };
  } catch (error: any) {
    return { error: error.message };
  }
});
