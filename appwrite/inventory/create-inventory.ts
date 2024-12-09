import config from "~/utils/config";
import { database } from "../config";
import { ID, Query } from "appwrite";

export default async function createVariantInventory(data: {
  batchId: string;
  quantity: number;
  expiryDate: Date;
  variantId: string;
}) {
  const { total } = await database.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteInventoryCollectionId,
    [
      Query.and([
        Query.equal("batchId", data.batchId),
        Query.equal("variantId", data.variantId),
      ]),
      Query.limit(1),
    ]
  );
  if (total > 0)
    throw new Error("Another batch with same batch id already exists.");
  return await database.createDocument(
    config.appwriteDatabaseId,
    config.appwriteInventoryCollectionId,
    ID.unique(),
    { ...data, initialQuantity: data.quantity }
  );
}
