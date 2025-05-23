type PermissionType = {
  section: string;
  children: Array<{ title: string; read?: string; edit?: string }>;
};

export const availablePermissions = ref<PermissionType[]>([
  {
    section: "Order Management",
    children: [
      {
        title: "All orders",
        read: "/orders",
      },
      {
        title: "Order",
        read: "/orders/:id",
        edit: "/orders/:id",
      },
    ],
  },
  {
    section: "Product Management",
    children: [
      {
        title: "All products",
        read: "/product",
      },
      {
        title: "Add Product",
        edit: "/product/add",
      },
      {
        title: "Product Page",
        read: "/product/p/:id",
        edit: "/product/p/:id",
      },
    ],
  },
  {
    section: "Collection Management",
    children: [
      {
        title: "All Collections",
        read: "/collections",
      },
      {
        title: "Add Collection",
        edit: "/collections/create",
      },
      {
        title: "Collection",
        read: "/collections/c/:id",
        edit: "/collections/c/:id",
      },
    ],
  },

  {
    section: "Inventory Management",
    children: [
      {
        title: "All Inventory",
        read: "/inventory",
      },
      {
        title: "Inventory - Batches",
        read: "/inventory/:id",
        edit: "/inventory/:id",
      },
    ],
  },
  {
    section: "Consultancy Management",
    children: [
      {
        title: "All Consutlancy Services",
        read: "/consultancy/services",
      },
      {
        title: "Add Consultancy Service",
        edit: "/consultancy/services/create",
      },
      {
        title: "Consultancy Service",
        read: "/consultancy/services/s/:id",
        edit: "/consultancy/services/s/:id",
      },
      {
        title: "All Consultancy Bookings",
        edit: "/consultancy/bookings",
      },
      // {
      //   title: "Consultancy Booking",
      //   read: "/consultancy/bookings/:id",
      //   edit: "/consultancy/bookings/:id",
      // },
    ],
  },
  {
    section: "Customer Management",
    children: [
      {
        title: "All Customers",
        read: "/customers",
      },
      {
        title: "Customer",
        read: "/customers/:id",
        edit: "/customers/:id",
      },
      {
        title: "Alert Customers",
        read: "/alert",
      },
    ],
  },
  {
    section: "Blog Management",
    children: [
      {
        title: "All Blogs",
        read: "/blogs",
      },
      {
        title: "All categories",
        edit: "/blogs/category",
      },
      {
        title: "Create Blog",
        edit: "/blogs/add",
      },
      { title: "Edit Blog", edit: "/blogs/:id", read: "/blogs/:id" },
    ],
  },
  {
    section: "Homepage Management",
    children: [
      {
        title: "Home Products",
        edit: "/edit-home",
      },
    ],
  },
]);
