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
]);
