import isAfter from "date-fns/isAfter";
import { Event } from "../config/db";
const isAllDayEvent = (event: Event) => event.start.date;
const isMultiDayAllDayEvent = (event: Event) =>
  event.start.date && event.end.date && isAfter(new Date(event.end.date), new Date(event.start.date));
const isMultiDayTimedEvent = (event: Event) =>
  event.start.dateTime &&
  event.end.dateTime &&
  isAfter(new Date(event.end.dateTime), new Date(event.start.dateTime));

export const getDurationString = (event: Event) => {
  if (isAllDayEvent(event)) return "All Day";
  else if (isMultiDayAllDayEvent(event))
    return (
      event.end.date &&
      event.start.date &&
      `${new Date(event.start.date).getDate() / new Date(event.start.date).getMonth()}-${
        new Date(event.end.date).getDate() / new Date(event.end.date).getMonth()
      }`
    );
  else if (isMultiDayTimedEvent(event))
    return (
      event.end.dateTime &&
      event.start.dateTime &&
      `${new Date(event.start.dateTime).getMinutes() + ":" + new Date(event.start.dateTime).getHours()}-${
        new Date(event.end.dateTime).getMinutes() + ":" + new Date(event.end.dateTime).getHours()
      }`
    );
};
