import config from "~/utils/config";
import { database } from "../config";
import { Query, type Models } from "appwrite";

export default async function getUserAlertsData() {
  const { documents, total } = await database.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteAlertCollectionId,
    [Query.limit(200)]
  );
  const alerts: Record<string, Models.Document[]> = {};
  for (const document of documents) {
    if (alerts[document.productId]) alerts[document.productId].push(document);
    else alerts[document.productId] = [document];
  }
  return {
    documents: alerts,
    total,
  };
}
