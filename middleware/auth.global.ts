import type { Models } from "appwrite";
import type { RouteLocationNormalizedGeneric } from "vue-router";
import { logout } from "~/appwrite/login-admin";
import { usePermissionsStore } from "~/stores/permission-store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const permissionsStore = usePermissionsStore();

  if (to.path === from.path && to.name === from.name) {
    return;
  }

  if (import.meta.server && !permissionsStore.user) {
    useState("isAuthLoading", () => true);
    return;
  }

  const isAuthLoading = useState("isAuthLoading", () => true);
  const user = await permissionsStore.fetchUser();
  isAuthLoading.value = false;

  return await navigateUser(user, to);
});

async function navigateUser(
  user: Models.User<Models.Preferences> | null,
  to: RouteLocationNormalizedGeneric,
) {
  const permissionsStore = usePermissionsStore();
  const authenticated = !!user;
  const publicRoutes = [/^\/accept-invitation/, /^\/unauthorized/];
  const publicAuthenticatedRoutes = [/^\/$/, /^\/profile/];
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

  if (publicAuthenticatedRoutes.some((route) => route.test(to.path))) {
    return;
  }

  const isAdmin = user?.labels.includes("admin");

  if (isAdmin) {
    const backRoute = to.query.back as any;
    if (backRoute) return navigateTo(backRoute);
    return;
  }

  const { edit, read } = await permissionsStore.fetchPermissions();

  if (read.length === 0 && edit.length === 0) {
    await logout();
    return navigateTo(`/auth/login?back=${encodeURIComponent(to.path)}`);
  }

  if (edit.some((route) => route.pattern.test(to.path))) {
    return;
  }

  const readPermission = read.find((route) => checkReadRoute(route, to.path));

  if (readPermission && !readPermission.route.includes(":id")) {
    return;
  }

  if (readPermission && to.path.includes("/view")) return;

  if (readPermission) {
    return navigateTo(`${to.path}/view`, { replace: true });
  }

  return navigateTo("/unauthorized", { replace: true });
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
