import { useState } from "react";
import { db } from "../config/db";
import { PlusIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon, MapPinIcon, Bars3BottomLeftIcon, SwatchIcon } from "@heroicons/react/24/outline";
import colors from "../constants/colors";

function RemindersPopupModal({ date }: { date: string }) {
  const [openModel, setOpenModel] = useState(false);
  if (!openModel)
    return (
      <button
        className="shadowfocus:outline-none fixed bottom-2 right-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-indigo-600  text-white md:bottom-5"
        onClick={() => setOpenModel(true)}>
        <PlusIcon className="m-3" />
      </button>
    );
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const id = await db.reminders.add({
        date,
        colorId: "",
        summary: "",
        location: "",
        description: "",
        start: {
          date: date,
        },
      });
      setOpenModel(false);
      if (!id) throw new Error("Something went wrong");
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
              {/* <div className="my-2 flex w-full items-center gap-2">
                <CalendarDaysIcon className="h-6 w-6" />
                <input
                  type="date"
                  name="date"
                  className="w-full flex-1 rounded-lg border px-4 py-1 outline-none focus:outline-blue-600 "
                  placeholder="date"
                />
              </div> */}
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
                        type="radio"
                        name="color"
                        value={idx}
                        style={{
                          backgroundColor: colors[color],
                        }}
                        className={`m-1 h-6 w-6 appearance-none rounded-full border border-gray-300 shadow-sm outline-none focus:outline-blue-600`}
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
                className="mt-8 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
