import config from "~/utils/config";
import { database } from "../config";

export default async function getAppwriteOrderById(id: string) {
  try {
    return await database.getDocument(
      config.appwriteDatabaseId,
      config.appwriteOrdersId,
      id,
    );
  } catch (error) {
    return null;
  }
}
