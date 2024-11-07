import { database } from "./config";
import { Query } from "appwrite";
import { addDays, format } from "date-fns";

export async function getBatchDetails(batchId: any) {
  try {
    const data = await database.listDocuments(
      config.Appwrite_Database_Id,
      config.Appwrite_Inventory_Batches_Id,
      [Query.equal("BatchNumber", batchId)]
    );

    if (data.documents.length > 0) {
      const batch = data.documents[0];

     
      const today = new Date();
      const nearExpiryDate = format(addDays(today, 7), "yyyy-MM-dd");


      const preData = await database.listDocuments(
        config.Appwrite_Database_Id,
        config.Appwrite_Inventory_Batches_Id,
        [
          Query.equal("ProductId", batch.ProductId),
          Query.lessThan("ExpiryDate", batch.ExpiryDate),
          Query.greaterThanEqual("Quantity", 1),
          Query.lessThanEqual("ExpiryDate", nearExpiryDate),
        ]
      );

      if (preData.documents.length > 0) {
        throw new Error("Previous stock available near expiry. Please use that.");
      }

      await database.updateDocument(
        config.Appwrite_Database_Id,
        config.Appwrite_Inventory_Batches_Id,
        batch.$id,
        { Quantity: batch.Quantity - 1 }
      );

      return {
        message: "Batch details fetched successfully!",
        batch,
      };
    } else {
      return {
        message: "Batch not found.",
      };
    }
  } catch (error) {
    console.error("Error fetching batch details:", error);
    return { message: error || "Failed to fetch batch details." };
  }
}
