import SingleEvent from "./components/SingleEvent";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Day } from "./interface/interfaces";
import { useState } from "react";
import nepaliMonth from "./utility/nepaliMonth";
import nepaliNumber from "./utility/nepaliNumber";
import LoadData from "./utility/LoadData";
import { useEffect } from "react";
import NepaliDate from "nepali-date-converter";
function UpcomintEvents() {
  const today = new NepaliDate(); //gets today's nepali date

  const [activeYear, setActiveYear] = useState(today.getYear());
  const [nepaliMonthNumber, setNepaliMonthNumber] = useState(
    today.getMonth() + 1
  ); //to match 1 based  indexing added 1
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    const getFile = async () => {
      const dta = await LoadData(activeYear);
      setData(dta);
      setLoading(false);
    };
    getFile();
  }, [activeYear]);
  console.log(today);
  const numberStr = nepaliMonthNumber.toString().padStart(2, "0");
  console.log(data);
  if (loading) {
    return <></>;
  }
  //@ts-expect-error string cant be used to index
  const thisMonth = data[numberStr];
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
          {`${nepaliMonth(numberStr)} ${nepaliNumber(activeYear.toString())}`}
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
