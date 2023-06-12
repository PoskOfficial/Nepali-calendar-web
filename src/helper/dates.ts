import NepaliDate from "nepali-date-converter";

export function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const yearStr = year.toString();
  const monthStr = month.toString().padStart(2, "0");
  const dateStr = date.toString().padStart(2, "0");

  return `${yearStr}-${monthStr}-${dateStr}`;
}
export function getYear() {
  const today = new Date();
  const year = today.getFullYear();
  return year;
}
export function getCurrentMonth() {
  const today = new Date();
  const month = new NepaliDate(today).getMonth();
  return month;
}
export function getCurrentYear() {
  const today = new Date();
  const year = new NepaliDate(today).getYear();
  return year;
}
