import type { Models } from "appwrite";
import { database } from "../config";

export interface WalletType extends Models.Document {
  amount: number;
}

export async function getCustomerWalletAmount(customerId: string) {
  try {
    console.log(
      customerId,
      config.appwriteDatabaseId,
      config.appwriteWalletCollectionId,
    );
    const document = await database.getDocument(
      config.appwriteDatabaseId,
      config.appwriteWalletCollectionId,
      customerId,
    );
    console.log(document);
    return document as WalletType;
  } catch (error) {
    return null;
  }
}
