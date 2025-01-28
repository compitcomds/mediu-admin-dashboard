import config from "@/utils/config";
import { database } from "~/appwrite/config";

export default async function updateRole(
  roleId: string,
  role: Partial<{
    description: string;
    read: string[];
    edit: string[];
  }>,
) {
  return await database.updateDocument(
    config.appwriteDatabaseId,
    config.appwriteRolesCollectionId,
    roleId,
    { ...role },
  );
}
