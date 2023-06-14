import { useState } from "react";
import plusicon from "../assets/icons8-plus-50.png";
import { db } from "../config/db";

function RemindersPopupModal({ date }: { date: string }) {
  console.log(date);
  const [openModel, setOpenModel] = useState(false);
  const [reminderTitle, setReminderTitle] = useState("");
  const [remindercolor, setremindercolor] = useState("#ffffff");
  console.log(remindercolor);
  if (!openModel)
    return (
      <img
        className="fixed  bottom-0 right-1 md:bottom-5 "
        onClick={() => setOpenModel(true)}
        src={plusicon}
      />
    );
  return (
    <div className="modal">
      <div
        onClick={() => setOpenModel(false)}
        className="overlay bg-modalbg fixed bottom-0 left-0 right-0 top-0 z-30 h-full  w-full opacity-60"></div>
      <div className=" modal_content absolute bottom-0 z-40 w-full rounded-t-lg border bg-white px-5 pb-8  text-gray-900 md:left-1/2  md:right-1/2   md:flex md:w-1/2 md:flex-col">
        <div className="modal-title border-bordersubtle  border-b py-6 text-center font-bold text-gray-900">
          Create a Reminder
        </div>
        <div className="modal-body">
          <form
            onSubmit={async () => {
              try {
                const id = await db.reminders.add({
                  date: date,
                  color: remindercolor,
                  title: reminderTitle,
                });
                console.log(id);
              } catch (err) {
                console.log(err);
              }
            }}>
            <div className="flex items-center gap-2">
              <h1 className="mb-2 mt-2 inline font-bold text-gray-800">Color </h1>
              <input
                className="bg-white "
                onChange={(e) => setremindercolor(e.target.value)}
                value={remindercolor}
                type="color"
              />
            </div>
            <h1 className="mb-2 mt-2 text-left font-bold text-gray-800">Title</h1>
            <input
              type="text"
              required
              onChange={(e) => setReminderTitle(e.target.value)}
              placeholder="New Reminder"
              className="h-[40px] w-full rounded-md bg-gray-200  px-2 text-gray-500 outline-none"
            />
            <div className="buttons  bottom-0 flex gap-2">
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
