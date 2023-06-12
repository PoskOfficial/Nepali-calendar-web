import { Event } from "../interface/interfaces";
import nepaliDayOfWeek from "../utility/nepaliDayOfWeek";
import nepaliMonth from "../utility/nepaliMonth";
import nepaliNumber from "../utility/nepaliNumber";
import englishMonth from "../utility/englishMonth";
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
  const nepaliEvents = events.map((event: Event) => event.jds?.ne);
  const eventsString: string = nepaliEvents.join(" / ");
  return (
    <div>
      {eventsString.length > 0 && (
        <div className="max-w-[600px] font-mukta flex border-bordersubtle border py-3 pl-1">
          <div className="date_info min-w-max max-w-[160px] pr-2 border-bordersubtle border-r">
            <h2>
              {nepaliMonth(nepaliDate.split(".")[1]) +
                " " +
                nepaliNumber(nepaliDate.split(".")[2])}
            </h2>
            <h1 className="text-center font-semibold">
              {nepaliNumber(nepaliDate.split(".")[0])}
            </h1>
            <h2 className="text-center">{nepaliDayOfWeek(week_day)}</h2>
          </div>
          <div className=" pl-3 events">
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
