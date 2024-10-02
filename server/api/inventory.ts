import { defineEventHandler, readBody } from "h3";
import fetch from "node-fetch";

const shopDomain = "dev-mediu.myshopify.com";
const accessToken = "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";

// Function to update inventory level using Shopify API
async function updateInventoryLevel(
  inventoryItemId: string,
  locationId: string,
  newQuantity: number
): Promise<any> {
  const url = `https://${shopDomain}/admin/api/2024-07/inventory_levels/set.json`;

  const body = {
    location_id: locationId,
    inventory_item_id: inventoryItemId,
    available: newQuantity,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error updating inventory level: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating inventory level:", error);
    return null;
  }
}

// Main event handler
export default defineEventHandler(async (event) => {
  if (event.method === "PUT") {
    const body = await readBody(event);
    const { inventoryItemId, locationId, quantity } = body;

    if (!inventoryItemId || !locationId || quantity === undefined) {
      return {
        error: "Inventory item ID, location ID, and quantity are required.",
      };
    }

    const result = await updateInventoryLevel(
      inventoryItemId,
      locationId,
      quantity
    );

    if (result) {
      return {
        success: true,
        message: "Inventory updated successfully.",
        data: result,
      };
    } else {
      return {
        error: "Failed to update inventory level.",
      };
    }
  } else {
    return {
      error: "Invalid request method. Only PUT is allowed.",
    };
  }
});
