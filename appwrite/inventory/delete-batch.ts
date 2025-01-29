import config from "~/utils/config";
import { database } from "../config";
import axios from "axios";

export async function deleteBatchFromInventory(documentId: string) {
  const document = await database.getDocument(
    config.appwriteDatabaseId,
    config.appwriteInventoryCollectionId,
    documentId,
  );

  await axios.put(`/api/inventory/${document.variantId}`, {
    delta: -document.quantity,
  });

  const deletedDocument = await database.deleteDocument(
    config.appwriteDatabaseId,
    config.appwriteInventoryCollectionId,
    documentId,
  );

  return deletedDocument;
}
