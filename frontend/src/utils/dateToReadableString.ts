export const dateToReadableString = (dateInput: string | Date) => {
  const date = new Date(dateInput);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "y", seconds: 60 * 60 * 24 * 365 },
    { label: "mo", seconds: 60 * 60 * 24 * 30 },
    { label: "w", seconds: 60 * 60 * 24 * 7 },
    { label: "d", seconds: 60 * 60 * 24 },
    { label: "h", seconds: 60 * 60 },
    { label: "m", seconds: 60 },
    { label: "s", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);

    if (count >= 1) {
      return `${count}${interval.label} ago`;
    }
  }

  return "just now";
};
