import config from "@/utils/config";
import { database } from "~/appwrite/config";
import type { Models } from "appwrite";

interface RoleType extends Models.Document {
  description: string;
  role: string;
  roleTitle: string;
  read: string[];
  edit: string[];
}

export default async function getRole(roleId: string) {
  try {
    return (await database.getDocument(
      config.appwriteDatabaseId,
      config.appwriteRolesCollectionId,
      roleId,
    )) as RoleType;
  } catch (error) {
    return null;
  }
}
