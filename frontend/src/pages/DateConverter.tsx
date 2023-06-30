import NepaliDatePicker from "../components/NepaliDatePicker";
import NepaliDate from "nepali-date-converter";
import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid";
import nepaliNumber from "../helper/nepaliNumber";
import { getWeekDayNepali } from "../helper/dates";
import { np_nepaliMonths as nepaliMonths } from "../constants/mahina";

import { useState } from "react";
const DateConverter = () => {
  const [date, setDate] = useState(new Date());
  const nepaliDate = new NepaliDate(date);
  const minDate = "1943-04-14";
  const maxDate = "2034-03-26";

  return (
    <>
      <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center pb-20 text-center font-mukta lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
        <div className=" font-mukta text-2xl font-semibold">Miti Converter</div>
        <div className="mt-5 w-4/5 sm:w-full">
          <div className="flex flex-col  items-center justify-around  pb-5 sm:flex-row sm:items-center">
            <div className="flex flex-row items-center gap-2 sm:flex-col">
              <div className="font-mukta font-semibold">
                {" "}
                <span className="hidden sm:inline-block">Bikram Sambat </span> B.S.
              </div>
              <NepaliDatePicker date={date} setDate={setDate} />
            </div>
            <div className="flex w-36  flex-row items-center  justify-center ">
              <ArrowsRightLeftIcon className="h-8 w-8 rotate-90 sm:rotate-0" aria-hidden="true" />
            </div>
            <div className="flex flex-row items-center gap-2 sm:flex-col">
              <div className="font-mukta font-semibold">
                {" "}
                <span className="hidden sm:inline-block"> Anno Domini</span> A.D.
              </div>
              <input
                type="date"
                value={date.toISOString().split("T")[0]}
                onChange={(e) => {
                  setDate(e.target.value ? new Date(e.target.value) : new Date());
                }}
                className="cursor-pointer appearance-none rounded-md border px-20 py-3 text-sm shadow-sm  outline-none  sm:px-10 "
                max={maxDate}
                min={minDate}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-xl ">
            {`${nepaliNumber(`${nepaliDate.getYear()}`)} ${
              nepaliMonths[nepaliDate.getMonth()]
            } ${nepaliNumber(`${nepaliDate.getDate()}, ${getWeekDayNepali(nepaliDate.getDay())}`)}`}
          </p>
          <p className="font-mukta text-2xl font-semibold ">
            {`${date.toLocaleString("default", { weekday: "long" })} ${date.getDate()}, ${date.toLocaleString(
              "default",
              { month: "long" }
            )} ${date.getFullYear()}`}
          </p>
        </div>
      </div>
    </>
  );
};

export default DateConverter;
