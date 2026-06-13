export const displayFallback = (value: unknown, fallbackText = "Not available") => {
  if (value === null || value === undefined || value === "") return fallbackText;
  if (Array.isArray(value) && value.length === 0) return fallbackText;
  return String(value);
};
