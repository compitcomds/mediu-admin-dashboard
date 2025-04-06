import sendMail from "./sendMail";

export default async function sendOrderConfirmationMail(
  to: string,
  orderName: string,
) {
  const html = generateEmail(orderName);
  await sendMail({
    subject: `Order Confirmed ${orderName}`,
    to,
    html,
  });
}

function generateEmail(orderName: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Order Confirmation ${orderName}</title>
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
            font-size: 24px;
          }
          .email-body {
            padding: 24px;
            color: #333333;
          }
          .email-body p {
            font-size: 16px;
            margin-bottom: 16px;
          }
          .email-order-details {
            margin: 24px 0;
            padding: 16px;
            background-color: #f0fdfa;
            border: 1px solid #d1fae5;
            border-radius: 6px;
          }
          .email-order-details p {
            margin: 0;
            color: #065f46;
            font-size: 16px;
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
            <h1>Order Confirmation</h1>
          </div>
          <div class="email-body">
            <p>Hi there,</p>
            <p>
              Thank you for your order <strong>${orderName}</strong>! We're excited to let you know that your order has been confirmed and is now being processed for delivery.
            </p>
            <p>
              You can check the status of your order through the dashboard.
            </p>
            <p>Thanks again,</p>
            <p>The Mediu Team 🏥</p>
          </div>
          <div class="email-footer">
            © ${new Date().getFullYear()} Mediu. All rights reserved.
          </div>
        </div>
      </body>
    </html>
    `;
}
