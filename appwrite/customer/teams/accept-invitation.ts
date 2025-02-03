import { teams } from "~/appwrite/config";

export default async function acceptInvitation(
  teamId: string,
  membershipId: string,
  userId: string,
  secret: string,
) {
  return await teams.updateMembershipStatus(
    teamId,
    membershipId,
    userId,
    secret,
  );
}
