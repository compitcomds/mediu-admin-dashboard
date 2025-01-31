import axios from "axios";

const SHIPROCKET_API_URL = process.env.VITE_SHIPROCKET_API_URL;
const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL_ADDRESS;
const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD;

export default defineEventHandler(async (event) => {
  try {
    console.log(SHIPROCKET_API_URL);
    console.log(SHIPROCKET_PASSWORD);
    throw new Error("Let's see this time what is the passor.");
    const url = `${SHIPROCKET_API_URL}/auth/login`;
    const { data } = await axios.post(
      url,
      { email: SHIPROCKET_EMAIL, password: SHIPROCKET_PASSWORD },
      { headers: { "Content-Type": "application/json" } },
    );
    return { token: data?.token };
  } catch (error) {
    console.error("ERROR IN CREATE ACCESS TOKEN.");
    console.error(error);
    throw error;
  }
});
