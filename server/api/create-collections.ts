import { defineEventHandler, readBody } from "h3"; // Import readBody instead of useBody
import axios, { AxiosError } from "axios";
import config from "~/utils/config";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // Use readBody to get the request body
    console.log("Received body:", body); // Log the body
    const newCollection = { ...body };

    const apiUrl = `https://${config.shopifyDomain}/admin/api/2024-07/custom_collections.json`;

    const response = await axios.post(apiUrl, newCollection, {
      headers: {
        "X-Shopify-Access-Token": config.shopifyAccessToken,
        "Content-Type": "application/json",
      },
    });

    return response.data.custom_collection;
  } catch (error: any) {
    console.error("Error creating collection: ", error);
    throw new Error("Failed to create collection");
  }
});
