import { account } from "./config";

export async function getUser() {
  try {
    const user = await account.get();
    if (user.labels.includes("admin")) return user;
    return null;
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
      "Invalid admin user. User is not an admin. Please ask for admin access from the owner."
    );
  }
}

export async function deleteIfActiveSession() {
  try {
    await account.getSession("current");
    await account.deleteSession("current");
  } catch (error) {}
}
