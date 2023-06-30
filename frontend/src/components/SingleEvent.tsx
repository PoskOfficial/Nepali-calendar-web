import { getWeekDayEnglish, getWeekDayNepali } from "../helper/dates";
import englishMonth from "../helper/englishMonth";
import nepaliNumber from "../helper/nepaliNumber";
import { Event } from "../types";
import UseLanguage from "../helper/useLanguage";
function SingleEvent({
  nepaliDate,
  englishDate,
  week_day,
  events,
}: {
  nepaliDate: string;
  englishDate: string;
  week_day: number;
  events: Event[];
}) {
  const { isNepaliLanguage } = UseLanguage();
  const nepaliEvents = isNepaliLanguage
    ? events.map((event) => event?.jds?.ne)
    : events.map((event) => event?.jds?.en);
  const eventsString: string = nepaliEvents.join(" / ");
  return (
    <div>
      {eventsString.length > 0 && (
        <div className="flex max-w-[600px] border py-3 pl-1 font-mukta">
          <div className="min-w-[80px]  border-r pr-2">
            <h1 className="text-center font-semibold">
              {isNepaliLanguage ? nepaliNumber(nepaliDate.split(".")[0]) : nepaliDate.split(".")[0]}
            </h1>
            <h2 className="text-center">
              {isNepaliLanguage ? getWeekDayNepali(week_day) : getWeekDayEnglish(week_day)}
            </h2>
          </div>
          <div className=" events pl-3">
            <h3 className="text-sm">
              {englishMonth(Number(englishDate.split("-")[1])) +
                " " +
                englishDate.split("-")[2] +
                " " +
                englishDate.split("-")[0]}
            </h3>
            <h1 className="py-1">{eventsString}</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleEvent;
