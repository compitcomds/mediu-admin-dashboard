import config from "@/utils/config";
import { database } from "~/appwrite/config";

export default async function createRole(role: {
  role: string;
  description: string;
  read: string[];
  edit: string[];
}) {
  if (role.role.toLowerCase() === "admin") {
    throw new Error(
      "Admin role is not allowed to be created. Please give any other name.",
    );
  }

  const roleId = role.role.toLowerCase().replace(/\s+/g, "-");

  return await database.createDocument(
    config.appwriteDatabaseId,
    config.appwriteRolesCollectionId,
    roleId,
    { ...role, role: roleId },
  );
}
