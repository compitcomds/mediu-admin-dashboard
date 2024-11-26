<template>
  <AttachSidebar>
    <div class="" v-if="order">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-semibold">Orders: All locations</h1>
        <div class="flex space-x-4">
          <button class="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">
            Export
          </button>
          <button class="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">
            More actions
          </button>
          <nuxt-link
            to="/create-order"
            class="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Create order
          </nuxt-link>
        </div>
      </div>
      <div class="bg-slate-200 h-fit flex gap-5 items-top w-full p-10">
        <div class="bg-white border w-1/2 rounded-md p-2">
          <div
            class="p-2 text-white font-bold w-fit rounded-md capitalize"
            :class="{
              'bg-[#28574e]': !!order.fulfillment_status,
              'bg-red-500': !order.fulfillment_status,
            }"
          >
            {{ order.fulfillment_status || "Unfulfilled" }}
          </div>

          <div class="p-4 mt-3 border-2 border-gray-300 rounded-lg bg-white">
            <h1 class="text-xl font-bold mb-2">Items ordered</h1>
            <template v-for="(item, index) in order.line_items">
              <div
                class="border-b border-gray-200 pb-4 mb-4 last:mb-0 last:border-0"
              >
                <h4 class="text-lg font-semibold text-gray-800">
                  {{ item.title }}
                </h4>
                <p class="text-gray-600">Vendor: {{ item.vendor }}</p>
                <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
                <p class="text-gray-800 font-bold">Price: ₹{{ item.price }}</p>
                <p class="text-gray-500 text-sm">
                  SKU: {{ item.sku || "N/A" }}
                </p>
                <div class="mt-2">
                  <h5 class="text-md font-semibold text-gray-700">
                    Tax Details
                  </h5>
                  <p class="text-gray-600">
                    Total Tax: ₹{{ item.tax_lines[0]?.price || "0.00" }}
                  </p>
                  <p class="text-gray-500 text-sm">
                    Tax Rate: {{ item.tax_lines[0]?.rate || "0" }}%
                  </p>
                </div>
              </div>
            </template>
          </div>

          <div class="p-4 mt-3 border-2 border-gray-300 rounded-lg bg-white">
            <h3 class="text-lg font-semibold mb-2 text-gray-800">
              Shipping Address
            </h3>
            <p class="mb-1">
              <strong>Name:</strong> {{ order.billing_address.name }}
            </p>
            <p class="mb-1">
              <strong>Address:</strong> {{ order.billing_address.address1
              }}{{
                order.billing_address.address2
                  ? ", " + order.billing_address.address2
                  : ""
              }}
            </p>
            <p class="mb-1">
              <strong>City:</strong> {{ order.billing_address.city }}
            </p>
            <p class="mb-1">
              <strong>State:</strong> {{ order.billing_address.province }}
            </p>
            <p class="mb-1">
              <strong>Zip Code:</strong> {{ order.billing_address.zip }}
            </p>
            <p class="mb-1">
              <strong>Country:</strong> {{ order.billing_address.country }}
            </p>
            <p class="mb-1">
              <strong>Phone:</strong> {{ order.billing_address.phone }}
            </p>
          </div>

          <div
            v-if="prescriptionImage"
            class="p-4 mt-3 border-2 border-gray-300 rounded-lg bg-white"
          >
            <h3 class="text-xl font-semibold mb-4 text-gray-800">
              Prescription Image
            </h3>
            <img :src="prescriptionImage" alt="Prescription Image" />
          </div>
        </div>
        <div class="bg-white border w-1/4 rounded-md p-2">
          <div class="mt-3 rounded-lg bg-white space-y-11">
            <div class="border-2 w-full border-gray-300 p-2 rounded">
              <h3 class="text-xl font-semibold mb-4 text-gray-800">
                Customer Details
              </h3>
              <div class="mb-4">
                <p class="text-lg font-medium text-gray-800">
                  Name: {{ order.customer.first_name }}
                  {{ order.customer.last_name }}
                </p>
                <p class="text-gray-600">
                  Email:
                  <a
                    href="mailto:{{ order.customer.email }}"
                    class="text-blue-500 hover:underline"
                    >{{ order.customer.email }}</a
                  >
                </p>
                <p class="text-gray-600">
                  Phone: {{ order.customer.phone || "N/A" }}
                </p>
                <p class="text-gray-600">
                  Account Status: {{ order.customer.state }}
                </p>
                <p class="text-gray-600">
                  Verified Email:
                  {{ order.customer.verified_email ? "Yes" : "No" }}
                </p>
              </div>
            </div>

            <div class="border-2 w-full border-gray-300 p-2 rounded">
              <h4 class="text-lg font-semibold text-gray-700 mb-2">
                Default Address
              </h4>
              <div class="text-gray-600">
                <p>{{ order.customer.default_address.name }}</p>
                <p>
                  {{ order.customer.default_address.address1
                  }}{{
                    order.customer.default_address.address2
                      ? ", " + order.customer.default_address.address2
                      : ""
                  }}
                </p>
                <p>
                  {{ order.customer.default_address.city }},
                  {{ order.customer.default_address.province }} -
                  {{ order.customer.default_address.zip }}
                </p>
                <p>{{ order.customer.default_address.country }}</p>
                <p>Phone: {{ order.customer.default_address.phone }}</p>
              </div>
            </div>
          </div>
          <button
            @click="openDimensionDialog"
            :disabled="isSubmitting"
            v-if="!order.fulfillment_status"
            class="bg-black text-white text-xl sticky mt-12 font-semibold rounded-md p-1 w-full disabled:animate-pulse disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? "Confirming the order..." : "Confirm" }}
          </button>
          <p
            v-else
            class="bg-[#28574e] text-center text-white text-xl sticky mt-12 font-semibold rounded-md p-1 w-full"
          >
            Confirmed
          </p>
        </div>
      </div>
      <!-- {{ order }} -->
    </div>
    <div v-else>loading the data</div>
  </AttachSidebar>

  <ProductDimensionBox
    :isOpen="isDialogOpen"
    @submit="handleDimensionSubmit"
    @close="closeDimensionDialog"
  />
