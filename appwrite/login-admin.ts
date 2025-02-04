import { account, avatars } from "./config";

export async function getUser() {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    return null;
  }
}

export async function loginAdminUser(email: string, password: string) {
  await deleteIfActiveSession();
  await account.createEmailPasswordSession(email, password);
  const user = await getUser();
  if (!user) {
    await account.deleteSession("current");
    throw new Error(
      "Invalid admin user. User is not an admin. Please ask for admin access from the owner.",
    );
  }
}

export async function deleteIfActiveSession() {
  try {
    await account.getSession("current");
    await account.deleteSession("current");
  } catch (error) {}
}

export async function logout() {
  try {
    await account.deleteSession("current");
    localStorage.clear();
    reloadNuxtApp();
    window.location.reload();
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
  }
}

export async function getUserAvatar() {
  const user = await account.get();
  return {
    avatar: avatars.getInitials(user.name).toString(),
    name: user.name,
    email: user.email,
  };
}
