import axios from "axios";

export async function getNewAcessToken() {
  const { data } = await axios.get("/api/shiprocket/access-token");
  localStorage.setItem("shiprocketAccessToken", data.token);
  return data.token as string;
}

export function getAccessToken() {
  
  // return localStorage.getItem("shiprocketAccessToken");
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjU1NzQ5MDgsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzQxNTg5OTk5LCJqdGkiOiJJY1ZvZW9zcXhoR25ITTlWIiwiaWF0IjoxNzQwNzI1OTk5LCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTc0MDcyNTk5OSwiY2lkIjo1MDUxNzgxLCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.5Djtzu21jXEjCgZbbs0ki0R6dxOONLZQYGKCr6yuA3M'

}

export function setShiprocketAccessToken(token: string) {
  return localStorage.setItem("shiprocketAccessToken", token);
}
