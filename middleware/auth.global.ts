import { getUser } from "~/appwrite/login-admin";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) {
    useState("isAuthLoading", () => true);
    return;
  }
  const isAuthLoading = useState("isAuthLoading", () => true);
  const user = await getUser();
  const authenticated = !!user;

  const publicRoutes = [/^\/accept-invitation/];
  const authRoutes = [/^\/auth\/login/];

  isAuthLoading.value = false;

  const isAuthRoute = authRoutes.some((route) => route.test(to.path));

  if (publicRoutes.some((route) => route.test(to.path))) {
    return;
  }

  if (!authenticated && !isAuthRoute) {
    return navigateTo(`/auth/login?back=${encodeURIComponent(to.path)}`);
  }

  const authorized = user?.labels.includes("admin");

  if (authenticated && isAuthRoute && authorized) {
    const backRoute = (to.query.back as string) || "/";
    return navigateTo(backRoute);
  }
});
