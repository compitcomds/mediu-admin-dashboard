import sendConsultancyConfirmationMail from "~/server/helpers/mail/consultancy-mail";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const email = body.email;
  const alottedTime = body.alottedTime;
  const consultancyTitle = body.title || "";
  if (!email) return "No email provided";
  if (!alottedTime) return "No alotted time";

  await sendConsultancyConfirmationMail(email, consultancyTitle, alottedTime);
  return "Success";
});
