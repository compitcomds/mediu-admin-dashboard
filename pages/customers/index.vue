<template>
  <div
    class="mb-4 flex flex-col items-center justify-between space-y-4 lg:flex-row"
  >
    <h1 class="text-2xl font-semibold text-[#28574e]">Customers</h1>
  </div>
  <div class="mb-4 flex items-center justify-between gap-4">
    <p class="text-sm text-gray-500">
      Total Customers: <span class="text-black">{{ totalCustomers }}</span>
    </p>
    <Search id="customer-search" placeholder="Searching all customers" />
  </div>

  <CustomersViewTable :customers="customers" />
  <PaginationButtons :pageInfo="pageInfo" />
</template>

<script lang="ts" setup>
import axios from "axios";

const route = useRoute();
const totalCustomers = ref(0);
const customers = ref<any[]>([]);
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
  query,
}: {
  after?: string;
  before?: string;
  query?: string;
}) => {
  const { data } = await axios.get(
    `/api/customers?after=${after || ""}&before=${before || ""}&query=${
      query || ""
    }`,
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
      query: newQuery.query?.toString(),
    });
  },
  {
    deep: true,
    immediate: true,
  },
);

useHead({
  title: "All Customers",
});
</script>
