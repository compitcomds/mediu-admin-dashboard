import { getUser } from "../login-admin";
import getRole from "./role/get-role";
import { getTeams } from "./teams/get-teams";

export type PermissionType = {
  read: { pattern: RegExp; route: string }[];
  edit: { pattern: RegExp; route: string }[];
};

export default async function getUserPermissions() {
  const user = await getUser();
  if (!user) return { read: [], edit: [] };

  const permissions: PermissionType = {
    read: [],
    edit: [],
  };

  const { teams } = await getTeams();

  for (const team of teams) {
    const role = await getRole(team.$id);
    if (!role) continue;
    role.read.forEach((route) => {
      permissions.read.push({ pattern: routeToRegex(route), route });
    });
    role.edit.forEach((route) => {
      permissions.edit.push({ pattern: routeToRegex(route), route });
    });
  }
  return permissions;
}

function routeToRegex(route: string): RegExp {
  const regexString =
    "^" + route.replace(/\//g, "\\/").replace(/:id/g, "[^\\/]+") + "$";
  return new RegExp(regexString);
}
