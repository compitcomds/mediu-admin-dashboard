import { Query } from "appwrite";
import config from "~/utils/config";
import { database } from "../config";

export async function getInventory(variantId: string) {
  return await database.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteInventoryCollectionId,
    [Query.equal("variantId", variantId)]
  );
}

export async function getOldestAvailableBatch(variantId: string) {
  return await database.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteInventoryCollectionId,
    [
      Query.orderAsc("expiryDate"),
      Query.limit(100),
      Query.greaterThan("quantity", 0),
      Query.equal("variantId", JSON.stringify(variantId)),
    ]
  );
}
