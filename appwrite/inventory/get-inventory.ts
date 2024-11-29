import { Query } from "appwrite";
import config from "~/utils/config";
import { database } from "../config";

export async function getInventory(variantId: any) {
  const data = await database.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteInventoryCollectionId,
    [Query.equal("variantId", variantId)]
  );
  return data;
}
