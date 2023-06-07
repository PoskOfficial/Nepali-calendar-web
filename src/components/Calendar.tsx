import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

// dummy data
const days = [
  { date: "2021-12-27" },
  { date: "2021-12-28" },
  { date: "2021-12-29" },
  { date: "2021-12-30" },
  { date: "2021-12-31" },
  { date: "2022-01-01", isCurrentMonth: true },
  { date: "2022-01-02", isCurrentMonth: true },
  { date: "2022-01-03", isCurrentMonth: true },
  { date: "2022-01-04", isCurrentMonth: true },
  { date: "2022-01-05", isCurrentMonth: true },
  { date: "2022-01-06", isCurrentMonth: true },
  { date: "2022-01-07", isCurrentMonth: true },
  { date: "2022-01-08", isCurrentMonth: true },
  { date: "2022-01-09", isCurrentMonth: true },
  { date: "2022-01-10", isCurrentMonth: true },
  { date: "2022-01-11", isCurrentMonth: true },
  { date: "2022-01-12", isCurrentMonth: true, isToday: true },
  { date: "2022-01-13", isCurrentMonth: true },
  { date: "2022-01-14", isCurrentMonth: true },
  { date: "2022-01-15", isCurrentMonth: true },
  { date: "2022-01-16", isCurrentMonth: true },
  { date: "2022-01-17", isCurrentMonth: true },
  { date: "2022-01-18", isCurrentMonth: true },
  { date: "2022-01-19", isCurrentMonth: true },
  { date: "2022-01-20", isCurrentMonth: true },
  { date: "2022-01-21", isCurrentMonth: true },
  { date: "2022-01-22", isCurrentMonth: true, isSelected: true },
  { date: "2022-01-23", isCurrentMonth: true },
  { date: "2022-01-24", isCurrentMonth: true },
  { date: "2022-01-25", isCurrentMonth: true },
  { date: "2022-01-26", isCurrentMonth: true },
  { date: "2022-01-27", isCurrentMonth: true },
  { date: "2022-01-28", isCurrentMonth: true },
  { date: "2022-01-29", isCurrentMonth: true },
  { date: "2022-01-30", isCurrentMonth: true },
  { date: "2022-01-31", isCurrentMonth: true },
  { date: "2022-02-01" },
  { date: "2022-02-02" },
  { date: "2022-02-03" },
  { date: "2022-02-04" },
  { date: "2022-02-05" },
  { date: "2022-02-06" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const nepaliNumber = (str:string) => {
  const nepaliNumbers = {
    0: "०",
    1: "१",
    2: "२",
    3: "३",
    4: "४",
    5: "५",
    6: "६",
    7: "७",
    8: "८",
    9: "९",
  };
  return str.replace(/\d/g, (match) => nepaliNumbers[match]);
}



export default function Calendar() {
  return (
    <div>
      <div className="mt-10 mx-2 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
        <div className="flex items-center text-gray-900">
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex-auto font-semibold font-mukta">बैशाख</div>
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
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
          {days.map((day, dayIdx) => (
            <button
              key={day.date}
              type="button"
              className={classNames(
                "p-1 hover:bg-gray-100 focus:z-10 leading-3 font-mukta",
                day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                (day.isSelected || day.isToday) && "font-semibold",
                //   day.isSelected && 'text-white',

                !day.isSelected &&
                  day.isCurrentMonth &&
                  !day.isToday &&
                  "text-gray-900",
                !day.isSelected &&
                  !day.isCurrentMonth &&
                  !day.isToday &&
                  "text-gray-400",
                day.isToday && !day.isSelected && "text-indigo-600",
                dayIdx === 0 && "rounded-tl-lg",
                dayIdx === 6 && "rounded-tr-lg",
                dayIdx === days.length - 7 && "rounded-bl-lg",
                dayIdx === days.length - 1 && "rounded-br-lg"
              )}
            >
              {/* <span className="sr-only sm:not-sr-only">on</span> */}
              <span className="mx-auto mt-auto flex flex-wrap justify-center text-center">
                {Array.from(Array(Math.floor(dayIdx%4)).keys()).map((event) => (
                  <span
                    key={event}
                    className="mt-1 mx-0.5 mb-0 h-1 w-1 rounded-full bg-gray-400"
                  />
                ))}
              </span>
              <time
                dateTime={day.date}
                className={classNames(
                  "mx-auto flex  items-center justify-center rounded-full text-xl mt-0 pt-0",
                  day.isSelected && day.isToday && "bg-indigo-600"
                  // day.isSelected && !day.isToday && 'bg-gray-900'
                )}
              >
                {nepaliNumber(day.date.split("-").pop().replace(/^0/, ""))}
              </time>
              <span className="mx-auto mt-0 my-0 py-0 font-extralight text-[9px]">
                {dayIdx}
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
