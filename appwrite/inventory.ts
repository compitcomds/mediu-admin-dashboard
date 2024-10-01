import { database, account } from "./config";
import { ID } from "appwrite";

export async function createInventory(
  BatchNumber: string,
  BatchDate: Date,
  ExpiryDate: Date,
  ProductId: string,
  Quantity: number
) {
  try {
    // Ensure dates are stored as strings
    const batchDateString = BatchDate.toISOString();
    const expiryDateString = ExpiryDate.toISOString();

    // Create document in Appwrite
    const upload_data = await database.createDocument(
      config.Appwrite_Database_Id,
      config.Appwrite_Inventory_Batches_Id,
      ID.unique(),
      {
        BatchNumber,
        BatchDate: batchDateString, // Convert Date to string
        ExpiryDate: expiryDateString, // Convert Date to string
        ProductId,
        Quantity,
      }
    );

    console.log("Document Created Successfully: ", upload_data);
  } catch (error: any) {
    console.error("Error in createInventory Function:", error.message);
    throw new Error("Failed to create new Document");
  }
}

export async function generateUniqueNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const milliseconds = now.getMilliseconds().toString().padStart(3, "0");

  const randomNumber = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${randomNumber}`;
}


export async function getInventory() {
    const data = await database.listDocuments(
       config.Appwrite_Database_Id,
       config.Appwrite_Inventory_Batches_Id
        
    )
    console.log("Multiple Inventory",data)
    if (data.documents) return data;
    else return "Failed to Fetch"
}