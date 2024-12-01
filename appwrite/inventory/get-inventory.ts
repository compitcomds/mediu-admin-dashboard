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
