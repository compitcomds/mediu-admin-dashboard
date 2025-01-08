import config from "~/utils/config";
import { database } from "../config";
import { Query } from "appwrite";
import generateBatchIdCount from "~/utils/generateBatchIdCount";

export default async function verifyProductInventoryBatch(
  variantId: string,
  batchId: string,
  batchesSatisfied: string[],
) {
  const satisfiedCount = generateBatchIdCount(batchesSatisfied);
  const { documents: batches } =
    await getAllOrderedAvailableVariantBatches(variantId);
  for (const batch of batches) {
    if (
      batch.batchId === batchId &&
      batch.quantity >= 1 + (satisfiedCount[batchId] || 0)
    ) {
      return true;
    } else if (batch.batchId === batchId) {
      console.log(batch.quantity, satisfiedCount[batchId] + 1);
      throw new Error("Batch does not have enough quantity.");
    } else if (
      !!satisfiedCount[batch.batchId] &&
      batch.quantity === satisfiedCount[batch.batchId]
    )
      continue;
    else
      throw new Error(
        `Batch with older batch id exists. Please use that to continue`,
      );
  }

  throw new Error("Invalid batch id. The specified batch id does not exists.");
}

export async function getAllOrderedAvailableVariantBatches(variantId: string) {
  return await database.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteInventoryCollectionId,
    [
      Query.equal("variantId", variantId),
      Query.greaterThan("quantity", 0),
      Query.orderAsc("expiryDate"),
      Query.limit(100),
    ],
  );
}
