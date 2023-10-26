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
    return `${month} ${day},${year} ${convertToTimeFormat(digit)}`;
  } else {
    return "Invalid date";
  }
};

export const convertToTimeFormat = (digit) => {
  const currentDate = new Date(digit);

  // Format the time in AM or PM
  let hours = currentDate.getHours();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const timezoneMappings = {
    "-330": "IST", // Indian Standard Time
    60: "CET", // Central European Time
    120: "EET", // Eastern European Time
    60: "BST", // British Summer Time
    0: "GMT", // Greenwich Mean Time
    "-240": "AST", // Atlantic Standard Time
    // Add more timezone mappings as needed
  };

  // Fetch the timezone offset in minutes
  const timezoneOffsetMinutes = currentDate.getTimezoneOffset();
  const timezone = timezoneMappings[timezoneOffsetMinutes.toString()] || "";
  return `${hours}:${minutes} ${amOrPm} ${timezone}`;
};
