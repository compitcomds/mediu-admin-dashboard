<template>
  <div
    class="bg-[#28574e] flex items-center justify-between px-4 py-4 fixed z-50 w-full"
  >
    <!-- Shopify Logo -->
    <div class="flex items-center space-x-2 max-w-16">
      <nuxt-link to="/"
        ><img src="/mediu-logo.png" alt="Mediu Logo" class="w-5/6"
      /></nuxt-link>
    </div>

    <!-- Burger Icon for sm and md screens -->
    <div class="sm:flex block lg:hidden">
      <button @click="toggleSidenav" class="text-white focus:outline-none">
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- User Icon and Name for lg and xl screens only -->
    <div class="hidden lg:flex items-center space-x-4">
      <!-- <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5z" />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 14l6.16-3.422A2 2 0 0020 9.764V7.64a2 2 0 00-1.16-1.841l-6-3.33a2 2 0 00-1.68 0l-6 3.33A2 2 0 004 7.64v2.125a2 2 0 001.16 1.841L12 14z"
        />
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 14v7" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-7" />
      </svg> -->
      <div
        class="bg-purple-600 rounded-full px-4 py-1 text-white font-semibold"
      >
        Dev MediU
      </div>

      <!-- Logout Button for lg and xl screens only -->
      <div class="hidden lg:flex items-center space-x-4">
        <button
          @click="handleLogout"
          class="text-white bg-red-600 hover:bg-red-500 rounded-md px-4 py-2"
        >
          Logout
        </button>
      </div>
    </div>

    <!-- Sidenav for sm and md screens -->
    <transition name="slide">
      <div
        v-if="isSidenavOpen"
        class="fixed inset-0 bg-[#28574e] text-[#28574e] bg-opacity-50 z-50"
        @click="toggleSidenav"
      >
        <aside
          class="w-64 bg-gray-200 p-4 fixed inset-y-0 left-0 top-0"
          @click.stop
        >
          <h1 class="text-2xl font-bold mb-6">Mediu Dashboard</h1>
          <nav>
            <ul>
              <li class="mb-2">
                <a
                  href="/"
                  class="border border-[#28574e] rounded-md block py-2 px-4 hover:bg-gray-400"
                  >Home</a
                >
              </li>
              <li class="mb-2">
                <div
                  @click="toggleDropdown('orders')"
                  class="border border-[#28574e] rounded-md flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-gray-400"
                >
                  <span>Orders</span>
                  <span
                    :class="{ 'rotate-180': dropdowns.orders }"
                    class="transition-transform transform"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </div>
                <ul v-if="dropdowns.orders" class="ml-4 space-y-1 mt-1">
                  <li>
                    <a
                      href="/orders"
                      class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >All Orders</a
                    >
                  </li>
                  <li>
                    <a
                      href="/drafts"
                      class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >Drafts</a
                    >
                  </li>
                  <li>
                    <a
                      href="/abandoned-checkouts"
                      class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >Abandoned checkouts</a
                    >
                  </li>
                </ul>
              </li>
              <li class="mb-2">
                <div
                  @click="toggleDropdown('products')"
                  class="border border-[#28574e] rounded-md flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-gray-400"
                >
                  <span>Products</span>
                  <span
                    :class="{ 'rotate-180': dropdowns.products }"
                    class="transition-transform transform"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </div>
                <ul v-if="dropdowns.products" class="ml-4 space-y-1 mt-1">
                  <li>
                    <a
                      href="/product"
                      class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >All Products</a
                    >
                  </li>
                  <li>
                    <a
                      href="/collections"
                      class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >Collections</a
                    >
                  </li>
                  <li>
                    <a
                      href="/inventory"
                      class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >Inventory</a
                    >
                  </li>
                  <li>
                    <a
                      href="/purchase"
                      class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >Purchase Orders</a
                    >
                  </li>
                </ul>
              </li>
              <li class="mb-2">
                <a
                  href="/customers"
                  class="border border-[#28574e] rounded-md block py-2 px-4 hover:bg-gray-400"
                  >Customers</a
                >
              </li>
              <!-- <li class="mb-2">
                <div
                  @click="toggleDropdown('customers')"
                  class="border border-[#28574e] rounded-md flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-gray-400"
                >
                  <span>Customers</span>
                  <span
                    :class="{ 'rotate-180': dropdowns.customers }"
                    class="transition-transform transform"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </div>
                <ul v-if="dropdowns.customers" class="ml-4 space-y-1 mt-1">
                  <li>
                    <a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >All Customers</a
                    >
                  </li>
                  <li>
                    <a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >Segments</a
                    >
                  </li>
                  <li>
                    <a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >Companies</a
                    >
                  </li>
                </ul>
              </li> -->

              <!-- <li class="mb-2">
                <div
                  @click="toggleDropdown('content')"
                  class="border border-[#28574e] rounded-md flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-gray-400"
                >
                  <span>Content</span>
                  <span
                    :class="{ 'rotate-180': dropdowns.content }"
                    class="transition-transform transform"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-chevron-down"
                    >
                      <path d="m6 9 6 6 6-6" /></svg
                  ></span>
                </div>
                <ul v-if="dropdowns.content" class="ml-4 space-y-1 mt-1">
                  
                  <li>
                    <a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >Metaobjects</a
                    >
                  </li>
                  <li>
                    <a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >Files</a
                    >
                  </li>
                </ul>
              </li> -->
              <!-- <li class="mb-2">
                <div
                  @click="toggleDropdown('analytics')"
                  class="border border-[#28574e] rounded-md flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-gray-400"
                >
                  <span>Analytics</span>
                  <span
                    :class="{ 'rotate-180': dropdowns.analytics }"
                    class="transition-transform transform"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-chevron-down"
                    >
                      <path d="m6 9 6 6 6-6" /></svg
                  ></span>
                </div>
                <ul v-if="dropdowns.analytics" class="ml-4 space-y-1 mt-1">
                  <li>
                    <a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >Reports</a
                    >
                  </li>
                  <li>
                    <a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >Live view</a
                    >
                  </li>
                </ul>
              </li> -->
              <!-- <li class="mb-2">
                <div
                  @click="toggleDropdown('marketing')"
                  class="border border-[#28574e] rounded-md flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-gray-400"
                >
                  <span>Marketing</span>
                  <span
                    :class="{ 'rotate-180': dropdowns.marketing }"
                    class="transition-transform transform"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-chevron-down"
                    >
                      <path d="m6 9 6 6 6-6" /></svg
                  ></span>
                </div>
                <ul v-if="dropdowns.marketing" class="ml-4 space-y-1 mt-1">
                  <li>
                    <a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >Campaigns</a
                    >
                  </li>
                  <li>
                    <a href="#" class="block py-1 px-2 hover:bg-gray-400 rounded"
                      >Automations</a
                    >
                  </li>
                </ul>
              </li> -->
              <li class="mb-2">
                <a
                  href="/consultancy"
                  class="border border-[#28574e] rounded-md block py-2 px-4 hover:bg-gray-400"
                  >Consultancy</a
                >
              </li>
              <li class="mb-2">
                <button
                  @click="handleLogout"
                  class="border border-[#28574e] rounded-md block py-2 px-4 hover:bg-gray-400"
                >
                  Log Out
                </button>
              </li>
              <!-- More sidenav items can be added here -->
            </ul>
          </nav>
        </aside>
      </div>
    </transition>
  </div>
</template>

<script>
import { logout } from "~/appwrite/login-admin";

export default {
  data() {
    return {
      isSidenavOpen: false,
      dropdowns: {
        orders: false,
        products: false,
        customers: false,
      },
    };
  },
  methods: {
    toggleSidenav() {
      this.isSidenavOpen = !this.isSidenavOpen;
    },
    toggleDropdown(dropdown) {
      this.dropdowns[dropdown] = !this.dropdowns[dropdown];
    },
    async handleLogout() {
      await logout(); // Call the logout function
      // Optionally, redirect to login page or perform any other action after logout
      this.$router.push("/auth/login"); // Adjust the path according to your routing
    },
  },
};
</script>

<style scoped>
/* Slide-in transition for sidenav */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8> */ {
  transform: translateX(-100%);
}
</style>
