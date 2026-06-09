export const getTitleBeforeVersion = (title?: string | null) => {
  if (!title) return "Untitled vulnerability";

  return title.split("<=")[0];
};