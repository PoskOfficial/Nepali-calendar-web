import SingleEvent from "./components/SingleEvent";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Day, YearData } from "./types";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import NepaliDate from "nepali-date-converter";
import { fetchYearlyData } from "./helper/api";
import DropDown from "./components/DropDown";
import UseLanguage from "./helper/useLanguage";
import { en_availableYears, np_availableYears } from "./constants/availableYears";
import { np_nepaliMonths, en_nepaliMonths } from "./constants/mahina";
function UpcomingEvents() {
  function classNames(...classes: Array<string | undefined | boolean>) {
    return classes.filter(Boolean).join(" ");
  }
  const { isNepaliLanguage } = UseLanguage();
  const availableYears = en_availableYears;
  const today = new NepaliDate(); //gets today's nepali date
  const [activeYear, setActiveYear] = useState(today.getYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  // const [nepaliMonthNumber] = useState(today.getMonth() + 1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({} as YearData);
  useEffect(() => {
    const getFile = async () => {
      const dta = await fetchYearlyData(`${activeYear}`);
      setData(dta);
      setLoading(false);
    };
    getFile();
  }, [activeYear]);

  const handleNextMonth = () => {
    if (currentMonth == 11) {
      setActiveYear((prev: number) => prev + 1);
      setCurrentMonth((prev: number) => prev % 11);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth == 0) {
      setActiveYear((prev: number) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const monthData = useMemo(() => {
    return data[currentMonth >= 9 ? (currentMonth + 1).toString() : `0${currentMonth + 1}`];
  }, [data, currentMonth]);

  if (loading || !data) {
    return <>loading...</>;
  }
  return (
    <div className="lg:1/2 mx-auto mb-4 max-w-lg px-4 md:w-2/3">
      <div className="flex items-center text-gray-900">
        <button
          type="button"
          disabled={currentMonth === 0 && activeYear === availableYears[0]}
          className={classNames(
            "mx - 3 flex flex-none items-center justify-center rounded-lg  bg-indigo-600 p-1.5 text-white hover:bg-indigo-700  disabled:cursor-not-allowed disabled:bg-blue-600 disabled:text-white disabled:opacity-20 disabled:hover:cursor-not-allowed disabled:hover:bg-blue-600 disabled:hover:text-white"
          )}
          onClick={handlePrevMonth}>
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex w-96 flex-auto items-center justify-center gap-4 font-mukta font-semibold">
          <DropDown
            selected={activeYear}
            setSelected={setActiveYear}
            items={isNepaliLanguage ? np_availableYears : en_availableYears}
            isValue
          />
          <DropDown
            selected={currentMonth}
            setSelected={setCurrentMonth}
            items={isNepaliLanguage ? np_nepaliMonths : en_nepaliMonths}
          />
        </div>
        <button
          type="button"
          disabled={currentMonth === 11 && activeYear === availableYears[availableYears.length - 1]}
          className={classNames(
            "flex flex-none items-center justify-center rounded-lg  bg-indigo-600 p-1.5 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-blue-600 disabled:text-white disabled:opacity-20 disabled:hover:cursor-not-allowed disabled:hover:bg-blue-600 "
          )}
          onClick={handleNextMonth}>
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {monthData?.map((day: Day) => {
        return (
          day.events?.length > 0 && (
            <SingleEvent
              key={day.ad}
              nepaliDate={day.AD_date.bs}
              englishDate={day.AD_date.ad}
              week_day={day.week_day}
              events={day.events}
            />
          )
        );
      })}
    </div>
  );
}

export default UpcomingEvents;
