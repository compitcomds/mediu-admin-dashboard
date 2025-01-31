import { getUser } from "~/appwrite/login-admin";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) {
    useState("isAuthLoading", () => true);
    return;
  }
  const isAuthLoading = useState("isAuthLoading", () => true);
  const user = await getUser();
  const authenticated = !!user;

  const authRoutes = [/^\/auth\/login/];

  isAuthLoading.value = false;

  const isUnprotectedRoute = authRoutes.some((route) => route.test(to.path));

  if (authenticated && isUnprotectedRoute) {
    const backRoute = (to.query.back as string) || "/";
    return navigateTo(backRoute);
  }

  if (!authenticated && !isUnprotectedRoute) {
    return navigateTo(`/auth/login?back=${encodeURIComponent(to.path)}`);
  }
});
