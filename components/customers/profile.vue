<template>
  <div v-if="profile" class="mb-8">
    <h2 class="mb-6 text-2xl font-bold">Customer Profile</h2>
    <div class="rounded-lg bg-white p-6 shadow">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-700">Name</label>
            <p class="mt-1">{{ profile.firstName }} {{ profile.lastName }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">Email</label>
            <p class="mt-1">{{ profile.email }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700"
              >Phone Number</label
            >
            <p class="mt-1">{{ profile.phone }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700"
              >Wallet Amount</label
            >
            <p class="mt-1">{{ props.walletAmount }}</p>
          </div>
        </div>
        <div class="space-y-4 md:col-span-2">
          <div>
            <label class="text-sm font-medium text-gray-700">Address</label>
            <p class="mt-1">
              {{ profile.defaultAddress.address1 }},
              {{ profile.defaultAddress.province }},
              {{ profile.defaultAddress.country }}
              {{ profile.defaultAddress.zip }}
            </p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700"
              >Total Orders</label
            >
            <p class="mt-1">{{ profile.numberOfOrders }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700"
              >Amount Spent</label
            >
            <p class="mt-1">
              {{ profile.amountSpent.currencyCode }}
              {{ profile.amountSpent.amount }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  profile: any;
  walletAmount: number;
}>();
</script>
