export default function exportCustomersParser(customers: any[]) {
  const rows: string[][] = [];
  const headers = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Number Of Orders",
    "Amount Spent",
    "Created At",
    "Address 1",
    "Address 2",
    "City",
    "Province",
    "Country",
    "Zip",
  ];

  for (const customer of customers) {
    const defaultAddress = customer.defaultAddress;
    const row: Record<string, string> = {
      ID: `'${customer.id}`,
      "First Name": customer.firstName,
      "Last Name": customer.lastName,
      Email: customer.email,
      Phone: !!defaultAddress?.phone ? `'${defaultAddress.phone}` : "",
      "Number Of Orders": customer.numberOfOrders,
      "Amount Spent": customer.amountSpent?.amount || 0,
      "Created At": customer.createdAt,
      "Address 1": defaultAddress?.address1,
      "Address 2": defaultAddress?.address2,
      City: defaultAddress?.city,
      Province: defaultAddress?.province,
      Country: defaultAddress?.country,
      Zip: defaultAddress?.zip,
    };
    rows.push(headers.map((header) => row[header] || ""));
  }

  return [[...headers], ...rows];
}
