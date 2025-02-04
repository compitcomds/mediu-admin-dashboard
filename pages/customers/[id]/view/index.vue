<template>
  <div v-if="profile" class="container mx-auto px-4 py-8">
    <CustomersProfile
      :profile="profile"
      :wallet-amount="customerWallet?.amount || 0"
    />
    <CustomersOrderHistory :customer-id="customerId" />
    <CustomersWalletTransactions
      :appwrite-user-id="profile.appwriteUserId"
      :customer-wallet="customerWallet"
      @update:wallet-amount="updateCustomerWallet"
      :disabled-form="true"
    />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {
  getCustomerWalletAmount,
  type WalletType,
} from "~/appwrite/customer/get-wallet-amount";

const route = useRoute();
const customerId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;

const profile = await fetchProfile();

const customerWallet = ref<WalletType | null>(null);

async function fetchProfile() {
  try {
    const { data } = await axios.get(`/api/customers/${customerId}/profile`);
    return data;
  } catch (error) {
    return null;
  }
}

const updateCustomerWallet = (amount: number) => {
  if (!customerWallet.value) return;
  customerWallet.value.amount = amount;
};

onMounted(async () => {
  customerWallet.value = await getCustomerWalletAmount(profile.appwriteUserId);
});
</script>
