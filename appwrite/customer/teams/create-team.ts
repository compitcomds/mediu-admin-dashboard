import { teams } from "~/appwrite/config";

export default async function createTeam(teamId: string, teamName: string) {
  return await teams.create(teamId, teamName);
}
