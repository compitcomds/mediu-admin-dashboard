import { teams } from "~/appwrite/config";
import getTeamMembers from "./get-team-members";
import { type Models } from "appwrite";

export interface TeamWithMembersType extends Models.Team<Models.Preferences> {
  members: Models.Membership[];
}

export async function getTeams() {
  return await teams.list();
}

export async function getTeamsWithMembers() {
  const { teams: fetchedTeams } = await teams.list();
  const teamsWithMembers: TeamWithMembersType[] = [];
  for (const team of fetchedTeams) {
    const members = await getTeamMembers(team.$id);
    teamsWithMembers.push({
      ...team,
      members: members.memberships,
    });
  }
  return teamsWithMembers;
}
