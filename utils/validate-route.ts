import { usePermissionsStore } from "~/stores/permission-store";

export async function validateRouteForAuthenticatedUsers(to: string) {
  const permissionStore = usePermissionsStore();
  const user = await permissionStore.fetchUser();
  if (!user) return false;

  if (user?.labels.includes("admin")) return true;

  const publicAuthenticatedRoutes = [/^\/$/, /^\/profile/];
  const authRoutes = [/^\/auth\/login/];

  if (authRoutes.some((route) => route.test(to))) {
    return false;
  }

  if (publicAuthenticatedRoutes.some((route) => route.test(to))) {
    return true;
  }

  const { edit, read } = await permissionStore.fetchPermissions();

  if (edit.some((route) => route.pattern.test(to))) return true;

  const readPermission = read.find((route) => checkReadRoute(route, to));

  if (readPermission && !readPermission.route.includes(":id")) return true;
  if (readPermission && to.includes("/view")) return true;

  return false;
}

function checkReadRoute(
  route: { pattern: RegExp; route: string },
  path: string,
) {
  return (
    route.pattern.test(path) ||
    (route.route.includes(":id") &&
      route.pattern.test(path.replace("/view", "")))
  );
}
