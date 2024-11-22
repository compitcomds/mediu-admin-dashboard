import axios from "axios";
import config from "~/utils/config";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    throw new Error("Collection ID is missing");
  }
  const response = await axios.delete(
    `https://${config.shopifyDomain}/admin/api/2024-07/custom_collections/${id}.json`,
    {
      headers: {
        "X-Shopify-Access-Token": config.shopifyAccessToken,
      },
    }
  );

  if (response.status === 200) {
    return { message: "Collection deleted successfully." };
  } else {
    throw new Error("Failed to delete the collection.");
  }
});
