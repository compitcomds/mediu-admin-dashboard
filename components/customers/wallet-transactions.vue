<template>
  <div>
    <div class="flex items-start justify-between gap-2">
      <div>
        <h2 class="mb-2 text-2xl font-bold">Wallet Transactions</h2>
        <p class="mb-6">
          Total Amount: {{ props.customerWallet?.amount || 0 }}
        </p>
      </div>
      <CustomersUpdateCustomerWallet
        :customer-wallet="customerWallet"
        @update:customer-wallet="updateCustomerWallet"
      />
    </div>
    <div class="overflow-hidden rounded-lg bg-white shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Type
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Transaction ID
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Amount
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Order Type
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr
            v-for="transaction in transactions"
            :key="transaction.transactionId"
          >
            <td class="whitespace-nowrap px-6 py-4">
              <span
                :class="{
                  'rounded px-2 py-1 text-xs font-semibold': true,
                  'bg-green-100 text-green-800':
                    isTransactionPositive(transaction),
                  'bg-red-100 text-red-800':
                    !isTransactionPositive(transaction),
                }"
              >
                {{ transaction.type }}
              </span>
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
              {{ transaction.transactionId }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm">
              <span
                :class="{
                  'font-medium': true,
                  'text-green-600': isTransactionPositive(transaction),
                  'text-red-600': !isTransactionPositive(transaction),
                }"
              >
                {{ isTransactionPositive(transaction) ? "+" : "-" }}₹{{
                  transaction.amount
                }}
              </span>
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
              {{ transaction.appwriteOrderType }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
              {{ formatDate(transaction.$createdAt) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  type WalletTransaction,
  getCustomerWalletTransactions,
} from "~/appwrite/customer/wallet-transactions";
import { type WalletType } from "~/appwrite/customer/get-wallet-amount";

const props = defineProps<{
  appwriteUserId?: string;
  customerWallet: WalletType | null;
}>();

const transactions = ref<WalletTransaction[]>([]);

const emit = defineEmits(["update:walletAmount"]);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const fetchTransactions = async () => {
  if (!props.appwriteUserId) return;
  transactions.value = await getCustomerWalletTransactions(
    props.appwriteUserId,
  );
};

const updateCustomerWallet = (updateDetails: {
  updatedWallet: WalletType;
  transaction: WalletTransaction;
}) => {
  transactions.value = [updateDetails.transaction, ...transactions.value];
  emit("update:walletAmount", updateDetails.updatedWallet.amount);
};

function isTransactionPositive(transaction: WalletTransaction) {
  return transaction.type === "RECEIVED" || transaction.type === "ADMIN_ADDED";
}

onMounted(async () => {
  await fetchTransactions();
});
</script>
