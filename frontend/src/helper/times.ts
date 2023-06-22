import { Event } from "../config/db";
import { isSameDay } from "date-fns";
import NepaliDate from "nepali-date-converter";
import nepaliNumber from "./nepaliNumber";
import mahina from "../constants/mahina";
const isAllDayEvent = (event: Event) =>
  event.start.date &&
  event.end.date &&
  isSameDay(new Date(event.start.date), new Date(new Date(event.end.date).getTime() - 24 * 60 * 60 * 1000));
export const eventDurationString = (event: Event) => {
  if (isAllDayEvent(event)) return "All Day";
  else if (event.start.date && event.end.date) {
    const startDate = new NepaliDate(new Date(event.start.date));
    const endDate = new NepaliDate(new Date(event.end.date));
    return `${nepaliNumber(startDate.getDate().toString() )+ " " + mahina(Number(startDate.getMonth()))} - ${
      nepaliNumber(endDate.getDate().toString()) + " " +mahina( Number(endDate.getMonth()))
    }`;
  } else if (event.start.dateTime && event.end.dateTime) {
    const startDateTime = new Date(event.start.dateTime);
    const endDateTime = new Date(event.end.dateTime);
    const startingHour = startDateTime.getHours();
    const startingMinutes = startDateTime.getMinutes();
    const endingHour = endDateTime.getHours();
    const endingMinutes = endDateTime.getMinutes();
    return `${AmOrPm(startingHour, startingMinutes)} - ${AmOrPm(endingHour, endingMinutes)}`;
  }
};
export const AmOrPm = (hour: number, minutes: number) => {
  if (hour < 12) {
    return `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} AM`;
  } else if (hour > 12) {
    return `${(hour % 12).toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} PM`;
  }
  return `${hour}:${minutes.toString().padStart(2, "0")} PM`;
};
