<template>
    <div class="flex flex-col min-h-screen py-10 lg:py-5 bg-gray-100">
      <Sidenav />
      <div class="lg:ml-64 flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 mt-4">
        <NavigationButton />
        <div class="flex items-center mb-4">
          <h1 class="text-xl font-semibold text-gray-800 ml-4">Create Purchase Order</h1>
        </div>
  
        <!-- Main Form -->
        <div class="bg-white shadow-sm rounded-lg p-4 sm:p-6 md:p-8 space-y-6">
          <!-- Supplier and Destination -->
          <div class="flex flex-col lg:flex-row justify-between gap-4">
            <div class="space-y-1 w-full">
              <label class="text-gray-700 font-medium">Supplier</label>
              <div class="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                <span class="text-gray-600">Select supplier</span>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            <div class="space-y-1 w-full">
              <label class="text-gray-700 font-medium">Destination</label>
              <div class="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                <span class="text-gray-600">Shop location</span>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
  
          <!-- Payment Terms and Currency -->
          <div class="flex flex-col lg:flex-row justify-between gap-4">
            <div class="space-y-1 w-full">
              <label class="text-gray-700 font-medium">Payment terms (optional)</label>
              <select v-model="formData.paymentTerms" class="w-full border border-gray-300 rounded-lg p-3">
                <option>None</option>
                <option>Cash on delivery</option>
                <option>Net 30</option>
                <option>Net 60</option>
              </select>
            </div>
            <div class="space-y-1 w-full">
              <label class="text-gray-700 font-medium">Supplier currency</label>
              <select v-model="formData.currency" class="w-full border border-gray-300 rounded-lg p-3">
                <option>Indian Rupee (INR ₹)</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>
        </div>
  
        <div class="bg-white shadow-sm rounded-lg p-4 sm:p-6 md:p-8 space-y-6 mt-6">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-800">Shipping Details</h1>
          </div>
          <!-- Shipment Details -->
          <div class="grid gap-4 md:gap-6 lg:gap-8 lg:grid-cols-3">
            <div class="space-y-1">
              <label class="text-gray-700 font-medium">Estimated arrival</label>
              <input type="date" v-model="formData.estimatedArrival"
                class="w-full border border-gray-300 rounded-lg p-3" />
            </div>
            <div class="space-y-1">
              <label class="text-gray-700 font-medium">Shipping carrier</label>
              <select v-model="formData.shippingCarrier" class="w-full border border-gray-300 rounded-lg p-3">
                <option>India Post Domestic</option>
                <option>DHL</option>
                <option>FedEx</option>
                <option>UPS</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-gray-700 font-medium">Tracking number</label>
              <input type="text" v-model="formData.trackingNumber" placeholder="Enter tracking number"
                class="w-full border border-gray-300 rounded-lg p-3" />
            </div>
          </div>
        </div>
  
        <div class="bg-white shadow-sm rounded-lg p-4 sm:p-6 md:p-8 space-y-6 mt-6">
          <!-- Product Search and Add -->
          <label class="text-gray-700 font-medium">Add products</label>
          <div class="border border-gray-300 rounded-lg p-3 flex items-center mb-6">
            <input type="text" v-model="newProduct.name" placeholder="Search products"
              class="w-full border-0 focus:ring-0 focus:border-none" />
            <button @click="showProductModal" class="text-blue-500 font-medium hover:underline">
              Browse
            </button>
          </div>
        </div>
  
        <!-- Product List - Responsive View (Boxes) -->
        <div v-if="formData.products.length > 0" class="sm:block lg:hidden bg-white shadow-sm rounded-lg p-4 sm:p-6 md:p-8 space-y-6 mt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(product, index) in formData.products" :key="index" class="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2 shadow-sm">
              <div class="flex justify-between items-center">
                <img :src="product.image" alt="Product Image" class="w-16 h-16 rounded-lg object-cover"/>
                <div class="flex-1 ml-4">
                  <h3 class="text-lg font-semibold text-gray-700">{{ product.name }}</h3>
                </div>
                <button @click="removeProduct(index)" class="text-red-500 hover:underline">Remove</button>
              </div>
              <div class="space-y-1">
                <label class="text-gray-600 text-sm">Supplier SKU</label>
                <input type="text" v-model="product.sku" class="border border-gray-300 rounded-lg p-2 w-full" />
              </div>
              <div class="space-y-1">
                <label class="text-gray-600 text-sm">Quantity</label>
                <input type="number" v-model.number="product.quantity" class="border border-gray-300 rounded-lg p-2 w-full" />
              </div>
              <div class="space-y-1">
                <label class="text-gray-600 text-sm">Cost</label>
                <input type="number" v-model.number="product.cost" class="border border-gray-300 rounded-lg p-2 w-full" />
              </div>
              <div class="space-y-1">
                <label class="text-gray-600 text-sm">Tax (%)</label>
                <input type="number" v-model.number="product.tax" placeholder="%" class="border border-gray-300 rounded-lg p-2 w-full" />
              </div>
              <div class="text-right font-semibold">
                Total: ₹ {{ (product.quantity * product.cost * (1 + product.tax / 100)).toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
  
        <!-- Product List - Table View (Large Screens) -->
        <div v-if="formData.products.length > 0" class="hidden lg:block bg-white shadow-sm rounded-lg p-4 sm:p-6 md:p-8 space-y-6 mt-6">
          <table class="min-w-full text-left text-sm">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="py-2">Product Image</th>
                <th class="py-2">Products</th>
                <th>Supplier SKU</th>
                <th>Quantity</th>
                <th>Cost</th>
                <th>Tax(%)</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in formData.products" :key="index" class="border-b space-x-4 border-gray-200">
                <td class="py-2">
                  <img :src="product.image" alt="Product Image" class="w-16 h-16 rounded-lg object-cover"/>
                </td>
                <td class="py-2">{{ product.name }}</td>
                <td>
                  <input type="text" v-model="product.sku"
                    class="border border-gray-300 rounded-lg p-2 my-2 w-full" />
                </td>
                <td>
                  <input type="number" v-model.number="product.quantity"
                    class="border border-gray-300 rounded-lg p-2 w-full" />
                </td>
                <td>
                  <input type="number" v-model.number="product.cost"
                    class="border border-gray-300 rounded-lg p-2 w-full" />
                </td>
                <td>
                  <input type="number" v-model.number="product.tax" placeholder="%"
                    class="border border-gray-300 rounded-lg p-2 w-full" />
                </td>
                <td>{{ (product.quantity * product.cost * (1 + product.tax / 100)).toFixed(2) }}
                </td>
                <td>
                  <button @click="removeProduct(index)"
                    class="text-red-500 hover:underline">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Product Modal -->
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-xl max-w-md md:max-w-lg lg:max-w-xl overflow-hidden w-full mx-4">
            <div class="bg-gray-100 p-6 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-800">Select Products</h2>
            </div>
            <div class="p-4 sm:p-6 grid gap-4 sm:grid-cols-2 md:grid-cols-2">
              <div v-for="(product, index) in availableProducts" :key="index" class="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2 shadow-sm">
                <div class="flex justify-between items-center">
                  <img :src="product.image" alt="Product Image" class="w-16 h-16 rounded-lg object-cover"/>
                  <div class="flex-1 ml-4">
                    <h3 class="text-sm font-semibold text-gray-700">{{ product.name }}</h3>
                  </div>
                  <button @click="addSelectedProduct(product)" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow-md transition duration-200">
                    Add
                  </button>
                </div>
                <div class="text-sm text-gray-600">
                  Available at Destination: {{ product.availableAtDestination }}
                </div>
                <div class="text-sm text-gray-600">
                  Total Available: {{ product.totalAvailable }}
                </div>
              </div>
            </div>
            <div class="p-4 bg-gray-100 border-t border-gray-200 flex justify-end">
              <button @click="showModal = false" class="bg-red-500 hover:bg-red-600 text-black px-4 py-2 rounded-lg shadow-md transition duration-200">
                Close
              </button>
            </div>
          </div>
        </div>
  
        <!-- Additional Details and Cost Summary -->
        <div class="flex flex-col lg:flex-row justify-between gap-4 lg:gap-8 mt-6">
          <!-- Additional Details -->
          <div class="bg-white w-full shadow-sm rounded-lg p-4 sm:p-6 md:p-8 space-y-6">
            <div class="space-y-1">
              <label class="text-gray-700 font-medium">Reference number</label>
              <input type="text" v-model="formData.referenceNumber" placeholder="Enter reference number"
                class="w-full border border-gray-300 rounded-lg p-3" />
            </div>
            <div class="space-y-1">
              <label class="text-gray-700 font-medium">Note to supplier</label>
              <textarea v-model="formData.note" rows="3" placeholder="Enter note to supplier"
                class="w-full border border-gray-300 rounded-lg p-3"></textarea>
            </div>
            <div class="space-y-1">
              <label class="text-gray-700 font-medium">Tags</label>
              <!-- Tag input component -->
              <div class="tag-input">
                <div class="tags">
                  <span v-for="(tag, index) in formData.tags" :key="index" class="tag">
                    {{ tag }} <span class="close" @click="removeTag(index)">×</span>
                  </span>
                </div>
                <input type="text" v-model="newTag" @keyup.enter="addTag" placeholder="Enter tags"
                  class="tag-input-field" />
              </div>
            </div>
          </div>
  
          <!-- Cost Summary -->
          <div class="bg-white w-full shadow-sm rounded-lg p-4 sm:p-6 md:p-8 space-y-6">
            <div class="flex justify-between">
              <span class="text-gray-600">Taxes (Included)</span>
              <span>{{ calculateTaxes() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal</span>
              <span>{{ calculateSubtotal() }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Shipping</span>
              <input type="number" v-model.number="formData.shippingCost" placeholder="Enter shipping cost"
                class="w-1/2 border border-gray-300 rounded-lg p-2" />
            </div>
            <div class="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{{ calculateTotal() }}</span>
            </div>
          </div>
        </div>
  
        <!-- Submit Button -->
        <div class="flex justify-end mt-6">
          <button @click="submitOrder" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
            Create Purchase Order
          </button>
        </div>
      </div>
    </div>
  </template>
  <script>
export default {
  data() {
    return {
      showModal: false,
      newTag: '',
      formData: {
        supplier: '',
        destination: '',
        paymentTerms: '',
        currency: 'Indian Rupee (INR ₹)',
        estimatedArrival: '',
        shippingCarrier: '',
        trackingNumber: '',
        products: [],
        referenceNumber: '',
        note: '',
        tags: [], // Updated to array for tag input
        shippingCost: 0,
      },
      newProduct: {
        name: '',
        sku: '',
        quantity: 1,
        cost: 0,
        tax: 0,
      },
      availableProducts: [
        { 
          name: 'ACNE OC MOISTURISER GM 50', 
          availableAtDestination: 400000, 
          totalAvailable: 400000, 
          image: 'https://via.placeholder.com/150' 
        },
        { 
          name: 'ACNE UV SPF 50 SUNSCREEN 50', 
          availableAtDestination: 10000, 
          totalAvailable: 10000, 
          image: 'https://via.placeholder.com/150' 
        },
        { 
          name: 'anant11', 
          availableAtDestination: 0, 
          totalAvailable: 0, 
          image: 'https://via.placeholder.com/150' 
        },
        { 
          name: 'blowshine', 
          availableAtDestination: 999, 
          totalAvailable: 999, 
          image: 'https://via.placeholder.com/150' 
        },
        // Add more products as needed
      ],
    };
  },
  methods: {
    showProductModal() {
      this.showModal = true;
    },
    addSelectedProduct(product) {
      this.formData.products.push({
        ...product,
        quantity: 1,
        cost: 0,
        tax: 0,
        sku: '',
      });
      this.showModal = false;
    },
    removeProduct(index) {
      this.formData.products.splice(index, 1);
    },
    calculateTaxes() {
      let totalTax = 0;
      this.formData.products.forEach((product) => {
        const tax = (product.cost * product.quantity * (product.tax / 100)).toFixed(2);
        totalTax += parseFloat(tax);
      });
      return `₹ ${totalTax.toFixed(2)}`;
    },
    calculateSubtotal() {
      let subtotal = 0;
      this.formData.products.forEach((product) => {
        subtotal += product.cost * product.quantity;
      });
      return `₹ ${subtotal.toFixed(2)}`;
    },
    calculateTotal() {
      let subtotal = parseFloat(this.calculateSubtotal().replace('₹ ', ''));
      let taxes = parseFloat(this.calculateTaxes().replace('₹ ', ''));
      let total = subtotal + taxes + parseFloat(this.formData.shippingCost);
      return `₹ ${total.toFixed(2)}`;
    },
    submitOrder() {
      // Handle form submission logic here
      console.log('Order Submitted:', this.formData);
    },
    addTag() {
      if (this.newTag.trim() && !this.formData.tags.includes(this.newTag)) {
        this.formData.tags.push(this.newTag.trim());
        this.newTag = '';
      }
    },
    removeTag(index) {
      this.formData.tags.splice(index, 1);
    }
  },
};
</script>
<style scoped>
.tag-input {
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
}

.close {
  cursor: pointer;
  margin-left: 5px;
  color: #999;
}

.tag-input-field {
  border: none;
  outline: none;
  flex: 1;
  padding: 5px;
}
</style>
