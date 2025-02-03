import config from "@/utils/config";
import deleteTeam from "../teams/delete-team";
import { database } from "~/appwrite/config";

export default async function deleteRole(roleId: string) {
  await deleteTeam(roleId);
  return await database.deleteDocument(
    config.appwriteDatabaseId,
    config.appwriteRolesCollectionId,
    roleId,
  );
}
