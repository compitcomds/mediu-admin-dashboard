import formatDateTime from "../formatDateTime";

export default function exportOrdersParser(orders: any[]) {
  const rows: string[][] = [];
  const headers = [
    "ID",
    "Email",
    "Financial Status",
    "Fulfillment Status",
    "Created At",
    "Processed At",
    "Cancelled At",
    "First Name",
    "Last Name",
    "Billing Address 1",
    "Billing Address 2",
    "Billing Address City",
    "Billing Address Province",
    "Billing Address Country",
    "Billing Address Zip",
    "Billing Address Phone",
    "Discount Codes",
    "Wallet Amount Used",
    "Prescription Url",
    "Original Total",
    "Discounted Total",
    "Line Item Product Id",
    "Line Item SKU",
    "Line Item Title",
    "Line Item Quantity",
    "Line Item Unit Price",
    "Line Item GST Applied",
    "Line Item Original Total",
    "Line Item Discounted Total",
  ];

  for (const order of orders) {
    let index = 0;
    const customer = order.customer;
    const billingAddress = order.billingAddress;
    for (const lineItem of order.lineItems) {
      const row: Record<string, any> =
        index > 0
          ? {}
          : {
              Email: order.email,
              "Financial Status": order.displayFinancialStatus,
              "Fulfillment Status": order.displayFulfillmentStatus,
              "Created At": formatDateTime(order.createdAt),
              "Processed At": formatDateTime(order.processedAt),
              "Cancelled At": formatDateTime(order.cancelledAt),
              "First Name":
                billingAddress?.firstName || customer?.firstName || "",
              "Last Name": billingAddress?.lastName || customer?.lastName || "",
              "Billing Address 1": billingAddress?.address1 || "",
              "Billing Address 2": billingAddress?.address2 || "",
              "Billing Address City": billingAddress?.city || "",
              "Billing Address Province": billingAddress?.province || "",
              "Billing Address Country": billingAddress?.country || "",
              "Billing Address Zip": billingAddress?.zip || "",
              "Billing Address Phone": `'${billingAddress?.phone || customer?.phone || ""}`,
              "Discount Codes": order.discountCodes.join(", "),
              "Wallet Amount Used": order.walletAmountUsed?.value || 0,
              "Prescription Url": order.prescriptionUrl?.value || "",
              "Original Total": order.originalTotalAmount.amount,
              "Discounted Total": order.discountedAmount.amount,
            };
      row["ID"] = `'${order.id}`;
      row["Line Item Product Id"] = `'${lineItem.id}`;
      row["Line Item SKU"] = lineItem.sku;
      row["Line Item Title"] = lineItem.title;
      row["Line Item Quantity"] = lineItem.quantity;
      row["Line Item Unit Price"] = lineItem.unitPrice.amount;
      row["Line Item GST Applied"] = lineItem.gstApplied;
      row["Line Item Original Total"] = lineItem.originalTotal.amount;
      row["Line Item Discounted Total"] = lineItem.discountedTotal.amount;
      rows.push(headers.map((header) => row[header] || ""));

      index++;
    }
  }

  return [[...headers], ...rows];
}
