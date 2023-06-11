import data2081 from "../public/data/2081-calendar.json";
import data2080 from "../public/data/2080-calendar.json";
import data2079 from "../public/data/2079-calendar.json";
import data2082 from "../public/data/2082-calendar.json";
import data2075 from "../public/data/2075-calendar.json";
import data2076 from "../public/data/2076-calendar.json";
import data2077 from "../public/data/2076-calendar.json";
import data2078 from "../public/data/2077-calendar.json";
import SingleEvent from "./components/SingleEvent";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { Day } from "./interface/interfaces";
import { useState } from "react";
import nepaliMonth from "./utility/nepaliMonth";
import nepaliNumber from "./utility/nepaliNumber";
function UpcomintEvents() {
  const today: Date = new Date();
  const [activeYear, setActiveYear] = useState(2080);
  const [nepaliMonthNumber, setNepaliMonthNumber] = useState(2);
  let datatomap;
  if (activeYear == 2080) {
    datatomap = data2080;
  } else if (activeYear == 2081) {
    datatomap = data2081;
  } else if (activeYear == 2082) {
    datatomap = data2082;
  } else if (activeYear == 2079) {
    datatomap = data2079;
  } else if (activeYear == 2078) {
    datatomap = data2078;
  } else if (activeYear == 2077) {
    datatomap = data2077;
  } else if (activeYear == 2076) {
    datatomap = data2076;
  } else if (activeYear == 2075) {
    datatomap = data2075;
  }
  console.log(today);
  const numberStr = nepaliMonthNumber.toString().padStart(2, "0");
  //@ts-expect-error string cant be used to index
  const thisMonth = datatomap[numberStr];

  return (
    <div className="md:w-2/3 lg:1/2   mx-auto">
      <div className="flex max-w-[600px] items-center text-center  text-gray-900">
        <button
          onClick={() => {
            if (nepaliMonthNumber > 1)
              setNepaliMonthNumber(nepaliMonthNumber - 1);
            else if (activeYear > 2075) {
              setNepaliMonthNumber(12);
              setActiveYear(activeYear - 1);
            }
          }}
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex-auto font-semibold font-mukta">
          {nepaliMonth(numberStr) + " " + nepaliNumber(activeYear.toString())}
        </div>
        <button
          onClick={() => {
            if (nepaliMonthNumber < 12)
              setNepaliMonthNumber(nepaliMonthNumber + 1);
            else if (activeYear < 2082) {
              setNepaliMonthNumber(1);
              setActiveYear(activeYear + 1);
            }
          }}
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {thisMonth.map((day: Day) => {
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

export default UpcomintEvents;
