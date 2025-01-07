import getOrderById from "./get";

export default defineEventHandler(async (event) => {
  const params = event.context.params as Record<string, string>;
  const id = params.id;
  return await getOrderById(id);
});
