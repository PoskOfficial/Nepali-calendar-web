import { Event } from "../config/db";
import { useState } from "react";
import { MapPinIcon, TrashIcon } from "@heroicons/react/20/solid";

type SetStateFunction = (newState: boolean) => void;

function EventPopupModel({
  setModalOpen,
  event,
  modalOpen,
}: {
  setModalOpen: SetStateFunction;
  event: Event;
  modalOpen: boolean;
}) {
  const [open, setOpen] = useState(modalOpen);
  if (!open) return <></>;
  return (
    <div className=" fixed inset-0   flex w-full items-end justify-center   ">
      <div
        onClick={() => {
          setOpen(false);
          setModalOpen(false);
        }}
        className="overlay top  absolute h-screen w-screen bg-black opacity-30 "></div>
      <div className="modal__content left-50% absolute  top-[40%] min-h-[200px] w-full rounded-lg bg-white px-2  pb-4 md:w-1/2 ">
        <div className="title  border-bordersubtle flex justify-between  border-y py-5 text-center">
          <h1 className="font-semibold">{event.summary}</h1>
          <TrashIcon onClick={() => setOpen(false)} className="flex h-6  w-6 items-end" />
        </div>
        <div className="event__details py-2">
          <h1 className="py-3">THis is a event description</h1>
          <div className="location flex w-full items-center gap-2">
            <MapPinIcon className="h-6 w-6" />
            <h1>Nepal</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventPopupModel;