</template>

<script setup lang="ts">
import axios from "axios";
import createShiprocketOrder from "~/shiprocket/order/create";

const route = useRoute();
const order = ref<any>(null);
const error = ref<Array<any>>([]);
const loading = ref(true);
const prescriptionImage = ref(null);
const isSubmitting = ref(false);
const isDialogOpen = ref(false);
const dimensions = ref({ length: 0, breadth: 0, height: 0, weight: 0 });

const openDimensionDialog = () => {
  isDialogOpen.value = true;
};

const closeDimensionDialog = () => {
  isDialogOpen.value = false;
};

const handleDimensionSubmit = (data: any) => {
  dimensions.value = data;
  closeDimensionDialog();
  confirmOrder();
};

onMounted(async () => {
  const orderId = route.params.orderId;

  try {
    const response = await fetch(`/api/orders/${orderId}`);
    const data = await response.json();

    if (response.ok) {
      order.value = data.order;
      prescriptionImage.value =
        data.order?.metafields?.find(
          (field: any) => field.key === "prescriptionUrl"
        )?.value || null;
    } else {
      error.value.push(data.error || "Error fetching order details");
    }
  } catch (err) {
    error.value.push("Error fetching the order.");
  } finally {
    loading.value = false;
  }
});

const confirmOrder = async () => {
  isSubmitting.value = true;
  try {
    const orderId = route.params.orderId;
    await createShiprocketOrder(order.value, dimensions.value);

    const { data } = await axios.post(`/api/orders/${orderId}/fulfill`, {
      headers: { "Content-Type": "application/json" },
    });
    if (data?.error) {
      alert(data.error);
    } else {
      alert("Fulfilled the product");
      order.value.fulfillment_status = data.status;
    }
  } catch (error: any) {
    alert(error.message);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}

.order-details {
  margin-top: 20px;
}

.order-details h2,
.order-details p {
  margin-bottom: 10px;
}

.delete-button {
  background-color: #1fcd45;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}
</style>
