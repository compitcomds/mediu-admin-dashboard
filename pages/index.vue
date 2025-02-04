<template>
  <div
    class="mb-10 flex w-full flex-col items-center space-y-6 rounded-xl bg-white p-12 text-[#28574e]"
  >
    <img
      src="https://ccdstest.b-cdn.net/Medi%20u/logos/logo%201.png"
      alt="Mediu Logo"
      class="w-56 rounded-lg"
    />
    <h2 class="text-center text-4xl font-bold">Hey Admin</h2>
    <h2 class="text-center text-4xl font-bold">Welcome To Mediu</h2>
    <p class="max-w-2xl text-center text-lg text-gray-600">
      Here you can manage all your e-commerce activities, track sales, orders,
      and customers efficiently. Let's get started!
    </p>
  </div>

  <!-- Statistics Cards -->
  <div class="mb-16 grid w-full grid-cols-1 gap-10 lg:grid-cols-3">
    <div
      class="flex transform flex-col items-center rounded-lg border bg-gradient-to-r from-green-200 to-white p-10 transition"
    >
      <h3 class="mb-4 text-3xl font-semibold text-gray-900">Total Products</h3>
      <p class="text-5xl font-extrabold text-green-800">
        {{ count.prod.products }}
      </p>
      <p class="mt-2 text-sm text-gray-600">
        Collections:
        <span class="font-semibold text-green-600">{{
          count.prod.collections
        }}</span>
      </p>
    </div>
    <div
      class="flex transform flex-col items-center rounded-lg border bg-gradient-to-r from-blue-200 to-white p-10 transition"
    >
      <h3 class="mb-4 text-3xl font-semibold text-gray-900">Total Orders</h3>
      <p class="text-5xl font-extrabold text-blue-800">
        {{ count.orders.total }}
      </p>
      <p class="mt-2 text-sm text-gray-600">
        New orders today:
        <span class="font-semibold text-blue-600">{{
          count.orders.today
        }}</span>
      </p>
    </div>
    <div
      class="flex transform flex-col items-center rounded-lg border bg-gradient-to-r from-indigo-200 to-white p-10 transition"
    >
      <h3 class="mb-4 text-3xl font-semibold text-gray-900">Total Customers</h3>
      <p class="text-5xl font-extrabold text-indigo-800">
        {{ count.customers.total }}
      </p>
      <p class="mt-2 text-sm text-gray-600">
        New customers this week:
        <span class="font-semibold text-indigo-600">{{
          count.customers.today
        }}</span>
      </p>
    </div>
  </div>

  <!-- Quick Links for Actions -->
  <div class="mb-16 grid w-full grid-cols-1 gap-10 lg:grid-cols-3">
    <nuxt-link
      to="/product"
      class="flex transform items-center justify-center space-x-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white shadow-xl transition hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 3h18M3 8h18M5 12h14M3 16h18M5 20h14"
        />
      </svg>
      <span>Manage Products</span>
    </nuxt-link>
    <nuxt-link
      to="/orders"
      class="flex transform items-center justify-center space-x-3 rounded-xl bg-gradient-to-r from-green-600 to-green-800 p-6 text-white shadow-xl transition hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7 10l5 5m0 0l5-5m-5 5V6"
        />
      </svg>
      <span>Manage Orders</span>
    </nuxt-link>
    <nuxt-link
      to="/customers"
      class="flex transform items-center justify-center space-x-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 text-white shadow-xl transition hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16 12H8m0 0l4-4m-4 4l4 4"
        />
      </svg>
      <span>Manage Customers</span>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

const count = ref({
  orders: { total: 0, today: 0 },
  customers: { total: 0, today: 0 },
  prod: { products: 0, collections: 0 },
});

const fetchShopDetails = async () => {
  const { data } = await axios.get("/api/shop");
  count.value = data;
};

onMounted(() => {
  fetchShopDetails();
});

useHead({
  title: "Mediu | Home",
});
</script>

<style scoped>
.bg-white {
  background-color: #ffffff;
}
</style>
