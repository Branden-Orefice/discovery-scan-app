export const getTitleBeforeVersion = (title: string) => {
  return title.split("<=")[0].trim();
};
