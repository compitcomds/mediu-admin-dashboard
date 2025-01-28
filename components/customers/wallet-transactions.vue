<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold">Wallet Transactions</h2>
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
                    transaction.type === 'RECEIVED',
                  'bg-red-100 text-red-800': transaction.type === 'USED',
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
                  'text-green-600': transaction.type === 'RECEIVED',
                  'text-red-600': transaction.type === 'USED',
                }"
              >
                {{ transaction.type === "RECEIVED" ? "+" : "-" }}₹{{
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
  WalletTransaction,
  getCustomerWalletTransactions,
} from "~/appwrite/customer/wallet-transactions";

const props = defineProps<{
  appwriteUserId?: string;
}>();

const transactions = ref<WalletTransaction[]>([]);

// Format date helper function
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

onMounted(async () => {
  await fetchTransactions();
});
</script>
