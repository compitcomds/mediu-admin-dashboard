import config from "~/utils/config";
import { database } from "../config";

export async function deleteBatchFromInventory(documentId: string) {
  return await database.deleteDocument(
    config.appwriteDatabaseId,
    config.appwriteInventoryCollectionId,
    documentId
  );
}
