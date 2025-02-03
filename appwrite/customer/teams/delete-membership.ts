import { teams } from "~/appwrite/config";

export default async function deleteMembership(
  teamId: string,
  memberId: string,
) {
  return await teams.deleteMembership(teamId, memberId);
}
