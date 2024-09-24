<template>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="px-4 py-2">Product</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Inventory</th>
            <th class="px-4 py-2">Sales Channels</th>
            <th class="px-4 py-2">Markets</th>
            <th class="px-4 py-2">B2B Catalogs</th>
            <th class="px-4 py-2">Category</th>
            <th class="px-4 py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" class="bg-gray-100 border-b">
            <td class="px-4 py-2 flex items-center">
              <a :href="product.link">
                <img :src="product.image" alt="Product Image" class="w-10 h-10 mr-3 rounded" />
              </a>
              <a :href="product.link" class="text-blue-500 hover:underline">{{ product.name }}</a>
            </td>
            <td class="px-4 py-2">
              <span :class="product.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'"
                class="px-2 py-1 rounded">{{ product.status }}</span>
            </td>
            <td class="px-4 py-2">{{ product.inventory }}</td>
            <td class="px-4 py-2">{{ product.salesChannels }}</td>
            <td class="px-4 py-2">{{ product.markets }}</td>
            <td class="px-4 py-2">{{ product.b2bCatalogs }}</td>
            <td class="px-4 py-2">{{ product.category }}</td>
            <td class="px-4 py-2">{{ product.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      products: {
        type: Array,
        default: () => []
      }
    }
  }
  </script>
  
  <style scoped>
  table {
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
  }
  </style>
  