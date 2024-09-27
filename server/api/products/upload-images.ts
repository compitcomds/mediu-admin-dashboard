import { defineEventHandler, readBody, createError } from "h3";
import axios from "axios";
import config from "~/utils/config";

interface ImageData {
  base64: string;
  name: string;
}

interface CreateProductRequest {
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  addedImages: ImageData[];
}

export default defineEventHandler(async (event) => {
  const body: CreateProductRequest = await readBody(event);
  const { title, body_html, vendor, product_type, addedImages } = body;

  const shopifyAccessToken = config.shopifyAccessToken;
  const shopName = config.shopifyDomain;

  if (!shopifyAccessToken || !shopName) {
    throw createError({
      statusCode: 500,
      statusMessage: "Shopify credentials are missing",
    });
  }

  try {
    // Step 1: Create the product
    const createProductUrl = `https://${shopName}/admin/api/2024-07/products.json`;
    const productData = {
      product: {
        title,
        body_html,
        vendor,
        product_type,
      },
    };

    const createProductResponse = await axios.post(createProductUrl, productData, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": shopifyAccessToken,
      },
    });

    const productId = createProductResponse.data.product.id;

    // Step 2: Add images to the product
    const addImageUrl = `https://${shopName}/admin/api/2024-07/products/${productId}/images.json`;

    for (const image of addedImages) {
      const imageData = {
        image: {
          attachment: image.base64.split(",")[1], // Remove the base64 header part
          filename: image.name,
        },
      };

      // POST request to add new images
      await axios.post(addImageUrl, imageData, {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": shopifyAccessToken,
        },
      });
    }

    return {
      status: "success",
      message: "Product and images created successfully",
    };
  } catch (error: any) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create product or upload images",
      data: error.response?.data || error.message,
    });
  }
});
