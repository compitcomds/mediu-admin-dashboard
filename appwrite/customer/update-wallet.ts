import { database } from "../config";
import config from "~/utils/config";
import { getCustomerWalletAmount } from "./get-wallet-amount";
import { ID } from "appwrite";

export default async function updateWallet(
  customerId: string,
  newAmount: number,
) {
  const oldWallet = await getCustomerWalletAmount(customerId);
  if (!oldWallet) throw new Error("Customer wallet not found");

  if (oldWallet.amount === newAmount) {
    throw new Error("New amount is the same as the old amount.");
  }

  const transaction = await createWalletTransaction(
    customerId,
    oldWallet.amount,
    newAmount,
  );

  const updatedWallet = await database.updateDocument(
    config.appwriteDatabaseId,
    config.appwriteWalletCollectionId,
    customerId,
    { amount: newAmount },
  );

  return {
    updatedWallet,
    transaction,
  };
}

export async function createWalletTransaction(
  customerId: string,
  oldAmount: number,
  newAmount: number,
) {
  const difference = newAmount - oldAmount;
  let type = "ADMIN_ADDED";
  if (difference < 0) {
    type = "ADMIN_REDUCED";
  }
  return await database.createDocument(
    config.appwriteDatabaseId,
    config.appwriteCustomerWalletTransactionsCollectionId,
    ID.unique(),
    {
      userId: customerId,
      amount: Math.abs(difference),
      type,
      appwriteOrderType: "ADMIN_UPDATE",
    },
  );
}
