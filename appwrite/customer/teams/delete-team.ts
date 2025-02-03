import { teams } from "~/appwrite/config";

export default async function deleteTeam(teamId: string) {
  return await teams.delete(teamId);
}
