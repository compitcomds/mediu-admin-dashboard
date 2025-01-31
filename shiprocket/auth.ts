import axios from "axios";

export async function getNewAcessToken() {
  const { data } = await axios.get("/api/shiprocket/access-token");
  localStorage.setItem("shiprocketAccessToken", data.token);
  return data.token as string;
}

export function getAccessToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjU1NzQ5MDgsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzM5MTY2Nzg2LCJqdGkiOiJzWVdFODNPV1BHbTJqS21hIiwiaWF0IjoxNzM4MzAyNzg2LCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTczODMwMjc4NiwiY2lkIjo1MDUxNzgxLCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.4qthitWi8dEsrn3JBpv3zh2mixHTtOtspAELzhGO0x0"
  return localStorage.getItem("shiprocketAccessToken");
}

export function setShiprocketAccessToken(token: string) {
  return localStorage.setItem("shiprocketAccessToken", token);
}
