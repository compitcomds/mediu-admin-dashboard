import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_API = `https://${config.shopifyDomain}/admin/api/2024-10/products`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

export default defineEventHandler(async (event) => {
  const productId = event.context.params?.id;
  if (!productId) throw new Error("Product id not provided.");

  try {
    await axios.delete(`${SHOPIFY_API}/${productId}.json`, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
    });

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      error: "Failed to delete product",
    };
  }
});
