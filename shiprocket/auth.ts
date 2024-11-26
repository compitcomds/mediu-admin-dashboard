import axios from "axios";

export async function getNewAcessToken() {
  const { data } = await axios.get("/api/shiprocket/access-token");
  localStorage.setItem("shiprocketAccessToken", data.token);
  return data.token as string;
}

export function getAccessToken() {
  return localStorage.getItem("shiprocketAccessToken");
}

export function setShiprocketAccessToken(token: string) {
  return localStorage.setItem("shiprocketAccessToken", token);
}
