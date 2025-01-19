<template>
  <div class="hidden">
    <div
      id="invoice"
      class="invoice-container max-w-[90%] bg-white p-5 text-black"
    >
      <h1 class="mb-1 text-2xl font-bold">{{ payload.company.name }}</h1>
      <div class="flex justify-between border-b pb-4">
        <div>
          <p class="text-sm font-bold">{{ payload.company.subTitle }}</p>
          <p>{{ payload.company.address1 }}</p>
          <p>{{ payload.company.address2 }}</p>
          <p>{{ payload.company.phone }}</p>
          <p>
            Mail:
            <a :href="`mailto:${payload.company.email}`">{{
              payload.company.email
            }}</a>
          </p>
          <a :href="payload.company.website"
            >Web: {{ payload.company.website }}</a
          >
        </div>
        <div class="text-right">
          <h2 class="text-xl font-semibold">Invoice</h2>
          <p>Number: {{ payload.invoice.number }}</p>
          <p>Date: {{ payload.invoice.date }}</p>
          <p>Due Date: {{ payload.invoice.dueDate }}</p>
          <p>Status: {{ payload.invoice.status }}</p>
        </div>
      </div>

      <!-- Customer Details Section -->
      <div class="my-4">
        <h3 class="text-lg font-semibold">Bill To:</h3>
        <p>{{ payload.customer.name }}</p>
        <p>{{ payload.customer.address1 }}</p>
        <p>{{ payload.customer.address2 }}</p>
        <p>{{ payload.customer.phone }}</p>
        <p>{{ payload.customer.email }}</p>
      </div>

      <!-- Items Section -->
      <table class="min-w-full rounded-lg border border-gray-300 bg-white">
        <thead>
          <tr class="bg-gray-100">
            <th class="border-b px-4 py-2">Item</th>
            <th class="border-b px-4 py-2">Quantity</th>
            <th class="border-b px-4 py-2">Price</th>
            <th class="border-b px-4 py-2">SGST</th>
            <th class="border-b px-4 py-2">CGST</th>
            <th class="border-b px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in payload.items"
            :key="index"
            class="hover:bg-gray-50"
          >
            <td class="border-b px-4 py-2">
              {{ item.name }} <br />
              <span class="text-xs">SKU: {{ item.sku }}</span>
            </td>
            <td class="border-b px-4 py-2 text-center">{{ item.quantity }}</td>
            <td class="border-b px-4 py-2 text-right">
              {{ formatCurrency(calculateGST(item.total, item.tax).basePrice) }}
            </td>
            <td class="border-b px-4 py-2 text-right">
              {{ formatCurrency(item.tax / 2) }}%
            </td>
            <td class="border-b px-4 py-2 text-right">
              {{ formatCurrency(item.tax / 2) }}%
            </td>
            <td class="border-b px-4 py-2 text-right">
              {{ formatCurrency(item.price) }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Footer Section -->
      <div class="mt-4 flex justify-between">
        <div>
          <p class="italic text-gray-600">{{ payload.note.text }}</p>
          <p>This is computer generated bill.</p>
        </div>
        <div class="text-right">
          <p class="font-semibold">
            Total: {{ formatCurrency(payload.invoice.total) }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <button
    @click="downloadInvoice"
    class="rounded-md border border-black px-6 py-2 text-sm hover:bg-black hover:text-white"
  >
    <span v-if="downloading" class="flex items-center justify-center gap-3"
      >Downloading... <Loader
    /></span>
    <span v-else>Download Invoice</span>
  </button>
</template>

<script setup>
const { orderData } = defineProps({
  orderData: Object,
});

const payload = {
  company: {
    name: "Mediu",
    subTitle: "Radiance Aesthetic and Cosmetic Studio",
    address1: "F-97, M.S.S Colony, Shastri",
    address2: "Jaipur-302016",
    phone: "Phone: +91 7820830842",
    email: "radiancecosmeticstudio@gmail.com",
    website: "https://www.mediu.in",
    taxId: "",
  },
  customer: {
    name: `${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}`,
    address1: `${orderData.shippingAddress.address1}`,
    address2: `${orderData.shippingAddress.city}, ${orderData.shippingAddress.province}, ${orderData.shippingAddress.country}`,
    phone: `Phone: ${orderData.shippingAddress.phone || ""}`,
    email: `Mail: ${orderData.shippingAddress.email || orderData.customer.email || ""}`,
  },
  invoice: {
    number: orderData.id,
    date: orderData.processedAt.split("T")[0],
    dueDate: orderData.processedAt.split("T")[0],
    status: "PAID",
    currency: orderData.originalTotalPriceSet.currencyCode,
    total: orderData.originalTotalPriceSet.amount,
  },
  items: orderData.lineItems.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    sku: item.sku || "",
    price: item.unitPrice.amount,
    total: item.originalTotal.amount,
    tax: parseFloat(item.gstApplied || "0"),
  })),
  note: {
    text: "Thank you for ordering from us.",
  },
};

const downloading = ref(false);

useHead({
  script: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js",
    },
  ],
});

const downloadInvoice = async () => {
  downloading.value = true;
  const element = document.getElementById("invoice");
  try {
    const options = {
      margin: 0.5,
      filename: `invoice-${payload.invoice.number}.pdf`, // Custom filename
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  } catch (error) {
  } finally {
    downloading.value = false;
  }
};

const formatCurrency = (amount) => {
  return `${payload.invoice.currency} ${amount}`;
};

function calculateGST(priceWithGST, gstRate) {
  const basePrice = priceWithGST / (1 + gstRate / 100);
  const gstAmount = priceWithGST - basePrice;
  return {
    basePrice: parseFloat(basePrice.toFixed(2)),
    gstAmount: parseFloat(gstAmount.toFixed(2)),
  };
}
</script>
