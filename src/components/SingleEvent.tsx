import { getNepaliMonth, getWeekDayNepali } from "../helper/dates";
import englishMonth from "../helper/englishMonth";
import nepaliNumber from "../helper/nepaliNumber";
import { Event } from "../types";
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
  const nepaliEvents = events.map((event) => event?.jds?.ne);
  const eventsString: string = nepaliEvents.join(" / ");
  return (
    <div>
      {eventsString.length > 0 && (
        <div className="border-bordersubtle flex max-w-[600px] border py-3 pl-1 font-mukta">
          <div className="date_info border-bordersubtle min-w-max max-w-[160px] border-r pr-2">
            <h2>
              {getNepaliMonth(parseInt(nepaliDate.split(".")[1])) +
                " " +
                nepaliNumber(nepaliDate.split(".")[2])}
            </h2>
            <h1 className="text-center font-semibold">{nepaliNumber(nepaliDate.split(".")[0])}</h1>
            <h2 className="text-center">{getWeekDayNepali(week_day)}</h2>
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
