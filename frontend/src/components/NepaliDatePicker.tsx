import { Dispatch, Fragment, useMemo, useState } from "react";
import NepaliDate from "nepali-date-converter";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import nepaliDateData from "../constants/nepaliDateData";

function Picker({
  date,
  hasValueLabel,
  data,
  title,
  setYYMMDD,
}: {
  date: string | undefined;
  hasValueLabel?: boolean;
  data: any;
  title: string;
  setYYMMDD: Dispatch<React.SetStateAction<Date>>;
}) {
  const [query, setQuery] = useState("");
  const filtered = hasValueLabel
    ? query === ""
      ? data.map((d: { value: string; label: string }) => d.label)
      : data.map((d: { value: string; label: string }) => d.label).filter((num: any) => num.includes(query))
    : query === ""
    ? data
    : data.filter((num: any) => num.includes(query));

  return (
    <div className={`${title == "year" ? "w-24" : "w-20"}`}>
      <Combobox
        value={date}
        onChange={(value) => {
          setYYMMDD((prev) => {
            const oldDate = new NepaliDate(prev);
            if (title === "year") {
              oldDate.setYear(+value);
            }
            if (title === "month") {
              oldDate.setMonth(+value - 1);
              console.log("day modified", oldDate);
            }
            if (title === "day") {
              oldDate.setDate(+value);
            }
            return oldDate.toJsDate();
          });
        }}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg border bg-white text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full rounded-lg border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-indigo-600 focus:ring-0"
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}>
            <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filtered.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filtered.map((num: string) => (
                  <Combobox.Option
                    key={num}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-2 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={
                      title == "month"
                        ? num
                        : (parseInt(num) - 1).toString()
                        ? num
                        : (parseInt(num) - 1).toString()
                    }>
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {num}
                          {/* {`${console.log("num", num)}`} */}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center ${
                              active ? "text-white" : "text-orange-600"
                            }`}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
function NepaliDatePicker({ setDate, date }: { setDate: Dispatch<React.SetStateAction<Date>>; date: Date }) {
  console.log("date", date);
  const monthData = [
    { value: "0", label: "1" },
    { value: "1", label: "2" },
    { value: "2", label: "3" },
    { value: "3", label: "4" },
    { value: "4", label: "5" },
    { value: "5", label: "6" },
    { value: "6", label: "7" },
    { value: "7", label: "8" },
    { value: "8", label: "9" },
    { value: "9", label: "10" },
    { value: "10", label: "11" },
    { value: "11", label: "12" },
  ];
  const dateBs = useMemo(() => {
    return { ...new NepaliDate(date).getBS(), month: new NepaliDate(date).getBS().month + 1 };
  }, [date]);

  // console.log("dateBs", dateBs);

  const getDays = (year: keyof typeof nepaliDateData | null, month: string | null) => {
    if (!year || !month) return [];
    const days = nepaliDateData[year][+month];
    const dayData = [];
    for (let i = 1; i <= days; i += 1) {
      dayData.push({ value: i.toString(), label: i.toString() });
    }
    return dayData;
  };

  return (
    <div className="flex items-center gap-2">
      <Picker
        date={dateBs.year.toString()}
        data={Object.keys(nepaliDateData)}
        title="year"
        setYYMMDD={setDate}
      />
      <Picker
        date={dateBs.month.toString()}
        data={monthData}
        hasValueLabel
        title="month"
        setYYMMDD={setDate}
      />
      <Picker
        date={dateBs.date?.toString()}
        // @ts-ignore
        data={getDays(dateBs.year?.toString(), dateBs.month?.toString())}
        hasValueLabel
        title="day"
        setYYMMDD={setDate}
      />
    </div>
  );
}

export default NepaliDatePicker;
