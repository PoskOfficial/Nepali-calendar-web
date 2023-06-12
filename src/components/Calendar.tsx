import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { getToday, getCurrentMonth } from "../helper/dates";
import nepaliNumber from "../helper/nepaliNumber";
import { Dispatch, SetStateAction, useState } from "react";
import mahina from "../constants/mahina";
import { Day } from "../types";

function classNames(...classes: Array<string | undefined | boolean>) {
  return classes.filter(Boolean).join(" ");
}

interface Calender {
  yearData: {
    [key: string]: Day[];
  };
  setCurrentYear: Dispatch<SetStateAction<number>>;
}

export default function Calendar({ yearData, setCurrentYear }: Calender) {
  const [currentMonth, setCurrentMonth] = useState(() => getCurrentMonth());
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);

  const days: Day[] = yearData[
    currentMonth + 1 < 10
      ? "0" + (currentMonth + 1).toString()
      : (currentMonth + 1).toString()
  ]?.map((item: Day) => {
    const today = getToday();
    const isToday = item.ad === today;
    return {
      ...item,
      is_today: isToday,
    };
  });

  const handelNextMonth = () => {
    console.log("current month : " + currentMonth);
    if (currentMonth == 11) {
      setCurrentYear((prev: number) => prev + 1);
      setCurrentMonth((prev: number) => prev % 11);
    } else setCurrentMonth((prev) => prev + 1);
  };

  const handelPrevMonth = () => {
    if (currentMonth == 0) {
      setCurrentYear((prev: number) => prev - 1);
      setCurrentMonth(11);
    } else setCurrentMonth((prev) => prev - 1);
  };

  return (
    <div>
      <div className="mt-10 mx-2 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
        <div className="flex items-center text-gray-900">
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            onClick={handelPrevMonth}
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex-auto font-semibold font-mukta">
            {mahina(currentMonth)}
          </div>
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            onClick={handelNextMonth}
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-7 text-xs text-gray-500 leading-10">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200 font-sans">
          {days?.map((day: Day, dayIdx: number) => (
            <button
              key={day.day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={classNames(
                "p-1 hover:bg-gray-100 focus:z-10 leading-3 font-mukta",
                (selectedDay?.day == day.day || day.is_today) &&
                  "font-semibold",
                day.is_today && "font-semibold text-indigo-600",
                !(selectedDay?.day === day.day) && "bg-white",
                selectedDay?.day === day.day &&
                  dayIdx === 0 &&
                  `col-start-${day.week_day}`,
                selectedDay?.day === day.day &&
                  " text-white  hover:bg-indigo-700 bg-indigo-600",
                selectedDay?.day === day.day && "bg-indigo-600"
              )}
            >
              {/* <span className="sr-only sm:not-sr-only">on</span> */}
              <span className="text-bold text-xs  h-6 w-6 rounded-full">
                {day["events"].length > 1
                  ? `+${day["events"].length}`
                  : `${day["events"].length}`}
              </span>
              <time
                dateTime={day.AD_date.bs}
                className={classNames(
                  "mx-auto flex  items-center justify-center rounded-full text-xl mt-0 pt-0"
                )}
              >
                {nepaliNumber(day.day)}
              </time>
              <span className="mx-auto mt-0 my-0 py-0 font-extralight text-[9px]">
                {day.ad.split("-").pop()}
              </span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="mt-8 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add event
        </button>
        <div className="flex items-start rounded-xl bg-white p-4 mt-1 shadow-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
            <h1 className="font-semibold">१२</h1>
          </div>

          <div className="ml-4 text-left">
            <h2 className="font-semibold">१२ वैशाख २०८०, मंगलवार</h2>
            <p className="mt-2 text-sm text-gray-500">April 25, 2023</p>
            {/* <p className="mt-2 text-sm text-gray-500">April 25, 2023</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
