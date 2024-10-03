<template>
  <div class="flex h-screen">
    <Sidenav />
    <div class="lg:ml-64 flex-1 overflow-y-auto p-8 mt-10 bg-gray-100">
      <NavigationButton />
      <div>
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-semibold">Consultancy Data</h1>
          <div class="flex space-x-4">
            <button class="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">
              Export
            </button>
            <button class="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">
              More actions
            </button>
            <nuxt-link
              to="/create-consultancy"
              class="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            >
              Create Consultancy
            </nuxt-link>
          </div>
        </div>

        <!-- Filters and Action Bar -->
        <div class="flex items-center bg-white shadow rounded p-2 mb-4">
          <div class="flex space-x-4">
            <button class="py-2 px-4 border-b-2 border-black">All</button>
            <button class="py-2 px-4 hover:border-gray-300">Active</button>
            <button class="py-2 px-4 hover:border-gray-300">Archived</button>
            <button class="py-2 px-4 hover:border-gray-300">+</button>
          </div>
        </div>

        <!-- Consultancy Table -->
        <div class="bg-white rounded shadow overflow-hidden">
          <table class="min-w-full text-left">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 border-b border-gray-200">
                  <input type="checkbox" class="form-checkbox" />
                </th>
                <th class="px-4 py-3 border-b border-gray-200">Consultancy ID</th>
                <th class="px-4 py-3 border-b border-gray-200">Name</th>
                <th class="px-4 py-3 border-b border-gray-200">Date</th>
                <th class="px-4 py-3 border-b border-gray-200">Status</th>
                <th class="px-4 py-3 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="consultancy in consultancies"
                :key="consultancy.userId"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-4 py-3 border-b border-gray-200">
                  <input type="checkbox" class="form-checkbox" />
                </td>
                <td class="px-4 py-3 border-b border-gray-200 text-blue-600">
                  {{ consultancy.userId }}
                </td>
                <td class="px-4 py-3 border-b border-gray-200">
                  {{ consultancy.name }}
                </td>
                <td class="px-4 py-3 border-b border-gray-200">
                  {{ new Date(consultancy.bookingTime).toLocaleDateString() }}
                </td>
                <td class="px-4 py-3 border-b border-gray-200">
                  <span
                    class="inline-flex items-center px-2 py-1 text-xs font-semibold leading-none"
                    :class="
                      consultancy.status === 'active'
                        ? 'text-green-700 bg-green-100'
                        : 'text-red-700 bg-red-100'
                    "
                  >
                    {{ consultancy.consultancy_Status }}
                  </span>
                </td>
                <td class="px-4 py-3 border-b border-gray-200">
                  <nuxt-link
                    :to="`/consultancy/${consultancy.userId}`"
                    class="bg-black text-white font-semibold px-2 py-1 rounded-md shadow-md hover:bg-gray-800"
                  >
                    View
                  </nuxt-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Consultancy Help Link -->
        <div class="mt-4 text-center text-gray-500">
          Learn more about <a href="#" class="text-blue-600">consultancy</a> data --
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { allgetConsultancy } from '~/appwrite/consultancy';

export default {
  data() {
    return {
      consultancies: [],
      error: null,
    };
  },
  async mounted() {
    try {
      const response = await allgetConsultancy();
      if (response.documents) {
        this.consultancies = response.documents; // Assuming documents contain the consultancy data
      } else {
        this.error = response; // Handle the error message
      }
    } catch (err) {
      this.error = "Error fetching consultancy data."; // Handle error
      console.error(err);
    }
  },
};
</script>

<style scoped>
/* Add any additional scoped styles here if necessary */
</style>
