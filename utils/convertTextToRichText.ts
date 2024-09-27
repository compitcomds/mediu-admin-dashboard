export default function convertTextToRichText(html: any) {
  return JSON.stringify({
    type: "root",
    children: [
      { type: "paragraph", children: [{ type: "text", value: html }] },
    ],
  });
}
