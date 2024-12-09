import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import DataTableLink from "~/components/ui/data-table-link.vue";
import { ArrowUpDown } from "lucide-vue-next";
import Button from "~/components/ui/button/Button.vue";

export interface ProductInterface {
  featuredImage: { url: string; altText?: string } | null;
  title: string;
  id: string;
  status: string;
  totalInventory: number;
  product_type?: string | null;
  vendor: string;
  variants: Array<{ sku: string }>;
}

export const columns: ColumnDef<ProductInterface>[] = [
  {
    accessorKey: "featuredImage",
    header: () => h("div", { class: "max-w-[200px]" }, "Product Image"),
    cell: ({ row }) => {
      const image: any = row.getValue("featuredImage");
      const title: string = row.getValue("title");
      const product = row.original;

      return h(
        DataTableLink,
        { to: `/product/edit/${product.id}` },
        h(
          "img",
          {
            src: image?.url || "https://placehold.co/300x300/png",
            alt: image?.altText || title,
            class: "max-w-[200px]",
            title: image?.altText || title,
          },
          {}
        )
      );
    },
  },

  {
    accessorKey: "title",
    header: ({ column }) => {
      return h(
        Button,
        {
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          class:
            "bg-transparent text-black shadow-none text-inherit hover:bg-white/40",
        },
        () => ["Product Title", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("title");
      const product = row.original;
      return h(
        DataTableLink,
        { to: `/product/edit/${product.id}`, class: "hover:underline" },
        title
      );
    },
  },
  {
    accessorKey: "status",
    header: () => h("div", { class: "min-w-[100px]" }, "Product Status"),
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return h(
        "p",
        {
          class:
            status === "ACTIVE"
              ? "text-green-700 bg-green-50 max-w-fit px-4 rounded-r-full rounded-l-full py-1"
              : "text-amber-500 bg-amber-50 max-w-fit px-4 rounded-r-full rounded-l-full py-1",
        },
        status
      );
    },
  },
  {
    accessorKey: "variants",
    header: () => h("div", {}, "Product SKU"),
    cell: ({ row }) => {
      const variants: any[] = row.getValue("variants");

      return h("p", {}, variants[0].sku);
    },
  },
  {
    accessorKey: "id",
    header: () => h("div", { class: "px-6" }, "."),
    cell: ({ row }) => {
      const id = row.getValue("id");
      return h(
        DataTableLink,
        {
          to: `/product/edit/${id}`,
          class: "bg-black text-white px-4 py-1 rounded-md hover:bg-black/80",
        },
        "View"
      );
    },
  },
];
