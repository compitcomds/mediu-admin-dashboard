<template>
  <div v-if="profile" class="container mx-auto px-4 py-8">
    <CustomersProfile :profile="profile" />
    <CustomersOrderHistory :customer-id="customerId" />
    <CustomersWalletTransactions
      :email="profile.email"
      :customer-id="customerId"
    />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
const route = useRoute();
const customerId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;

const profile = await fetchProfile();

async function fetchProfile() {
  try {
    const { data } = await axios.get(`/api/customers/${customerId}/profile`);
    return data;
  } catch (error) {
    return null;
  }
}
</script>
