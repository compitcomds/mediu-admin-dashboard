type Product = {
  id: string;
  handle: string;
  title: string;
  description_html: string;
  tags: string[];
  status: string;
  variants: {
    nodes: {
      sku: string;
      price: string;
      compareAtPrice: string;
      selectedOptions: { name: string; value: string }[];
    }[];
  };
  gst_applied?: { value: string } | null;
  how_to_use?: { value: string } | null;
  key_benefits?: { value: string } | null;
  product_subtitle?: { value: string } | null;
  requires_prescription?: { value: string } | null;
  safety_information_and_precaution?: { value: string } | null;
  collections: { nodes: { title: string }[] };
};

export default function exportProductsParser(products: Product[]) {
  const rows: string[][] = [];
  const headers = [
    "ID",
    "Handle",
    "Title",
    "Description Html",
    "Tags",
    "Status",
    "GST Applied",
    "How To Use",
    "Key Benefits",
    "Product Subtitle",
    "Requires Prescription",
    "Safety Information And Precaution",
    "Collections",
    "Variant SKU",
    "Variant Price",
    "Variant Compare At Price",
  ];

  products.forEach((product) => {
    product.variants.nodes.forEach((variant, index) => {
      const row: Record<string, string> =
        index > 0
          ? { ID: `'${product.id}` }
          : {
              ID: `'${product.id}`,
              Handle: product.handle,
              Title: product.title,
              "Product Subtitle": product.product_subtitle?.value || "",
              "Description Html": product.description_html,
              Tags: product.tags.join(", "),
              Status: product.status,
              "GST Applied": product.gst_applied?.value || "",
              "How To Use": product.how_to_use?.value || "",
              "Key Benefits": product.key_benefits?.value || "",
              "Requires Prescription":
                product.requires_prescription?.value || "",
              "Safety Information And Precaution":
                product.safety_information_and_precaution?.value || "",
              Collections: product.collections.nodes
                .map((c) => c.title)
                .join(", "),
            };

      row["Variant SKU"] = variant.sku;
      row["Variant Price"] = variant.price;
      row["Variant Compare At Price"] = variant.compareAtPrice || "";

      for (const option of variant.selectedOptions) {
        if (option.name.toLowerCase() === "title") continue;
        if (!headers.includes(option.name)) headers.push(option.name);
        row[option.name] = option.value;
      }

      rows.push(headers.map((header) => row[header] || ""));
    });
  });

  return [[...headers], ...rows];
}
