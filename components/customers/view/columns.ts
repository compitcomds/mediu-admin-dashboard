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
        () => ["Customer Name", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      const name: string = row.getValue("displayName");
      return h("p", {}, name);
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
        () => ["Customer Email", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
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
          : ""
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
        () => ["Customer Orders", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
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
        () => ["Amount Spent", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
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
];
