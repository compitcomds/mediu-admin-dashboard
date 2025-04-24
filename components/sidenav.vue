<template>
  <aside
    class="fixed inset-y-0 left-0 top-16 hidden w-64 overflow-y-auto bg-[#238878] p-6 text-white shadow-lg lg:block"
  >
    <nav v-if="!isLoading">
      <ul>
        <li v-for="route in validatedRoutes" :key="route.to" class="mb-4">
          <!-- For routes with children (dropdown menus) -->
          <template v-if="route.children">
            <div
              @click="toggleDropdown(route.label.toLowerCase())"
              class="flex cursor-pointer items-center justify-between rounded px-4 py-2 transition-colors hover:bg-white hover:text-black"
            >
              <span class="flex items-center">
                <i :class="[route.icon, 'mr-3 text-xl']"></i> {{ route.label }}
              </span>
              <span
                :class="{ 'rotate-180': dropdowns[route.label.toLowerCase()] }"
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
            <ul
              v-if="dropdowns[route.label.toLowerCase()]"
              class="ml-6 mt-2 space-y-2"
            >
              <li v-for="child in route.children" :key="child.to">
                <nuxt-link
                  :to="child.to"
                  class="block rounded px-2 py-1 transition-colors hover:bg-white hover:text-black"
                >
                  {{ child.label }}
                </nuxt-link>
              </li>
            </ul>
          </template>

          <!-- For routes without children (regular links) -->
          <nuxt-link
            v-else
            :to="route.to"
            class="flex items-center rounded px-4 py-2 transition-colors hover:bg-white hover:text-black"
          >
            <i :class="[route.icon, 'mr-3 text-xl']"></i> {{ route.label }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <div class="flex items-center justify-center" v-else>
      <Loader />
    </div>
  </aside>
</template>

<script setup lang="ts">
const dropdowns = ref<Record<string, boolean>>({
  orders: false,
  products: false,
  customers: false,
  content: false,
  analytics: false,
  marketing: false,
  consultancy: false,
  discounts: false,
});

function toggleDropdown(dropdown: string) {
  dropdowns.value[dropdown] = !dropdowns.value[dropdown];
}

const routes = [
  { to: "/", label: "Home", icon: "fas fa-home" },
  { to: "/orders", label: "Orders", icon: "fas fa-boxes" },
  {
    to: "/products",
    label: "Products",
    icon: "fas fa-cogs",
    children: [
      { to: "/product", label: "All Products" },
      { to: "/collections", label: "Collections" },
      { to: "/inventory", label: "Inventory" },
    ],
  },
  { to: "/alert", label: "Alert Users", icon: "fas fa-exclamation-circle" },
  { to: "/edit-home", label: "Edit Home Page", icon: "fas fa-edit" },
  {
    to: "/customers",
    label: "Users",
    icon: "fas fa-users",
    children: [
      { to: "/customers", label: "Customers" },
      { to: "/customers/dashboard-users", label: "Dashboard Users" },
      { to: "/customers/roles", label: "Roles" },
    ],
  },
  {
    to: "/consultancy",
    label: "Consultancy",
    icon: "fas fa-handshake",
    children: [
      { to: "/consultancy/services", label: "Services" },
      { to: "/consultancy/bookings", label: "Bookings" },
    ],
  },
  {
    to: "/blogs",
    label: "Blogs",
    icon: "fas fa-blog",
    children: [
      { to: "/blogs", label: "All Blogs" },
      { to: "/blogs/category", label: "All Categories" },
    ],
  },
  { to: "/guide", label: "Guide", icon: "fas fa-book" },
  { to: "/help-and-support", label: "Help & Support", icon: "fas fa-headset" },
  { to: "/profile", label: "Profile", icon: "fas fa-user" },
];

const validatedRoutes = ref<any[]>([]);
const isLoading = ref(true);

async function computeValidatedRoutes() {
  isLoading.value = true;
  try {
    const validated = await Promise.all(
      routes.map(async (route) => {
        if (!route.children) {
          const hasPermission = await validateRouteForAuthenticatedUsers(
            route.to,
          );
          return hasPermission ? route : null;
        }

        const validChildren = await Promise.all(
          route.children.map(async (child) => {
            const hasPermission = await validateRouteForAuthenticatedUsers(
              child.to,
            );
            return hasPermission ? child : null;
          }),
        );

        const permittedChildren = validChildren.filter(Boolean);

        if (permittedChildren.length > 0) {
          return {
            ...route,
            children: permittedChildren,
          };
        }

        return null;
      }),
    );

    validatedRoutes.value = validated.filter(Boolean);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  computeValidatedRoutes();
});
</script>

<style scoped>
.fas {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}
</style>
