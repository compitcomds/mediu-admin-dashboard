const formatDateSimple = (dateString: string): string => {
  try {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString),
    );
  } catch (error) {
    return "";
  }
};

export default formatDateSimple;
