import config from "@/utils/config";
import { database } from "~/appwrite/config";
import { Permission, Role } from "appwrite";
import createTeam from "~/appwrite/customer/teams/create-team";

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
  const team = await createTeam(roleId, role.role);
  console.log(team);

  return await database.createDocument(
    config.appwriteDatabaseId,
    config.appwriteRolesCollectionId,
    roleId,
    { ...role, roleTitle: role.role, role: roleId },
    [Permission.read(Role.team(team.$id))],
  );
}
