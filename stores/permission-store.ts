import { defineStore } from "pinia";
import getUserPermissions, {
  type PermissionType,
} from "~/appwrite/customer/permissions";

export const usePermissionsStore = defineStore("permissions", {
  state: () => ({
    permissions: null as PermissionType | null,
  }),

  actions: {
    async fetchPermissions() {
      if (this.permissions) return this.permissions;
      this.permissions = await getUserPermissions();
      return this.permissions;
    },
  },
});
