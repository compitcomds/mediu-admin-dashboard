<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidenav />
    <div class="lg:ml-64 flex-1 overflow-y-auto p-8 mt-10 bg-gray-100">
      <NavigationButton />
      <div class="flex flex-col lg:flex-row bg-white p-6 rounded-lg shadow-md">
        <!-- Left Section: Order Creation -->
        <div class="w-full lg:w-2/3">
          <h2 class="text-xl font-semibold mb-4">Create Order</h2>

          <!-- Products Section -->
          <div class="border rounded-lg p-4 mb-4">
            <div class="flex justify-between items-center mb-4">
              <input
                type="text"
                class="border w-full p-2 rounded-lg"
                placeholder="Search products"
              />
              <button
                @click="openModal"
                class="ml-2 bg-[#28574e] text-white py-2 px-6 rounded-lg"
              >
                Browse
              </button>
              <button
                @click="openModal"
                class="ml-2 bg-[#28574e] text-white py-2 px-6 rounded-lg w-full lg:w-5/12"
              >
                Add custom item
              </button>
            </div>
          </div>

          <!-- Payment Section -->
          <div class="border rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-2">Payment</h3>
            <div>
              <div class="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>₹0.00</span>
              </div>
              <div class="flex justify-between mb-2">
                <span>Add discount:</span>
                <span>₹0.00</span>
              </div>
              <div class="flex justify-between mb-2">
                <span>Add shipping or delivery:</span>
                <span>₹0.00</span>
              </div>
              <div class="flex justify-between mb-2">
                <span>Estimated tax:</span>
                <span>Not calculated</span>
              </div>
              <div class="flex justify-between font-semibold">
                <span>Total:</span>
                <span>₹0.00</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Section: Notes, Customer, Market, Tags -->
        <div class="w-full lg:w-1/3 lg:ml-4 mt-4 lg:mt-0">
          <!-- Notes Section -->
          <div class="border rounded-lg p-4 mb-4">
            <h3 class="text-lg font-semibold mb-2">Notes</h3>
            <textarea class="w-full h-20 border p-2 rounded-lg"></textarea>
          </div>

          <!-- Customer Section -->
          <div class="border rounded-lg p-4 mb-4">
            <h3 class="text-lg font-semibold mb-2">Customer</h3>
            <input
              type="text"
              class="w-full border p-2 rounded-lg"
              placeholder="Search or create a customer"
            />
          </div>

          <!-- Market Section -->
          <div class="border rounded-lg p-4 mb-4">
            <h3 class="text-lg font-semibold mb-2">Market</h3>
            <p>Pricing: India (INR ₹)</p>
          </div>

          <!-- Tags Section -->
          <div class="border rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-2">Tags</h3>
            <input
              type="text"
              class="w-full border p-2 rounded-lg"
              placeholder="Add tags"
            />
          </div>
        </div>
      </div>

      <!-- Custom Item Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold mb-4">Add Custom Item</h2>
            <button @click="addItem" class="py-2 px-4 rounded-lg">
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
                class="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div class="space-y-4">
            <div class="flex justify-between items-center space-x-4 w-full">
              <div class="w-full lg:w-1/3">
                <label class="block text-gray-700">Item name</label>
                <input
                  v-model="customItem.name"
                  type="text"
                  class="w-full border p-2 rounded-lg"
                  placeholder="Item name"
                />
              </div>
              <div class="w-full lg:w-1/3">
                <label class="block text-gray-700">Price</label>
                <input
                  v-model="customItem.price"
                  type="number"
                  class="w-full border p-2 rounded-lg"
                  placeholder="Price"
                />
              </div>
              <div class="w-full lg:w-1/3">
                <label class="block text-gray-700">Quantity</label>
                <input
                  v-model="customItem.quantity"
                  type="number"
                  class="w-full border p-2 rounded-lg"
                  placeholder="Quantity"
                />
              </div>
            </div>

            <div class="flex items-center">
              <input
                v-model="customItem.taxable"
                type="checkbox"
                class="mr-2"
              />
              <span>Item is taxable</span>
            </div>
            <div class="flex items-center">
              <input
                v-model="customItem.physical"
                type="checkbox"
                class="mr-2"
              />
              <span>Item is a physical product</span>
            </div>
            <div>
              <label class="block text-gray-700">Item weight (optional)</label>
              <div class="flex gap-2">
                <input
                  v-model="customItem.weight"
                  type="number"
                  class="w-full border p-2 rounded-lg"
                  placeholder="0"
                />
                <select
                  v-model="customItem.weightUnit"
                  class="border p-2 rounded-lg"
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="lb">lb</option>
                  <option value="oz">oz</option>
                </select>
              </div>
            </div>
          </div>
          <div class="mt-6 flex justify-end">
            <button
              @click="closeModal"
              class="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              @click="addItem"
              class="bg-[#28574e] text-white py-2 px-4 rounded-lg"
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      customItem: {
        name: "",
        price: 0,
        quantity: 1,
        weight: 0,
        weightUnit: "kg",
        taxable: true,
        physical: true,
      },
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    addItem() {
      // Logic to add the custom item
      console.log("Custom Item Added:", this.customItem);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* Custom styles */
</style>
