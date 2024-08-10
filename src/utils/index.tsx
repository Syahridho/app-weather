export const getDayName = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const options: any = { weekday: "long" };
  return date.toLocaleDateString("id-ID", options);
};
