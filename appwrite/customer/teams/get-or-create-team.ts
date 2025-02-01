import { teams } from "~/appwrite/config";

export default async function getTeamOrCreate(
  teamId: string,
  teamName: string,
) {
  try {
    return await teams.get(teamId);
  } catch (error) {
    return await teams.create(teamId, teamName);
  }
}
