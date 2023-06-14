import NepaliDate from "nepali-date-converter";

export function getToday() {
  const today = new NepaliDate(new Date());
  const year = today.getBS();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const yearStr = year.toString();
  const monthStr = month.toString().padStart(2, "0");
  const dateStr = date.toString().padStart(2, "0");

  return { string: `${yearStr}-${monthStr}-${dateStr}`, year, month, date, dateStr };
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
export function getTithi(index: number): string {
  const tithiName: {
    [key: number]: string;
  } = {
    1: "\u092a\u094d\u0930\u0924\u093f\u092a\u0926\u093e",
    2: "\u0926\u094d\u0935\u093f\u0924\u0940\u092f\u093e",
    3: "\u0924\u0943\u0924\u0940\u092f\u093e",
    4: "\u091a\u0924\u0941\u0930\u094d\u0925\u0940",
    5: "\u092a\u091e\u094d\u091a\u092e\u0940",
    6: "\u0937\u0937\u094d\u0920\u0940",
    7: "\u0938\u092a\u094d\u0924\u092e\u0940",
    8: "\u0905\u0937\u094d\u091f\u092e\u0940",
    9: "\u0928\u0935\u092e\u0940",
    10: "\u0926\u0936\u092e\u0940",
    11: "\u090f\u0915\u093e\u0926\u0936\u0940",
    12: "\u0926\u094d\u0935\u093e\u0926\u0936\u0940",
    13: "\u0924\u094d\u0930\u092f\u094b\u0926\u0936\u0940",
    14: "\u091a\u0924\u0941\u0930\u094d\u0926\u0936\u0940",
    15: "\u092a\u0942\u0930\u094d\u0923\u093f\u092e\u093e",
    30: "\u0914\u0902\u0938\u0940",
  };
  return tithiName[index];
}
