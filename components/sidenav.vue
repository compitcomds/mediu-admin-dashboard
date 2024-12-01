<template>
  <aside
    class="w-64 bg-[#238878] text-white p-6 fixed inset-y-0 left-0 top-16 hidden lg:block shadow-lg"
  >
    <h1 class="text-2xl font-bold my-4 text-center text-white">
      Admin Dashboard
    </h1>
    <div class="border-t border-white my-4"></div>
    <nav>
      <ul>
        <li class="mb-4">
          <a
            href="/"
            class="flex items-center py-2 px-4 hover:bg-white hover:text-black rounded transition-colors"
          >
            <i class="fas fa-home text-xl mr-3"></i> Home
          </a>
        </li>
        <li class="mb-4">
          <div
            @click="toggleDropdown('orders')"
            class="flex items-center justify-between cursor-pointer py-2 px-4 hover:bg-white hover:text-black rounded transition-colors"
          >
            <span class="flex items-center">
              <i class="fas fa-boxes text-xl mr-3"></i> Orders
            </span>
            <span
              :class="{ 'rotate-180': dropdowns.orders }"
              class="transition-transform transform"
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
          <ul v-if="dropdowns.orders" class="ml-6 space-y-2 mt-2">
            <li>
              <nuxt-link
                to="/orders"
                class="block py-1 px-2 hover:bg-white hover:text-black rounded transition-colors"
                >All Orders</nuxt-link
              >
            </li>
            <li>
              <a
                href="/drafts"
                class="block py-1 px-2 hover:bg-white hover:text-black rounded transition-colors"
                >Drafts</a
              >
            </li>
            <li>
              <a
                href="/abandoned-checkouts"
                class="block py-1 px-2 hover:bg-white hover:text-black rounded transition-colors"
                >Abandoned Checkouts</a
              >
            </li>
          </ul>
        </li>
        <li class="mb-4">
          <div
            @click="toggleDropdown('products')"
            class="flex items-center justify-between cursor-pointer py-2 px-4 hover:bg-white hover:text-black rounded transition-colors"
          >
            <span class="flex items-center">
              <i class="fas fa-cogs text-xl mr-3"></i> Products
            </span>
            <span
              :class="{ 'rotate-180': dropdowns.products }"
              class="transition-transform transform"
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
          <ul v-if="dropdowns.products" class="ml-6 space-y-2 mt-2">
            <li>
              <nuxt-link
                to="/product"
                class="block py-1 px-2 hover:bg-white hover:text-black rounded transition-colors"
                >All Products</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="/collections"
                class="block py-1 px-2 hover:bg-white hover:text-black rounded transition-colors"
                >Collections</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="/inventory"
                class="block py-1 px-2 hover:bg-white hover:text-black rounded transition-colors"
                >Inventory</nuxt-link
              >
            </li>
          </ul>
        </li>
        <li class="mb-4">
          <nuxt-link
            to="/alert"
            class="flex items-center py-2 px-4 hover:bg-white hover:text-black rounded transition-colors"
          >
            <i class="fas fa-exclamation-circle text-xl mr-3"></i> Alert Users
          </nuxt-link>
        </li>
        <li class="mb-4">
          <a
            href="/customers"
            class="flex items-center py-2 px-4 hover:bg-white hover:text-black rounded transition-colors"
          >
            <i class="fas fa-users text-xl mr-3"></i> Customers
          </a>
        </li>
        <li class="mb-4">
          <button
            @click="toggleDropdown('consultancy')"
            class="flex w-full items-center justify-between cursor-pointer py-2 px-4 hover:bg-white hover:text-black rounded transition-colors"
          >
            <span class="flex items-center">
              <i class="fas fa-handshake text-xl mr-3"></i> Consultancy
            </span>
            <span
              :class="{ 'rotate-180': dropdowns.consultancy }"
              class="transition-transform transform"
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
          <ul v-if="dropdowns.consultancy" class="ml-6 space-y-2 mt-2">
            <li>
              <nuxt-link
                to="/consultancy/services"
                class="block py-1 px-2 hover:bg-white hover:text-black rounded transition-colors"
                >Services</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="/consultancy/bookings"
                class="block py-1 px-2 hover:bg-white hover:text-black rounded transition-colors"
                >Bookings</nuxt-link
              >
            </li>
          </ul>
        </li>
        <li class="mb-4">
          <nuxt-link
            to="/guide"
            class="flex items-center py-2 px-4 hover:bg-white hover:text-black rounded transition-colors"
          >
            <i class="fas fa-book text-xl mr-3"></i> Guide
          </nuxt-link>
        </li>
        <li class="mb-4">
          <nuxt-link
            to="/helpAndSupport"
            class="flex items-center py-2 px-4 hover:bg-white hover:text-black rounded transition-colors"
          >
            <i class="fas fa-headset text-xl mr-3"></i> Help & Support
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      dropdowns: {
        orders: false,
        products: false,
        customers: false,
        content: false,
        analytics: false,
        marketing: false,
        consultancy: false,
        discounts: false,
      },
    };
  },
  methods: {
    toggleDropdown(dropdown) {
      this.dropdowns[dropdown] = !this.dropdowns[dropdown];
    },
  },
};
</script>

<style scoped>
.fas {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}
</style>
