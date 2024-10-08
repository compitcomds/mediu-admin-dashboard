import { defineEventHandler, readBody } from "h3";
import fetch from "node-fetch";
import config from "~/utils/config";


async function getCurrentInventoryLevel(
  inventoryItemId: string,
  locationId: string
): Promise<number> {
  const url = `https://${config.shopifyDomain}/admin/api/2024-07/inventory_levels.json?inventory_item_ids=${inventoryItemId}&location_ids=${locationId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": config.shopifyAccessToken,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching current inventory level: ${response.statusText}`
      );
    }

    const data = await response.json();
    const inventoryLevel = data.inventory_levels[0]?.available || 0;
    return inventoryLevel;
  } catch (error) {
    console.error("Error fetching current inventory level:", error);
    return 0;
  }
}

async function updateInventoryLevel(
  inventoryItemId: string,
  locationId: string,
  newQuantity: number
): Promise<any> {
  const currentQuantity = await getCurrentInventoryLevel(
    inventoryItemId,
    locationId
  );

  const updatedQuantity = currentQuantity + newQuantity;

  const url = `https://${config.shopifyDomain}/admin/api/2024-07/inventory_levels/set.json`;

  const body = {
    location_id: locationId,
    inventory_item_id: inventoryItemId,
    available: updatedQuantity,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": config.shopifyAccessToken,
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
