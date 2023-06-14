import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { getToday, getCurrentMonth, getTithi, getChandrama, getWeekDayNepali } from "../helper/dates";
import nepaliNumber from "../helper/nepaliNumber";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { nepaliMonths } from "../constants/mahina";
import availableYears from "../constants/availableYears";
import { Day, YearData } from "../types";
import DropDown from "./DropDown";
import ReminderPopupModal from "./ReminderPopupModal";

function classNames(...classes: Array<string | undefined | boolean>) {
  return classes.filter(Boolean).join(" ");
}

interface Calender {
  yearData: YearData | null;
  setCurrentYear: Dispatch<SetStateAction<number>>;
  currentYear: number;
}

const getMonthData = (yearData: YearData | null, currentMonth: number): Day[] => {
  if (!yearData) return [];
  const today = getToday().date;
  const monthData = yearData[currentMonth + 1 < 10 ? "0" + (currentMonth + 1) : currentMonth + 1];
  if (currentMonth === getToday().month) {
    monthData[today - 1].is_today = true;
  }
  return monthData;
};

export default function Calendar({ yearData, setCurrentYear, currentYear }: Calender) {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [selectedDay, setSelectedDay] = useState<string>(
    getCurrentMonth() === currentMonth ? getToday().dateStr : "01"
  );

  const handleNextMonth = () => {
    if (currentMonth == 11) {
      setSelectedDay(getCurrentMonth() === 0 ? getToday().dateStr : "01");
      setCurrentYear((prev: number) => prev + 1);
      setCurrentMonth((prev: number) => prev % 11);
    } else {
      setSelectedDay(getCurrentMonth() === currentMonth + 1 ? getToday().dateStr : "01");
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth == 0) {
      setSelectedDay(getCurrentMonth() === 11 ? getToday().dateStr : "01");
      setCurrentYear((prev: number) => prev - 1);
      setCurrentMonth(11);
    } else {
      setSelectedDay(getCurrentMonth() === currentMonth - 1 ? getToday().dateStr : "01");
      setCurrentMonth((prev) => prev - 1);
    }
  };
  const monthData = useMemo(() => getMonthData(yearData, currentMonth), [yearData, currentMonth]);
  if (!yearData) return <div>Loading...</div>;

  return (
    <div>
      <div className="mx-2 mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
        <div className="flex items-center text-gray-900">
          <button
            type="button"
            disabled={currentMonth === 0 && currentYear === availableYears[0]}
            className={classNames(
              " flex flex-none items-center justify-center rounded-lg  bg-indigo-600 p-1.5 text-white hover:bg-indigo-700  disabled:cursor-not-allowed disabled:bg-blue-600 disabled:text-white disabled:opacity-20 disabled:hover:cursor-not-allowed disabled:hover:bg-blue-600 disabled:hover:text-white"
            )}
            onClick={handlePrevMonth}>
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex w-96 flex-auto items-center justify-center gap-4 font-mukta font-semibold">
            <DropDown selected={currentYear} setSelected={setCurrentYear} items={availableYears} isValue />
            <DropDown selected={currentMonth} setSelected={setCurrentMonth} items={nepaliMonths} />
          </div>
          <button
            type="button"
            disabled={currentMonth === 11 && currentYear === availableYears[availableYears.length - 1]}
            className={classNames(
              " flex flex-none items-center justify-center rounded-lg  bg-indigo-600 p-1.5 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-blue-600 disabled:text-white disabled:opacity-20 disabled:hover:cursor-not-allowed disabled:hover:bg-blue-600 "
            )}
            onClick={handleNextMonth}>
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-7 text-xs leading-10 text-gray-500">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="isolate mt-2 grid grid-cols-7 gap-px overflow-hidden rounded-lg bg-gray-200 font-sans text-sm shadow ring-1 ring-gray-200">
          {getMonthData(yearData, currentMonth)?.map((day: Day, dayIdx: number) => (
            <button
              key={day.day}
              type="button"
              onClick={() => setSelectedDay(day.day)}
              style={dayIdx === 0 ? { gridColumnStart: day.week_day + 1 } : {}}
              className={classNames(
                "p-1 font-mukta leading-3 hover:bg-gray-100 focus:z-10",
                (selectedDay == day.day || day.is_today) && "font-semibold",
                day.is_today && "font-semibold text-indigo-600",
                !(selectedDay === day.day) && "bg-white",
                selectedDay === day.day && " bg-indigo-600  text-white hover:bg-indigo-700",
                selectedDay === day.day && "bg-indigo-600",
                (day.events.find((event) => event.jds?.gh == "1") || day.week_day === 6) && "text-rose-600"
              )}>
              {/* <span className="sr-only sm:not-sr-only">on</span> */}
              {/* <span className="text-bold h-6  w-6 ">
                {day["events"].length > 4
                  ? Array(4)
                      .fill("")
                      .map((_, idx) => (
                        <span
                          key={idx}
                          className={classNames(
                            "mx-[1px] inline-block h-1 w-1 rounded-full bg-slate-600",
                            selectedDay === day.day && "!bg-white"
                          )}></span>
                      ))
                  : day["events"].map((_, idx) => (
                      <span
                        key={idx}
                        className={classNames(
                          "mx-[1px] inline-block h-1 w-1 rounded-full bg-slate-600 ",
                          selectedDay === day.day && "!bg-white"
                        )}></span>
                    ))}
              </span> */}
              <time
                dateTime={day.AD_date.bs}
                className={classNames(
                  "mx-auto mt-0 flex items-center justify-center rounded-full pt-0 text-xl"
                )}>
                {nepaliNumber(day.day)}
              </time>
              <span className="mx-auto my-0 mt-0 py-0 text-[9px] font-extralight">
                {day.ad.split("-").pop()}
              </span>
            </button>
          ))}
        </div>
        <a
          type="button"
          href="/upcoming"
          className="mt-8 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          View all event
        </a>
        <div className="mt-1 flex items-start rounded-xl bg-white p-4 shadow-lg">
          <div className="flex-col">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50 font-semibold">
              <h1>{selectedDay && nepaliNumber(selectedDay)}</h1>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {getWeekDayNepali(monthData[parseInt(selectedDay) - 1]?.week_day)}
            </p>
          </div>

          <div className="ml-4 text-left">
            <h2 className="font-semibold">
              {new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(
                new Date(monthData[parseInt(selectedDay) - 1]?.events[0]?.ad)
              )}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {`${getTithi(monthData[parseInt(selectedDay) - 1]?.AD_date?.tithi)},
              ${getChandrama(monthData[parseInt(selectedDay) - 1]?.AD_date?.chandrama)} •
              ${monthData[parseInt(selectedDay) - 1]?.events.map((event) => event?.jds?.ne).join(" | ")}`}
            </p>
            {/* <p className="mt-2 text-sm text-gray-500">April 25, 2023</p> */}
          </div>
        </div>
        <ReminderPopupModal date={`${selectedDay}-${currentMonth}-${currentYear}`} />
      </div>
    </div>
  );
}
