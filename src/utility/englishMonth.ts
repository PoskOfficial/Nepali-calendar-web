const englishMonth = (ind: number) => {
  if (ind < 1 || ind > 12) return;
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
  return months[ind - 1];
};
export default englishMonth;
