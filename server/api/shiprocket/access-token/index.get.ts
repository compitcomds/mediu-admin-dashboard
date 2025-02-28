import getAccessTokenFromShiprocket from "../_helpers/access-token";

export default defineEventHandler(async (event) => {
  return await getAccessTokenFromShiprocket();
});
