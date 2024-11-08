import { database, account } from "./config";
import { ID, Query } from "appwrite";


export async function allgetConsultancy() {
  const data = await database.listDocuments(
    config.Appwrite_Database_Id,
    config.Appwrite_Consultancy_Id
  );
  console.log("Multiple Consultancy", data);
  if (data.documents) return data;
  else return "Failed to Fetch";
}


export async function getconsultancy(userId: any) {
  const data = await database.listDocuments(
    config.Appwrite_Database_Id,
    config.Appwrite_Consultancy_Id,
    [Query.equal("userId", userId)]
  );
  console.log("Single Consultancy", data);
  if (data.documents) return data;
  else return "Failed to Fetch";
}
