import { account } from "./config";

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
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
