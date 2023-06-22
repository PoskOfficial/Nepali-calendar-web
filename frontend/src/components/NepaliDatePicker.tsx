import { Dispatch, Fragment, useEffect, useState } from "react";
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
  date: string;
  hasValueLabel?: boolean;
  data: any;
  title: string;
  setYYMMDD: Dispatch<React.SetStateAction<{ year: string; month: string; day: string }>>;
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
        onChange={(value) =>
          setYYMMDD((prev) => {
            return {
              ...prev,
              [title]: value,
            };
          })
        }>
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
                    value={num}>
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {num}
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
function NepaliDatePicker({ setDate }: { setDate: Dispatch<React.SetStateAction<Date>> }) {
  const monthData = [
    { value: "0", label: "01" },
    { value: "01", label: "02" },
    { value: "02", label: "03" },
    { value: "03", label: "04" },
    { value: "04", label: "05" },
    { value: "05", label: "06" },
    { value: "06", label: "07" },
    { value: "07", label: "08" },
    { value: "08", label: "09" },
    { value: "09", label: "10" },
    { value: "10", label: "11" },
    { value: "11", label: "12" },
  ];
  const today = new NepaliDate(new Date());
  const [YYMMDD, setYYMMDD] = useState({
    year: today.getYear().toString(),
    month: today.getMonth().toString(),
    day: today.getDate().toString(),
  });
  console.log(YYMMDD);
  const getDays = (year: keyof typeof nepaliDateData | null, month: string | null) => {
    if (!year || !month) return [];
    const days = nepaliDateData[year][+month];
    const dayData = [];
    for (let i = 1; i <= days; i += 1) {
      dayData.push({ value: i.toString(), label: i.toString() });
    }
    return dayData;
  };
  useEffect(() => {
    // @ts-ignore
    const date = new Date(new NepaliDate(`${YYMMDD.year}-${YYMMDD.month}-${YYMMDD.day}`));
    setDate(date);
  }, [YYMMDD]);
  return (
    <div className="flex items-center gap-2">
      <Picker date={YYMMDD.year} data={Object.keys(nepaliDateData)} title="year" setYYMMDD={setYYMMDD} />
      <Picker date={YYMMDD.month} data={monthData} hasValueLabel title="month" setYYMMDD={setYYMMDD} />
      <Picker
        date={YYMMDD.day}
        // @ts-ignore
        data={getDays(YYMMDD.year, YYMMDD.month)}
        hasValueLabel
        title="day"
        setYYMMDD={setYYMMDD}
      />
    </div>
  );
}

export default NepaliDatePicker;
