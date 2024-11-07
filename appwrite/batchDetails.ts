import { database } from "./config";
import { Query } from "appwrite";

export async function getBatchDetails(batchNumber: any) {
  try {
    const data = await database.listDocuments(
      config.Appwrite_Database_Id,
      config.Appwrite_Inventory_Batches_Id,
      [Query.equal("BatchNumber", batchNumber)]
    );

    if (data.documents.length > 0) {
      const batch = data.documents[0];

      const preData = await database.listDocuments(
        config.Appwrite_Database_Id,
        config.Appwrite_Inventory_Batches_Id,
        [
          Query.equal("ProductId", batch.ProductId),
          Query.lessThan("ExpiryDate", batch.ExpiryDate),
          Query.greaterThanEqual("Quantity", 1),
        ]
      );

      if (preData.documents.length > 0)
        throw new Error("Previous Batch Available, Please Select from that");

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
    return { message: "Failed to fetch batch details." };
  }
}
