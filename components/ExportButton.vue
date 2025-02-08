<script setup lang="ts">
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import exportToCSV from "~/utils/export-to-csv";

const props = defineProps<{
  title?: string;
  class?: string;
  api: string;
  totalApi?: string;
  total?: number;
  parser: (items: any[]) => any[];
}>();

const isLoading = ref<"fetching" | "exporting" | null | boolean>(false);
const progress = ref(0);
const totalItems = ref<number | null>(props.total || null);

const fetchTotal = async () => {
  if (!props.totalApi) return;
  const { data } = await axios.get("/api/products/count");
  if (data.count) totalItems.value = data.count;
};

const fetchItems = async (args: {
  after?: string;
  first?: number;
  query?: string;
}) => {
  const { data } = await axios.get(
    `${props.api}?after=${args.after || ""}&query=${args.query || ""}&first=${args.first || ""}`,
  );
  return data as {
    items: any[];
    pageInfo: { endCursor: string; hasNextPage: boolean };
  };
};

const fetchAllItems = async () => {
  isLoading.value = "fetching";
  const fetchedItems: any[] = [];
  let after: string | undefined;
  let hasNextPage = true;
  while (hasNextPage) {
    const { items, pageInfo } = await fetchItems({ after });
    fetchedItems.push(...items);
    hasNextPage = pageInfo.hasNextPage;
    if (pageInfo.hasNextPage) after = pageInfo.endCursor;
    if (totalItems.value)
      progress.value = (fetchedItems.length * 100) / totalItems.value;
  }
  return fetchedItems;
};

const handleExport = async () => {
  const fetchedItems = await fetchAllItems();
  isLoading.value = "exporting";
  exportToCSV(props.parser(fetchedItems), "mediu-products.csv");
  isLoading.value = false;
};

onMounted(() => {
  fetchTotal();
});
</script>

<template>
  <Dialog>
    <DialogTrigger :class="props.class"> <slot>Export</slot> </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ title || "Export" }}</DialogTitle>
        <DialogDescription class="sr-only">
          Export the data into a CSV file.
        </DialogDescription>
      </DialogHeader>

      <button
        @click="handleExport"
        :disabled="!!isLoading"
        class="relative mx-auto mb-4 mt-4 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-primary text-sm text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed"
      >
        <span>Export</span>
        <span v-if="totalItems && totalItems > 0" class="text-[9px]"
          >{{ totalItems }} items</span
        >
        <div v-if="isLoading === 'fetching'" class="absolute inset-0">
          <svg class="h-full w-full -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke-width="4"
              fill="none"
              class="origin-center stroke-white/30"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke-width="4"
              fill="none"
              class="origin-center stroke-white transition-all duration-200"
              :style="{
                strokeDasharray: `${2 * Math.PI * 36}`,
                strokeDashoffset: `${2 * Math.PI * 36 * (1 - progress / 100)}`,
              }"
            />
          </svg>
        </div>
      </button>
      <p class="animate-pulse text-center" v-if="isLoading === 'fetching'">
        Fetching the items...
      </p>
      <p class="animate-pulse text-center" v-if="isLoading === 'exporting'">
        Exporting the items...
      </p>
    </DialogContent>
  </Dialog>
</template>
