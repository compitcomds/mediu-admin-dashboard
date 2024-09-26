// server/api/edit-product-images.post.ts
import { defineEventHandler, readBody, createError } from "h3";
import axios from "axios";
import config from "~/utils/config";

interface ImageData {
  base64: string;
  name: string;
}

interface EditImagesRequest {
  productId: number;
  addedImages: ImageData[];
  removedImages: number[]; // IDs of the images to remove
}

export default defineEventHandler(async (event) => {
  const body: EditImagesRequest = await readBody(event);
  const { productId, addedImages, removedImages } = body;

  if (!productId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product ID is required",
    });
  }

  const shopifyAccessToken = config.shopifyAccessToken;
  const shopName = config.shopifyDomain;

  if (!shopifyAccessToken || !shopName) {
    throw createError({
      statusCode: 500,
      statusMessage: "Shopify credentials are missing",
    });
  }

  const addImageUrl = `https://${shopName}/admin/api/2024-07/products/${productId}/images.json`;

  try {
    // Handle adding new images
    for (const image of addedImages) {
      const imageData = {
        image: {
          attachment: image.base64.split(",")[1],
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

    // Handle removing images
    for (const imageId of removedImages) {
      // DELETE request to remove the image by ID
      const removeImageUrl = `https://${shopName}/admin/api/2024-07/products/${productId}/images/${imageId}.json`;
      await axios.delete(removeImageUrl, {
        headers: {
          "X-Shopify-Access-Token": shopifyAccessToken,
        },
      });
    }

    return {
      status: "success",
      message: "Images updated successfully",
    };
  } catch (error: any) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update images",
      data: error.response?.data || error.message,
    });
  }
});
