export default defineEventHandler(async (event) => {
  try {
      const body = await readBody(event);

      const newCollection = {
          custom_collection: {
              title: body.title,
              body_html: body.body_html,
              collects: body.collects, // Ensure collects are handled correctly
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

      return { success: true, collection: response.data.custom_collection }; // Return created collection
  } catch (error) {
      console.error("Error creating collection: ", error);
      throw new Error("Failed to create collection");
  }
});
