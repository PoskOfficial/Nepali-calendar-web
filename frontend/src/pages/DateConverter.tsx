import NepaliDatePicker from "../components/NepaliDatePicker";
import NepaliDate from "nepali-date-converter";
import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid";
import nepaliNumber from "../helper/nepaliNumber";
import { np_nepaliMonths as nepaliMonths } from "../constants/mahina";

import { ChangeEvent, useState } from "react";
import useLanguage from "../helper/useLanguage";
import { format } from "date-fns";
const DateConverter = () => {
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [nepaliDate, setNepaliDate] = useState<NepaliDate>(new NepaliDate(new Date()));

  const minDate = "1943-04-14";
  const maxDate = "2034-04-13";
  const { t } = useLanguage();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let inputValue = e.target.value;

    let inputDate = new Date(inputValue);

    // check if the current date exceeds the maxDate or falls before the minDate.
    if (inputDate > new Date(minDate) && inputDate < new Date(maxDate)) {
      const selectedMepaliDate = new NepaliDate(new Date());
      setNepaliDate(selectedMepaliDate);
      setDate(inputDate);
    }
    setDateString(e.target.value);
  }

  return (
    <>
      <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center pb-20 text-center font-mukta lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
        <div className=" font-mukta text-2xl font-semibold dark:text-white">{t("dc.Date_Converter")}</div>
        <div className="mt-5 w-4/5 sm:w-full">
          <div className="flex flex-col  items-center justify-around  pb-5 sm:flex-row sm:items-center">
            <div className="flex flex-row items-center gap-2 sm:flex-col">
              <div className="font-mukta font-semibold">
                {" "}
                <span className="hidden dark:text-white sm:inline-block">{t("dc.B.S")}</span>
              </div>
              <NepaliDatePicker date={date} setDate={setDate} />
            </div>
            <div className="flex w-36  flex-row items-center  justify-center ">
              <ArrowsRightLeftIcon
                className="h-8 w-8 rotate-90 dark:text-white sm:rotate-0"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-row items-center gap-2 sm:flex-col">
              <div className="font-mukta font-semibold">
                {" "}
                <span className="hidden dark:text-white sm:inline-block"> {t("dc.A.D")}</span>
              </div>
              <input
                type="date"
                value={dateString}
                onChange={handleChange}
                className="cursor-pointer appearance-none rounded-md border px-20 py-3 text-sm shadow-sm outline-none dark:bg-gray-800 dark:text-white  sm:px-10 "
                max={maxDate}
                min={minDate}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-xl dark:text-white ">
            {`${nepaliNumber(`${nepaliDate.getYear()}`)} ${
              nepaliMonths[nepaliDate.getMonth()]
            } ${nepaliNumber(
              `${nepaliDate.getDate()}, ${nepaliDate.toJsDate().toLocaleString("ne-NP", { weekday: "long" })}`
            )}`}
          </p>
          <p className="font-mukta text-2xl font-semibold dark:text-white">
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
