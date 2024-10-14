<template>
  <div class="lg:ml-64 flex-1 w-full items-center justify-center overflow-y-auto mt-10 bg-gradient-to-b from-gray-100 to-white p-6 lg:p-10">
    <!-- Welcome Section -->
    <div class="bg-white flex flex-col shadow-2xl rounded-xl p-12 mb-10 items-center space-y-6 w-full text-[#28574e]">
      <img src="https://ccdstest.b-cdn.net/Medi%20u/logo%202.png" alt="Mediu Logo" class="w-60 rounded-lg shadow-md">
      <h2 class="text-4xl text-center font-bold">Hey Admin</h2>
      <h2 class="text-4xl text-center font-bold">Welcome To Mediu</h2>
      <p class="text-lg text-center text-gray-600 max-w-2xl">Here you can manage all your e-commerce activities, track sales, orders, and customers efficiently. Let's get started!</p>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full mb-16">
      <div class="bg-gradient-to-r from-green-200 to-white shadow-xl rounded-lg p-10 flex flex-col items-center transition transform hover:scale-105 hover:shadow-2xl">
        <h3 class="text-3xl font-semibold text-gray-900 mb-4">Total Sales</h3>
        <p class="text-5xl font-extrabold text-green-800">$56,000</p>
        <p class="text-sm text-gray-600 mt-2">Compared to last month: <span class="text-green-600 font-semibold">+12%</span></p>
      </div>
      <div class="bg-gradient-to-r from-blue-200 to-white shadow-xl rounded-lg p-10 flex flex-col items-center transition transform hover:scale-105 hover:shadow-2xl">
        <h3 class="text-3xl font-semibold text-gray-900 mb-4">Total Orders</h3>
        <p class="text-5xl font-extrabold text-blue-800">1,245</p>
        <p class="text-sm text-gray-600 mt-2">New orders today: <span class="text-blue-600 font-semibold">32</span></p>
      </div>
      <div class="bg-gradient-to-r from-indigo-200 to-white shadow-xl rounded-lg p-10 flex flex-col items-center transition transform hover:scale-105 hover:shadow-2xl">
        <h3 class="text-3xl font-semibold text-gray-900 mb-4">Total Customers</h3>
        <p class="text-5xl font-extrabold text-indigo-800">980</p>
        <p class="text-sm text-gray-600 mt-2">New customers this week: <span class="text-indigo-600 font-semibold">15</span></p>
      </div>
    </div>

    <!-- Recent Orders -->
    <div class="bg-white shadow-2xl rounded-xl p-12 w-full mb-16 overflow-x-auto">
      <h3 class="text-4xl font-semibold text-gray-900 mb-10">Recent Orders</h3>
      <table class="min-w-full bg-white rounded-lg">
        <thead>
          <tr class="bg-gray-300">
            <th class="py-4 px-6 text-left text-gray-900 font-semibold uppercase tracking-wide whitespace-nowrap">Order ID</th>
            <th class="py-4 px-6 text-left text-gray-900 font-semibold uppercase tracking-wide whitespace-nowrap">Customer</th>
            <th class="py-4 px-6 text-left text-gray-900 font-semibold uppercase tracking-wide whitespace-nowrap">Total</th>
            <th class="py-4 px-6 text-left text-gray-900 font-semibold uppercase tracking-wide whitespace-nowrap">Status</th>
            <th class="py-4 px-6 text-left text-gray-900 font-semibold uppercase tracking-wide whitespace-nowrap">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-100 transition">
            <td class="py-4 px-6 whitespace-nowrap">#1001</td>
            <td class="py-4 px-6 whitespace-nowrap">John Doe</td>
            <td class="py-4 px-6 whitespace-nowrap">$150.00</td>
            <td class="py-4 px-6 text-green-800 font-semibold whitespace-nowrap">Completed</td>
            <td class="py-4 px-6 whitespace-nowrap">2024-10-01</td>
          </tr>
          <tr class="hover:bg-gray-100 transition">
            <td class="py-4 px-6 whitespace-nowrap">#1002</td>
            <td class="py-4 px-6 whitespace-nowrap">Jane Smith</td>
            <td class="py-4 px-6 whitespace-nowrap">$200.00</td>
            <td class="py-4 px-6 text-yellow-800 font-semibold whitespace-nowrap">Pending</td>
            <td class="py-4 px-6 whitespace-nowrap">2024-10-03</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end mt-6">
        <button class="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-300">View All Orders</button>
      </div>
    </div>

    <!-- Quick Links for Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full mb-16">
      <button class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h18M3 8h18M5 12h14M3 16h18M5 20h14" />
        </svg>
        <span>Manage Products</span>
      </button>
      <button class="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 flex items-center justify-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 10l5 5m0 0l5-5m-5 5V6" />
        </svg>
        <span>Manage Orders</span>
      </button>
      <button class="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex items-center justify-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 12H8m0 0l4-4m-4 4l4 4" />
        </svg>
        <span>Manage Customers</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* You can add additional styles to customize the look further */
</style>