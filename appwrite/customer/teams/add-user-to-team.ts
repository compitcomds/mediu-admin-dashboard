import { teams } from "~/appwrite/config";

export default async function addUserToTeam(
  teamId: string,
  userDetails: {
    name: string;
    email: string;
    roles: string[];
  },
) {
  return await teams.createMembership(
    teamId,
    [],
    userDetails.email,
    undefined,
    undefined,
    "http://localhost:3001/accept-invitation",
    userDetails.name,
  );
}
