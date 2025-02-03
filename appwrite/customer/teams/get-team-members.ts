import { teams } from "~/appwrite/config";

export default async function getTeamMembers(teamId: string) {
  return await teams.listMemberships(teamId);
}
