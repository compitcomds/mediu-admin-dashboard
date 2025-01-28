import config from "@/utils/config";
import { database } from "~/appwrite/config";

export default async function deleteRole(roleId: string) {
  return await database.deleteDocument(
    config.appwriteDatabaseId,
    config.appwriteRolesCollectionId,
    roleId,
  );
}
