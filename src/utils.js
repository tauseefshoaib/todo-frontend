export function convertToIST(isoString) {
  // Convert string to Date object
  const utcTime = new Date(isoString);

  // Get the UTC time in milliseconds
  const utcMilliseconds = utcTime.getTime();

  // Define the time difference between UTC and IST (+5:30 hours)
  const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds

  // Convert to IST
  const istMilliseconds = utcMilliseconds + istOffset;
  const istTime = new Date(istMilliseconds);

  // Format date
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    hourCycle: "h23",
    timeZone: "Asia/Kolkata", // Optional: Set the timezone explicitly
  };

  const istDate = istTime.toLocaleString("en-IN", options);

  return istDate;
}
