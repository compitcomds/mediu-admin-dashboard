import { Query, type Models } from "appwrite";
import { database } from "../config";

export interface WalletTransaction extends Models.Document {
  userId: string;
  amount: number;
  type: "USED" | "RECEIVED" | "ADMIN_REDUCED" | "ADMIN_ADDED";
  transactionId: string;
  appwriteOrderId: string;
  appwriteOrderType: "CONSULTANCY" | "ORDER" | "ADMIN_UPDATE";
}

export async function getCustomerWalletTransactions(customerId: string) {
  const { documents } = await database.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteCustomerWalletTransactionsCollectionId,
    [Query.equal("userId", customerId), Query.orderDesc("$createdAt")],
  );

  return documents as WalletTransaction[];
}
