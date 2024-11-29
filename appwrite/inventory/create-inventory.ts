import config from "~/utils/config";
import { database } from "../config";
import { ID } from "appwrite";

export default async function createVariantInventory(data: {
  batchId: string;
  quantity: number;
  expiryDate: Date;
  variantId: string;
}) {
  return await database.createDocument(
    config.appwriteDatabaseId,
    config.appwriteInventoryCollectionId,
    ID.unique(),
    data
  );
}
