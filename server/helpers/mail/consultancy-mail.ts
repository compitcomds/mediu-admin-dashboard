import sendMail from "./sendMail";

export default async function sendConsultancyConfirmationMail(
  to: string,
  consultancyTitle: string,
  allottedTime: Date,
) {
  const html = generateConsultancyEmail(consultancyTitle, allottedTime);
  await sendMail({
    subject: `Consultancy Appointment Confirmation`,
    to,
    html,
  });
}

function generateConsultancyEmail(
  consultancyTitle: string,
  allottedTime: Date | string,
) {
  const formattedDate = new Date(allottedTime).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Consultancy Appointment Confirmation</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          font-family: Arial, sans-serif;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
        }
        .email-header {
          background-color: #238878;
          color: #ffffff;
          padding: 24px;
          text-align: center;
        }
        .email-header h1 {
          margin: 0;
          font-size: 22px;
        }
        .email-body {
          padding: 24px;
          color: #333333;
        }
        .email-body p {
          font-size: 16px;
          margin-bottom: 16px;
        }
        .email-details {
          margin: 24px 0;
          padding: 16px;
          background-color: #f0fdfa;
          border: 1px solid #d1fae5;
          border-radius: 6px;
        }
        .email-details p {
          margin: 6px 0;
          font-size: 16px;
          color: #065f46;
        }
        .email-footer {
          background-color: #f4f4f4;
          text-align: center;
          padding: 16px;
          font-size: 14px;
          color: #888888;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>Consultancy Appointment Confirmation</h1>
        </div>
        <div class="email-body">
          <p>Dear User,</p>
          <p>We are pleased to inform you that your consultancy appointment has been successfully booked.</p>
          <div class="email-details">
            <p><strong>Consultancy Title:</strong> ${consultancyTitle}</p>
            <p><strong>Scheduled Time:</strong> ${formattedDate}</p>
          </div>
          <p>Please make sure to be available at the allotted time. If you have any questions or need to reschedule, feel free to contact us.</p>
          <p>Thank you for choosing Mediu 🏥</p>
        </div>
        <div class="email-footer">
          © ${new Date().getFullYear()} Mediu. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `;
}
