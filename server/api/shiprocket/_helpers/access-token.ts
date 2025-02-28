import axios from "axios";

const SHIPROCKET_API_URL = process.env.VITE_SHIPROCKET_API_URL;
const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL_ADDRESS;
const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD;

export default async function getAccessTokenFromShiprocket() {
  const url = `${SHIPROCKET_API_URL}/auth/login`;
  const { data } = await axios.post(
    url,
    { email: SHIPROCKET_EMAIL, password: SHIPROCKET_PASSWORD },
    { headers: { "Content-Type": "application/json" } },
  );
  return { token: data?.token as string };
}
