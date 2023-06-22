import { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon, MapPinIcon, Bars3BottomLeftIcon, SwatchIcon } from "@heroicons/react/24/outline";
import colors from "../constants/colors";
import { Switch } from "@headlessui/react";
import NepaliDatePicker from "./NepaliDatePicker";

function getCombinedDateTime(date: Date, time: string) {
  const timeParts = time.split(":");
  date.setHours(parseInt(timeParts[0], 10));
  console.log(timeParts);
  console.log("hours combined:", date.toLocaleString());
  date.setMinutes(parseInt(timeParts[1], 10));
  console.log("minutes combined", date);
  return date.toISOString();
}

function RemindersPopupModal({ startDate }: { startDate: Date }) {
  const [openModel, setOpenModel] = useState(false);
  const [isAllDayEvent, setIsAllDayEvent] = useState(false);
  const [eventStartDate, setEventStartDate] = useState(startDate);
  const [eventEndDate, setEventEndDate] = useState(new Date(startDate.getTime() + 24 * 60 * 60 * 1000));
  const [isLoading, setIsLoading] = useState(false);
  if (!openModel)
    return (
      <button
        className="shadowfocus:outline-none fixed bottom-2 right-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-indigo-600  text-white md:bottom-5"
        onClick={() => setOpenModel(true)}>
        <PlusIcon className="m-3" />
      </button>
    );
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    const endTime = e.currentTarget.endTime.value;
    const startTime = e.currentTarget.startTime.value;
    const startEndDates = isAllDayEvent
      ? {
          start: { date: eventStartDate.toISOString().split("T")[0] },
          end: { date: eventEndDate.toISOString().split("T")[0] },
        }
      : {
          start: { dateTime: getCombinedDateTime(startDate, startTime) },
          end: { dateTime: getCombinedDateTime(eventEndDate, endTime) },
        };

    e.preventDefault();
    try {
      const event = await fetch(`/api/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...startEndDates,
          summary: e.currentTarget.summary.value,
          location: e.currentTarget.location.value,
          description: e.currentTarget.description.value,
          colorId: e.currentTarget.colorId.value || null,
        }),
      }).then((res) => {
        return res.json();
      });
      setIsLoading(false);
      console.log({ event });
      // const id = await db.reminders.add({
      //   date,
      //   colorId: "",
      //   summary: "",
      //   location: "",
      //   description: "",
      //   start: {
      //     date: date,
      //   },
      // });
      setOpenModel(false);
      // if (!id) throw new Error("Something went wrong");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-end bg-gray-900/50 md:items-center md:justify-center ">
      <div className="flex-end w-full rounded-t-lg bg-white px-4 pb-4 md:w-2/3 md:rounded-b-lg lg:w-2/4">
        <div className="border-b py-6 text-center font-bold text-gray-900">Create a Reminder</div>
        <div className="modal-body">
          <form onSubmit={handelSubmit}>
            <div className="py-4">
              <div className="my-2 flex w-full items-center gap-2">
                <span className="font-sans">All day</span>
                <Switch
                  checked={isAllDayEvent}
                  onChange={() => {
                    setIsAllDayEvent(!isAllDayEvent);
                    setEventStartDate(new Date(eventStartDate));
                    setEventEndDate(new Date(eventEndDate));
                  }}
                  className={`${
                    isAllDayEvent ? "bg-indigo-600" : "bg-gray-200"
                  }  inline-flex h-6 w-11 items-center rounded-full transition-all duration-100 ease-linear`}>
                  <span className="sr-only">toggle all day event</span>
                  <span
                    className={`${
                      isAllDayEvent ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white`}
                  />
                </Switch>
              </div>
              {/* <div className="my-2 flex w-full items-center gap-2">
                <span className="font-sans">From: </span>
                <input
                  type={isAllDayEvent ? "date" : "datetime-local"}
                  name="location"
                  className="w-full flex-1 rounded-lg border px-2 py-1 outline-none focus:outline-blue-600 "
                  placeholder="location"
                  value={
                    isAllDayEvent
                      ? new Date(eventStartDate).toISOString().split("T")[0]
                      : new Date(eventStartDate).toISOString().substring(0, 16)
                  }
                  onChange={(e) => setEventStartDate(new Date(e.target.value))}
                />
              </div>
              <div className="my-2 flex w-full items-center gap-2">
                <span className="font-sans">To:</span>
                <input
                  type={isAllDayEvent ? "date" : "datetime-local"}
                  name="location"
                  className="w-full flex-1 rounded-lg border px-2 py-1 outline-none focus:outline-blue-600 "
                  placeholder="location"
                  value={
                    isAllDayEvent
                      ? new Date(eventEndDate).toISOString().split("T")[0]
                      : new Date(eventEndDate).toISOString().substring(0, 16)
                  }
                  onChange={(e) => setEventEndDate(new Date(e.target.value))}
                />
              </div> */}
              <div className="my-2 flex w-full items-center gap-2">
                <span>From: </span>
                <NepaliDatePicker setDate={setEventStartDate} />
                {!isAllDayEvent && <input type="time" name="startTime" className="rounded-lg border p-1 " />}
              </div>
              <div className="my-2 flex w-full items-center gap-2">
                <span>To:</span>
                <NepaliDatePicker setDate={setEventEndDate} />
                {!isAllDayEvent && <input type="time" name="endTime" className="rounded-lg border p-1" />}
              </div>
              <div className="my-2 flex w-full items-center gap-2">
                <PencilSquareIcon className="h-6 w-6" />
                <input
                  type="text"
                  name="summary"
                  className="w-full flex-1 rounded-lg border px-2 py-1 outline-none focus:outline-blue-600 "
                  placeholder="summary"
                />
              </div>
              <div className="my-2 flex w-full items-center gap-2">
                <MapPinIcon className="h-6 w-6" />
                <input
                  type="text"
                  name="location"
                  className="w-full flex-1 rounded-lg border px-2 py-1 outline-none focus:outline-blue-600 "
                  placeholder="location"
                />
              </div>
              <div className="my-2 flex w-full items-start gap-2">
                <Bars3BottomLeftIcon className="h-6 w-6" />
                <textarea
                  name="description"
                  className="w-full flex-1 resize-none rounded-lg border px-2 py-1 outline-none focus:outline-blue-600 "
                  placeholder="description"
                />
              </div>
              <div className="my-2 flex w-full items-start gap-2">
                <SwatchIcon className="h-6 w-6" />
                <div className="flex flex-wrap">
                  {Object.keys(colors).map((color, idx) => {
                    return (
                      <input
                        key={idx}
                        type="radio"
                        name="colorId"
                        value={color}
                        style={{
                          backgroundColor: colors[color],
                        }}
                        className={`m-1 h-6 w-6 cursor-pointer appearance-none rounded-full border border-gray-300 shadow-sm outline-none focus:outline-blue-600`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex gap-4 ">
              <button
                className="shadowfocus:outline-none mt-8
                w-full rounded-md border border-indigo-600 border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-indigo-600  focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  "
                onClick={() => setOpenModel(false)}>
                Close
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="mt-8 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-progress disabled:bg-indigo-400">
                Add reminder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RemindersPopupModal;
