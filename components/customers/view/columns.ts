import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import DataTableLink from "~/components/ui/data-table-link.vue";
import { ArrowUpDown } from "lucide-vue-next";
import Button from "~/components/ui/button/Button.vue";

export interface CustomerInterface {
  id: string;
  displayName: string;
  email: string;
  numberOfOrders: number;
  amountSpent: { amount: string; currencyCode: string };
  defaultAddress: null | { province: string; country: string; city: string };
  createdAt: string;
}

export const columns: ColumnDef<CustomerInterface>[] = [
  {
    accessorKey: "displayName",
    header: ({ column }) => {
      return h(
        Button,
        {
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class:
            "bg-transparent text-black shadow-none text-inherit hover:bg-white/40",
        },
        () => ["Customer Name", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => {
      const name: string = row.getValue("displayName");
      const id: string = row.getValue("id");
      return h(
        DataTableLink,
        {
          to: `/customers/${id}`,
          class: "hover:text-green-700",
        },
        () => name,
      );
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return h(
        Button,
        {
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class:
            "bg-transparent text-black shadow-none text-inherit hover:bg-white/40",
        },
        () => ["Customer Email", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => {
      const email: string = row.getValue("email");
      return h("p", {}, email);
    },
  },
  {
    accessorKey: "defaultAddress",
    header: () => h("div", { class: "min-w-[100px]" }, "Customer Location"),
    cell: ({ row }) => {
      const location: null | {
        province: string;
        country: string;
        city: string;
      } = row.getValue("defaultAddress");
      return h(
        "p",
        !!location
          ? `${location.city} ${location.province}, ${location.country}`
          : "",
      );
    },
  },
  {
    accessorKey: "numberOfOrders",
    header: ({ column }) => {
      return h(
        Button,
        {
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class:
            "bg-transparent text-black shadow-none text-inherit hover:bg-white/40",
        },
        () => ["Customer Orders", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => {
      const numberOfOrders: number = row.getValue("numberOfOrders");
      return h("p", {}, numberOfOrders);
    },
  },
  {
    accessorKey: "amountSpent",
    header: ({ column }) => {
      return h(
        Button,
        {
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class:
            "bg-transparent text-black shadow-none text-inherit hover:bg-white/40",
        },
        () => ["Amount Spent", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    sortingFn: (rowA, rowB) => {
      return (
        parseFloat(rowA.original.amountSpent.amount) -
        parseFloat(rowB.original.amountSpent.amount)
      );
    },
    cell: ({ row }) => {
      const amountSpent: { amount: string; currencyCode: string } =
        row.getValue("amountSpent");
      return h("p", `${amountSpent.currencyCode} ${amountSpent.amount}`);
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return h(
        Button,
        {
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class:
            "bg-transparent text-black shadow-none text-inherit hover:bg-white/40",
        },
        () => ["Created At", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    sortingFn: (rowA, rowB) => {
      return (
        new Date(rowB.original.createdAt).getTime() -
        new Date(rowA.original.createdAt).getTime()
      );
    },
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");
      return h("p", {}, formatDate(createdAt));
    },
  },
  {
    accessorKey: "id",
    header: () => h("div", { class: "min-w-[100px]" }, "Action"),
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      return h(
        DataTableLink,
        {
          to: `/customers/${id}`,
          class:
            "hover:bg-black/80 px-6 py-2 my-1 block max-w-fit text-center bg-black text-white",
        },
        () => "View",
      );
    },
  },
];

const formatDate = (dateString: string): string => {
  try {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString),
    );
  } catch (error) {
    return "";
  }
};
