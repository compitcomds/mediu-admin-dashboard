import { getUser, logout } from "~/appwrite/login-admin";
import getUserPermissions from "~/appwrite/customer/permissions";
import { usePermissionsStore } from "~/stores/permission-store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) {
    useState("isAuthLoading", () => true);
    return;
  }

  const isAuthLoading = useState("isAuthLoading", () => true);
  const user = await getUser();
  const authenticated = !!user;

  isAuthLoading.value = false;

  const publicRoutes = [/^\/accept-invitation/, /^\/unauthorized/];
  const publicAuthenticatedRoutes = [/^\/$/];
  const authRoutes = [/^\/auth\/login/];

  const isAuthRoute = authRoutes.some((route) => route.test(to.path));

  if (publicRoutes.some((route) => route.test(to.path))) {
    return;
  }

  // check if user is authenticated and if the route is not an auth route
  if (!authenticated && !isAuthRoute) {
    return navigateTo(`/auth/login?back=${encodeURIComponent(to.path)}`);
  } else if (!authenticated && isAuthRoute) {
    return;
  }

  isAuthLoading.value = true;

  const permissionsStore = usePermissionsStore();

  const { edit, read } = await permissionsStore.fetchPermissions();

  isAuthLoading.value = false;

  if (publicAuthenticatedRoutes.some((route) => route.test(to.path))) {
    return;
  }

  const isAdmin = user?.labels.includes("admin");

  if (isAdmin) {
    const backRoute = to.query.back as any;
    if (backRoute) return navigateTo(backRoute);
    return;
  }

  if (read.length === 0 && edit.length === 0) {
    await logout();
    return navigateTo(`/auth/login?back=${encodeURIComponent(to.path)}`);
  }

  if (edit.some((route) => route.pattern.test(to.path))) {
    return;
  }

  const readPermission =
    read.find(
      (route) =>
        route.pattern.test(to.path) ||
        route.pattern.test(to.path.replace("/view", "")),
    ) || null;

  if (readPermission) {
    if (!readPermission.route.includes(":id") || to.path.includes("/view"))
      return;
    return navigateTo(`${to.path}/view`);
  }

  return navigateTo("/unauthorized");
});
