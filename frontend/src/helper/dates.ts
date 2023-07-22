import NepaliDate from "nepali-date-converter";
import { isSameDay } from "date-fns";
import { CalendarEvent } from "../types/events.types";
import { nepaliMonths } from "../constants/mahina";

export function getTithiNepali(index: number): string {
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
export function getTithiEnglish(index: number): string {
  const tithiName: {
    [key: number]: string;
  } = {
    1: "Prathama",
    2: "Dwitiya",
    3: "Tritiya",
    4: "Chaturthi",
    5: "Panchami",
    6: "Shashti",
    7: "Saptami",
    8: "Ashtami",
    9: "Navami",
    10: "Dashami",
    11: "Ekadashi",
    12: "Dwadashi",
    13: "Thrayodashi",
    14: "Chaturdashi",
    15: "Purnima",
    30: "Ausi",
  };

  return tithiName[index];
}

export function getChandramaNepali(index: number): string {
  const chandraNames = [
    "\u0915\u093e\u0930\u094d\u0924\u093f\u0915 \u0936\u0941\u0915\u094d\u0932\u092a\u0915\u094d\u0937",
    "\u092e\u093e\u0930\u094d\u0917 \u0915\u0943\u0937\u094d\u0923\u092a\u0915\u094d\u0937",
    "\u092e\u093e\u0930\u094d\u0917 \u0936\u0941\u0915\u094d\u0932\u092a\u0915\u094d\u0937",
    "\u092a\u094c\u0937 \u0915\u0943\u0937\u094d\u0923\u092a\u0915\u094d\u0937",
    "\u092a\u094c\u0937 \u0936\u0941\u0915\u094d\u0932\u092a\u0915\u094d\u0937",
    "\u092e\u093e\u0918 \u0915\u0943\u0937\u094d\u0923\u092a\u0915\u094d\u0937",
    "\u092e\u093e\u0918 \u0936\u0941\u0915\u094d\u0932\u092a\u0915\u094d\u0937",
    "\u092b\u093e\u0932\u094d\u0917\u0941\u0923 \u0915\u0943\u0937\u094d\u0923\u092a\u0915\u094d\u0937",
    "\u092b\u093e\u0932\u094d\u0917\u0941\u0923 \u0936\u0941\u0915\u094d\u0932\u092a\u0915\u094d\u0937",
    "\u091a\u0948\u0924\u094d\u0930 \u0915\u0943\u0937\u094d\u0923\u092a\u0915\u094d\u0937",
    "\u091a\u0948\u0924\u094d\u0930 \u0936\u0941\u0915\u094d\u0932\u092a\u0915\u094d\u0937",
    "\u0935\u0948\u0936\u093e\u0916 \u0915\u0943\u0937\u094d\u0923\u092a\u0915\u094d\u0937",
    "\u0935\u0948\u0936\u093e\u0916 \u0936\u0941\u0915\u094d\u0932\u092a\u0915\u094d\u0937",
    "\u091c\u094d\u092f\u0947\u0937\u094d\u0920 \u0915\u0943\u0937\u094d\u0923\u092a\u0915\u094d\u0937",
    "\u091c\u094d\u092f\u0947\u0937\u094d\u0920 \u0936\u0941\u0915\u094d\u0932\u092a\u0915\u094d\u0937",
    "\u0906\u0937\u093e\u0922 \u0915\u0943\u0937\u094d\u0923\u092a\u0915\u094d\u0937",
    "\u0906\u0937\u093e\u0922 \u0936\u0941\u0915\u094d\u0932\u092a\u0915\u094d\u0937",
    "\u0936\u094d\u0930\u093e\u0935\u0923 \u0915\u0943\u0937\u094d\u0923\u092a\u0915\u094d\u0937",
    "\u0936\u094d\u0930\u093e\u0935\u0923 \u0936\u0941\u0915\u094d\u0932\u092a\u0915\u094d\u0937",
    "\u092d\u093e\u0926\u094d\u0930 \u0915\u0943\u0937\u094d\u0923\u092a\u0915\u094d\u0937",
    "\u092d\u093e\u0926\u094d\u0930 \u0936\u0941\u0915\u094d\u0932\u092a\u0915\u094d\u0937",
    "\u0906\u0936\u094d\u0935\u093f\u0928 \u0915\u0943\u0937\u094d\u0923\u092a\u0915\u094d\u0937",
    "\u0906\u0936\u094d\u0935\u093f\u0928 \u0936\u0941\u0915\u094d\u0932\u092a\u0915\u094d\u0937",
    "\u0915\u093e\u0930\u094d\u0924\u093f\u0915 \u0915\u0943\u0937\u094d\u0923\u092a\u0915\u094d\u0937",
  ];

  return (Math.floor(index - 1) < index - 1 ? "अधिक " : "") + chandraNames[Math.floor(index - 1)];
}
export function getChandramaEnglish(index: number): string {
  const chandraNames = [
    "Kartik Shuklapaksha",
    "Marg Krishna Paksha",
    "Marg Shuklapaksha",
    "Poush Krishna Paksha",
    "Poush Shuklapaksha",
    "Magh Krishna Paksha",
    "Magh Shuklapaksha",
    "Falgun Krishna Paksha",
    "Falgun Shuklapaksha",
    "Chaitra Krishna Paksha",
    "Chaitra Shuklapaksha",
    "Baisakh Krishna Paksha",
    "Baisakh Shuklapaksha",
    "Jestha Krishna Paksha",
    "Jestha Shuklapaksha",
    "Ashadh Krishna Paksha",
    "Ashadh Shuklapaksha",
    "Shrawan Krishna Paksha",
    "Shrawan Shuklapaksha",
    "Bhadra Krishna Paksha",
    "Bhadra Shuklapaksha",
    "Ashwin Krishna Paksha",
    "Ashwin Shuklapaksha",
    "Kartik Krishna Paksha",
  ];
  return (Math.floor(index - 1) < index - 1 ? "Adhik " : "") + chandraNames[Math.floor(index - 1)];
}

export const eventDuration = (event: CalendarEvent, isNepaliLanguage: boolean) => {
  const startDate = new Date(event.start.dateTime || event.start.date || new Date());
  const startNepaliDate = new NepaliDate(startDate);
  const endDate = new Date(event.end.dateTime || event.end.date || new Date());
  const endNepaliDate = new NepaliDate(endDate);
  if (event.end.date) {
    endNepaliDate.setDate(endNepaliDate.getDate() - 1);
  }
  if (isSameDay(startNepaliDate.toJsDate(), endNepaliDate.toJsDate())) {
    if (event.end.date) return isNepaliLanguage ? "पुरा दिन" : "Full Day";
    const locale = isNepaliLanguage ? "ne-NP" : "en-US";
    const start = startDate.toLocaleString(locale, { hour: "numeric", minute: "numeric", hour12: true });
    const end = endDate.toLocaleString(locale, { hour: "numeric", minute: "numeric", hour12: true });
    return `${start} - ${end}`;
  }
  const startMonth = nepaliMonths[startNepaliDate.getMonth()];
  const endMonth = nepaliMonths[endNepaliDate.getMonth()];
  return isNepaliLanguage
    ? `${startNepaliDate.getBS().date} ${startMonth.np}- ${endNepaliDate.getBS().date} ${endMonth.np}`
    : `${startNepaliDate.getBS().date} ${startMonth.en} - ${endNepaliDate.getBS().date} ${endMonth.en}`;
};


/**
 * Get language-sensitive relative time message from Dates.
 * @param relative  - the relative dateTime, generally is in the past or future
 * @param isNepaliLanguage - a flag indicating whether to use Nepali language for output
 * @param pivot     - the dateTime of reference, generally is the current time
 */
export function relativeTimeFromDates(
  relative: Date | null,
  isNepaliLanguage = false
): string {
  if (!relative) return "";

  const dayInMillis = 24 * 60 * 60 * 1000; // Milliseconds in a day

  // Get the current date and time
  const now = new Date();

 // Calculate the difference in days between the relative date and the current date
 const nowStartOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
 const relativeStartOfDay = new Date(relative.getFullYear(), relative.getMonth(), relative.getDate());
 const relativeDay = Math.floor((relativeStartOfDay.getTime() - nowStartOfDay.getTime()) / dayInMillis);

  if (relativeDay === 0) {
    if (isNepaliLanguage) {
      return "आज";
    } else {
      return "Today";
    }
  } else if (relativeDay === -1) {
    if (isNepaliLanguage) {
      return "हिजो";
    } else {
      return "Yesterday";
    }
  } else if (relativeDay === 1) {
    if (isNepaliLanguage) {
      return "भोलि";
    } else {
      return "Tomorrow";
    }
  } else if (relativeDay > 1) {
    if (isNepaliLanguage) {
      return `${relativeDay} दिन पछि`;
    } else {
      return `after ${relativeDay} days`;
    }
  } else {
    if (isNepaliLanguage) {
      return `${Math.abs(relativeDay)} दिन अघि`;
    } else {
      return `${Math.abs(relativeDay)} days ago`;
    }
  }
}
// const now = new Date();
// console.log("now:", now);

// const testDate = new Date("2023-07-22T13:00:00.000Z");
// console.log("time : "+relativeTimeFromDates(testDate, false));

