import { ID } from "appwrite";
import { database } from "../config";
import config from "~/utils/config";

export default async function createTicketInAppwrite(data: {
  title: string;
  description: string;
  image?: string | URL;
}) {
  return await database.createDocument(
    config.appwriteDatabaseId,
    config.appwriteHelpAndSupportCollectionId,
    ID.unique(),
    data
  );
}
