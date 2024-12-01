import config from "~/utils/config";
import { database } from "../config";
import generateBatchIdCount from "~/utils/generateBatchIdCount";
import { Query } from "appwrite";

export default async function decreaseBatchesQuantity(
  batch: Record<string, { batchesSatisfied: string[] }>
) {
  const promises: Promise<any>[] = [];
  for (const variantId of Object.keys(batch)) {
    const batchDetails = batch[variantId];
    const count = generateBatchIdCount(batchDetails.batchesSatisfied);
    for (const batchId of Object.keys(count))
      promises.push(decreaseBatchQuantity(variantId, batchId, count[batchId]));
  }
  await Promise.all(promises);
  return;
}

export async function decreaseBatchQuantity(
  variantId: string,
  batchId: string,
  quantity: number
) {
  const { documents } = await database.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteInventoryCollectionId,
    [
      Query.equal("variantId", variantId),
      Query.equal("batchId", batchId),
      Query.limit(1),
    ]
  );
  if (documents.length < 1)
    throw new Error("Either the variant id or batch id is invalid.");

  await database.updateDocument(
    config.appwriteDatabaseId,
    config.appwriteInventoryCollectionId,
    documents[0].$id,
    {
      quantity: documents[0].quantity - quantity,
    }
  );
}
