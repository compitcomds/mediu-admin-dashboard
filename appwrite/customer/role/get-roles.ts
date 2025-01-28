import { database } from "~/appwrite/config";
import config from "~/utils/config";

export default async function getRoles() {
  return await database.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteRolesCollectionId,
  );
}
