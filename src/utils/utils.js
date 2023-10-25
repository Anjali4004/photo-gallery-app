export const convertToDateFormat = (digit) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(digit);
  if (date instanceof Date && !isNaN(date)) {
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");
    return `${month} ${day},${year}`;
  } else {
    return "Invalid date";
  }
};
