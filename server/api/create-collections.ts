import { defineEventHandler, readBody } from "h3"; // Import readBody instead of useBody
import axios from "axios";
import config from "~/utils/config";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // Use readBody to get the request body
    console.log('Received body:', body); // Log the body
    const newCollection = {
      custom_collection: {
        title: body.title,
        body_html: body.body_html,
        published: body.published,
        collects:body.collects
      },
    };

    const response = await axios.post(
      `https://${config.shopifyDomain}/admin/api/2024-07/custom_collections.json`,
      newCollection,
      {
        headers: {
          "X-Shopify-Access-Token": config.shopifyAccessToken,
        },
      }
    );

    return response.data.custom_collection; // Return the created collection to the frontend
  } catch (error) {
    console.error("Error creating collection: ", error);
    throw new Error("Failed to create collection");
  }
});
