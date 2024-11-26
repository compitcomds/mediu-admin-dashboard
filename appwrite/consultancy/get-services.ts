import config from "~/utils/config";
import { database } from "../config";
import { Query } from "appwrite";

export default async function getConsultancyServices() {
  return await database.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteConsultancyProductsCollectionId,
    [Query.limit(100), Query.orderDesc("$createdAt")]
  );
}
