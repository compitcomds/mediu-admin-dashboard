<template>
    <div class="flex h-screen">
      <!-- Sidebar -->
      <Sidenav />
      <div class="ml-64 flex-1 overflow-y-auto p-8 mt-10 bg-gray-100 ">
        <div>
          <!-- Header -->
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-semibold">Drafts</h1>
            <div class="flex space-x-4">
              <button class="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">
                Export
              </button>
              <button class="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
                Create order
              </button>
            </div>
          </div>
  
          <!-- Filters Navigation -->
          <div class="border-b border-gray-200 mb-4">
            <nav class="flex space-x-4">
              <button
                v-for="filter in filters"
                :key="filter"
                @click="setActiveFilter(filter)"
                class="py-2 px-4 text-sm font-medium focus:outline-none"
                :class="{
                  'text-black border-b-2 border-black': activeFilter === filter,
                  'text-gray-500 hover:text-black': activeFilter !== filter
                }"
              >
                {{ filter }}
              </button>
            </nav>
          </div>
  
          <!-- Draft Orders Table -->
          <div class="bg-white rounded shadow overflow-x-auto">
            <table class="min-w-full text-left">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 border-b border-gray-200">
                    <input type="checkbox" class="form-checkbox" />
                  </th>
                  <th class="px-4 py-3 border-b border-gray-200">Draft order</th>
                  <th class="px-4 py-3 border-b border-gray-200">PO number</th>
                  <th class="px-4 py-3 border-b border-gray-200">Date</th>
                  <th class="px-4 py-3 border-b border-gray-200">Customer</th>
                  <th class="px-4 py-3 border-b border-gray-200">Status</th>
                  <th class="px-4 py-3 border-b border-gray-200">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="order in filteredOrders"
                  :key="order.id"
                  class="hover:bg-gray-50"
                >
                  <td class="px-4 py-3 border-b border-gray-200">
                    <input type="checkbox" class="form-checkbox" />
                  </td>
                  <td class="px-4 py-3 border-b border-gray-200 text-blue-600">
                    {{ order.id }}
                  </td>
                  <td class="px-4 py-3 border-b border-gray-200">
                    {{ order.poNumber || "—" }}
                  </td>
                  <td class="px-4 py-3 border-b border-gray-200">
                    {{ order.date }}
                  </td>
                  <td class="px-4 py-3 border-b border-gray-200">
                    {{ order.customer || "—" }}
                  </td>
                  <td class="px-4 py-3 border-b border-gray-200">
                    <span
                      class="inline-flex items-center px-2 py-1 text-xs font-semibold leading-none text-gray-700 bg-gray-200 rounded-full"
                      >Open</span
                    >
                  </td>
                  <td class="px-4 py-3 border-b border-gray-200">
                    {{ order.total }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Learn More Link -->
          <div class="mt-4 text-center text-gray-500">
            Learn more about
            <a href="#" class="text-blue-600">creating draft orders</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DraftOrdersPage",
    data() {
      return {
        activeFilter: "All",
        filters: [
          "All",
          "Open and invoice sent",
          "Open",
          "Invoice sent",
          "Completed",
          "Submitted for review",
        ],
        orders: [
          {
            id: "#D10",
            poNumber: "",
            date: "Aug 12 at 5:27 am",
            customer: "",
            total: "₹3,389.90 INR",
          },
          {
            id: "#D8",
            poNumber: "",
            date: "Aug 12 at 5:27 am",
            customer: "",
            total: "₹1,806.38 INR",
          },
          {
            id: "#D5",
            poNumber: "",
            date: "Aug 12 at 5:27 am",
            customer: "",
            total: "₹1,289.91 INR",
          },
          {
            id: "#D3",
            poNumber: "",
            date: "Aug 12 at 5:27 am",
            customer: "",
            total: "₹230.00 INR",
          },
          {
            id: "#D9",
            poNumber: "",
            date: "Jul 30 at 2:07 am",
            customer: "Karine Ruby\nSnowdevil",
            total: "₹759.95 INR",
          },
          {
            id: "#D7",
            poNumber: "",
            date: "Jul 30 at 2:07 am",
            customer: "Karine Ruby\nSnowdevil",
            total: "₹729.95 INR",
          },
          {
            id: "#D6",
            poNumber: "",
            date: "Jul 30 at 2:07 am",
            customer: "Karine Ruby\nSnowdevil",
            total: "₹2,129.85 INR",
          },
          {
            id: "#D4",
            poNumber: "",
            date: "Jul 30 at 2:07 am",
            customer: "",
            total: "$662.72 MXN",
          },
          {
            id: "#D2",
            poNumber: "",
            date: "Jul 30 at 2:07 am",
            customer: "",
            total: "₹965.69 INR",
          },
          {
            id: "#D1",
            poNumber: "",
            date: "Jul 30 at 2:07 am",
            customer: "",
            total: "₹965.69 INR",
          },
        ],
      };
    },
    computed: {
      filteredOrders() {
        // Filter orders based on activeFilter
        // Implement any custom filtering logic based on activeFilter
        return this.orders;
      },
    },
    methods: {
      setActiveFilter(filter) {
        this.activeFilter = filter;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Custom styles for the page if needed */
  </style>
  