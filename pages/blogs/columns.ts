import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import DataTableLink from "~/components/ui/data-table-link.vue";
import { ArrowUpDown } from "lucide-vue-next";
import Button from "~/components/ui/button/Button.vue";
import formatDateSimple from "~/utils/format-simple-date";

export interface ArticleInterface {
  title: string;
  id: string;
  isPublished: string;
  createdAt: string;
}

export const columns: ColumnDef<ArticleInterface>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return h(
        Button,
        {
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class:
            "bg-transparent text-black shadow-none text-inherit px-4 hover:bg-white/40",
        },
        () => ["Title", h(ArrowUpDown, { class: "ml-2 h-4 w-4 " })],
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("title");
      const article = row.original;
      return h(
        DataTableLink,
        { to: `/blogs/${article.id}`, class: "hover:underline px-4" },
        () => title,
      );
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
            "bg-transparent text-black shadow-none px-4 text-inherit hover:bg-white/40",
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
      return h("p", { class: "px-4" }, formatDateSimple(createdAt));
    },
  },
  {
    accessorKey: "isPublished",
    header: () => h("div", { class: "min-w-[100px]" }, "Published"),
    cell: ({ row }) => {
      const status: boolean = row.getValue("isPublished");
      return h(
        "p",
        {
          class: status
            ? "text-green-700 bg-green-50 max-w-fit px-4 rounded-r-full rounded-l-full py-1"
            : "text-amber-500 bg-amber-50 max-w-fit px-4 rounded-r-full rounded-l-full py-1",
        },
        status ? "published" : "draft",
      );
    },
  },
  {
    accessorKey: "id",
    header: () => h("div", { class: "min-w-[100px]" }, "."),
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      return h(
        DataTableLink,
        {
          to: `/blogs/${id}`,
          class:
            "px-6 py-1 rounded-md text-white bg-black text-center hover:bg-black/80",
        },
        () => "View",
      );
    },
  },
];
