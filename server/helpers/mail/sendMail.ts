import { createTransport, TransportOptions } from "nodemailer";

export default async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  } as TransportOptions);

  const info = await transporter.sendMail({
    from: "Mediu 🏥",
    to,
    subject,
    html,
  });
  return info;
}
