<template>
  <div
    class="flex flex-col lg:flex-row justify-between items-center space-y-4 mb-4"
  >
    <h1 class="text-2xl text-[#28574e] font-semibold">Customers</h1>
    <div
      class="flex items-center sm:mb-0 bg-slate-200 lg:w-1/3 p-3 shadow-md rounded-md text-[#28574e]"
    >
      <span class="mr-2"
        ><span class="font-bold">{{ customers.length }}</span> customers</span
      >
      <span>{{ customerPercentage }}% of your customer base</span>
    </div>
  </div>

  <CustomersViewTable :customers="customers" />
  <PaginationButtons :pageInfo="pageInfo" />
</template>

<script lang="ts" setup>
import axios from "axios";

const route = useRoute();
const totalCustomers = ref(0);
const customers = ref<any[]>([]);
const customerPercentage = computed(() => {
  if (totalCustomers < customers || totalCustomers.value === 0) return 0;
  const percentage = (customers.value.length * 100) / totalCustomers.value;
  return percentage.toFixed(2);
});
const pageInfo = ref<{
  endCursor: string;
  hasNextPage: boolean;
  startCursor: string;
  hasPreviousPage: boolean;
}>({
  endCursor: "",
  startCursor: "",
  hasNextPage: false,
  hasPreviousPage: false,
});

const fetchCustomers = async ({
  after,
  before,
}: {
  after: string;
  before: string;
}) => {
  const { data } = await axios.get(
    `/api/customers?after=${after || ""}&before=${before || ""}`
  );
  customers.value = data.customers;
  pageInfo.value = data.pageInfo;
};

const fetchTotalCustomers = async () => {
  const { data } = await axios.get("/api/customers/count");
  totalCustomers.value = data.customers.total;
};

onMounted(() => {
  fetchTotalCustomers();
});

watch(
  () => route.query,
  (newQuery) => {
    fetchCustomers({
      after: newQuery.after?.toString(),
      before: newQuery.before?.toString(),
    });
  },
  {
    deep: true,
    immediate: true,
  }
);

useHead({
  title: "All Customers",
});
</script>
