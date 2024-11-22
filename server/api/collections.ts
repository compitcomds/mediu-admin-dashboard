import { defineEventHandler } from "h3";
import axios from "axios";
import config from "~/utils/config";

export default defineEventHandler(async (event) => {
  try {
    const response = await axios.get<{
      custom_collections: [];
    }>(
      `https://${config.shopifyDomain}/admin/api/2024-07/custom_collections.json`,
      {
        headers: {
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
      }
    );

    const collections = response.data.custom_collections;

    return collections; // Return collections to the frontend
  } catch (error) {
    console.error("Error fetching collections: ", error);
    throw new Error("Failed to fetch collections");
  }
});
