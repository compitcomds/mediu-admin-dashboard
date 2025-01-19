import config from "~/utils/config";
import { database } from "../config";
import { ID, Query } from "appwrite";
import axios from "axios";

export default async function createVariantInventory(data: {
  batchId: string;
  quantity: number;
  expiryDate: Date;
  variantId: string;
}) {
  if (data.quantity <= 0)
    throw new Error("Batch must consist more than 0 quantity.");
  const { total } = await database.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteInventoryCollectionId,
    [
      Query.and([
        Query.equal("batchId", data.batchId),
        Query.equal("variantId", data.variantId),
      ]),
      Query.limit(1),
    ],
  );
  if (total > 0)
    throw new Error("Another batch with same batch id already exists.");

  let createdDocumentId = "";

  try {
    const document = await database.createDocument(
      config.appwriteDatabaseId,
      config.appwriteInventoryCollectionId,
      ID.unique(),
      { ...data, initialQuantity: data.quantity },
    );
    createdDocumentId = document.$id;
    await axios.put(`/api/inventory/${data.variantId}`, {
      delta: data.quantity,
    });
    return document;
  } catch (error: any) {
    console.error(error);
    if (createdDocumentId)
      await database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId,
        createdDocumentId,
      );
    throw new Error(error);
  }
}
