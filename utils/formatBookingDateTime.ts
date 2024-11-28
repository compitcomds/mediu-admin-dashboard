export default function formatBookingDateTime(date?: Date | string | null) {
  if (!date) return "";
  const parsedDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(parsedDate);
}
