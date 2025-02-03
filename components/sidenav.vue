<template>
  <aside
    class="fixed inset-y-0 left-0 top-16 hidden w-64 overflow-y-auto bg-[#238878] p-6 text-white shadow-lg lg:block"
  >
    <h1 class="my-4 text-center text-xl font-bold text-white">
      Admin Dashboard
    </h1>
    <div class="my-4 border-t border-white"></div>
    <nav>
      <ul>
        <li class="mb-4">
          <nuxt-link
            to="/"
            class="flex items-center rounded px-4 py-2 transition-colors hover:bg-white hover:text-black"
          >
            <i class="fas fa-home mr-3 text-xl"></i> Home
          </nuxt-link>
        </li>
        <li class="mb-4">
          <nuxt-link
            to="/orders"
            class="flex items-center rounded px-4 py-2 transition-colors hover:bg-white hover:text-black"
          >
            <i class="fas fa-boxes mr-3 text-xl"></i> Orders
          </nuxt-link>
        </li>
        <li class="mb-4">
          <div
            @click="toggleDropdown('products')"
            class="flex cursor-pointer items-center justify-between rounded px-4 py-2 transition-colors hover:bg-white hover:text-black"
          >
            <span class="flex items-center">
              <i class="fas fa-cogs mr-3 text-xl"></i> Products
            </span>
            <span
              :class="{ 'rotate-180': dropdowns.products }"
              class="transform transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>
          <ul v-if="dropdowns.products" class="ml-6 mt-2 space-y-2">
            <li>
              <nuxt-link
                to="/product"
                class="block rounded px-2 py-1 transition-colors hover:bg-white hover:text-black"
                >All Products</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="/collections"
                class="block rounded px-2 py-1 transition-colors hover:bg-white hover:text-black"
                >Collections</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="/inventory"
                class="block rounded px-2 py-1 transition-colors hover:bg-white hover:text-black"
                >Inventory</nuxt-link
              >
            </li>
          </ul>
        </li>
        <li class="mb-4">
          <nuxt-link
            to="/alert"
            class="flex items-center rounded px-4 py-2 transition-colors hover:bg-white hover:text-black"
          >
            <i class="fas fa-exclamation-circle mr-3 text-xl"></i> Alert Users
          </nuxt-link>
        </li>
        <li class="mb-4">
          <div
            @click="toggleDropdown('customers')"
            class="flex cursor-pointer items-center justify-between rounded px-4 py-2 transition-colors hover:bg-white hover:text-black"
          >
            <span class="flex items-center">
              <i class="fas fa-users mr-3 text-xl"></i> Users
            </span>
            <span
              :class="{ 'rotate-180': dropdowns.customers }"
              class="transform transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>
          <ul v-if="dropdowns.customers" class="ml-6 mt-2 space-y-2">
            <li>
              <nuxt-link
                to="/customers"
                class="block rounded px-2 py-1 transition-colors hover:bg-white hover:text-black"
                >Customers</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="/customers/dashboard-users"
                class="block rounded px-2 py-1 transition-colors hover:bg-white hover:text-black"
                >Dashboard Users</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="/customers/roles"
                class="block rounded px-2 py-1 transition-colors hover:bg-white hover:text-black"
                >Roles</nuxt-link
              >
            </li>
          </ul>
        </li>
        <li class="mb-4">
          <button
            @click="toggleDropdown('consultancy')"
            class="flex w-full cursor-pointer items-center justify-between rounded px-4 py-2 transition-colors hover:bg-white hover:text-black"
          >
            <span class="flex items-center">
              <i class="fas fa-handshake mr-3 text-xl"></i> Consultancy
            </span>
            <span
              :class="{ 'rotate-180': dropdowns.consultancy }"
              class="transform transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>
          <ul v-if="dropdowns.consultancy" class="ml-6 mt-2 space-y-2">
            <li>
              <nuxt-link
                to="/consultancy/services"
                class="block rounded px-2 py-1 transition-colors hover:bg-white hover:text-black"
                >Services</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="/consultancy/bookings"
                class="block rounded px-2 py-1 transition-colors hover:bg-white hover:text-black"
                >Bookings</nuxt-link
              >
            </li>
          </ul>
        </li>
        <li class="mb-4">
          <nuxt-link
            to="/guide"
            class="flex items-center rounded px-4 py-2 transition-colors hover:bg-white hover:text-black"
          >
            <i class="fas fa-book mr-3 text-xl"></i> Guide
          </nuxt-link>
        </li>
        <li class="mb-4">
          <nuxt-link
            to="/help-and-support"
            class="flex items-center rounded px-4 py-2 transition-colors hover:bg-white hover:text-black"
          >
            <i class="fas fa-headset mr-3 text-xl"></i> Help & Support
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const dropdowns = ref({
  orders: false,
  products: false,
  customers: false,
  content: false,
  analytics: false,
  marketing: false,
  consultancy: false,
  discounts: false,
});

function toggleDropdown(dropdown: keyof typeof dropdowns.value) {
  dropdowns.value[dropdown] = !dropdowns.value[dropdown];
}
</script>

<style scoped>
.fas {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}
</style>
