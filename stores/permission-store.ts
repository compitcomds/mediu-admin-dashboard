import type { Models } from "appwrite";
import { defineStore } from "pinia";
import getUserPermissions, {
  type PermissionType,
} from "~/appwrite/customer/permissions";
import { getUser } from "~/appwrite/login-admin";

export const usePermissionsStore = defineStore("permissions", {
  state: () => ({
    permissions: null as PermissionType | null,
    user: null as Models.User<Models.Preferences> | null,
  }),

  actions: {
    async fetchUser() {
      if (this.user) return this.user;
      this.user = await getUser();
      return this.user;
    },
    async fetchPermissions() {
      if (this.permissions) return this.permissions;
      this.permissions = await getUserPermissions();
      return this.permissions;
    },
  },
});
