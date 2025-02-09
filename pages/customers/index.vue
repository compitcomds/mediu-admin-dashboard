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
    <div class="flex items-center gap-2">
      <Search id="customer-search" placeholder="Searching all customers" />
      <ExportButton
        v-if="totalCustomers > 0"
        title="Export Customers"
        class="rounded-md bg-gray-200 px-6 py-2 hover:bg-gray-300"
        api="/api/customers/export"
        file-name="mediu-customers.csv"
        :total="totalCustomers"
        :parser="exportCustomersParser"
      >
        Export Customers
      </ExportButton>
    </div>
  </div>

  <CustomersViewTable :customers="customers" />
  <PaginationButtons :pageInfo="pageInfo" />
</template>

<script lang="ts" setup>
import axios from "axios";
import exportCustomersParser from "~/utils/parsers/customers";

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
