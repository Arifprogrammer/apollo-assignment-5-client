import { useParams } from "react-router-dom";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useGetSlotsQuery } from "../../redux/features/slots/slotsApi";
import dayjs from "dayjs";
import { TSlot } from "../../types";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Booking = () => {
  const { id } = useParams();
  const [value, onChange] = useState<Value>(new Date());
  const [, /* selectedSlots */ setSelectedSlots] = useState<string[]>([]);
  const { data, error } = useGetSlotsQuery({
    date: dayjs(value as Date).format("YYYY-MM-DD"),
    roomId: id as string,
  });
  const slots = data?.data as TSlot[];

  const handleSelectedSlots = (slotId: string) => {
    setSelectedSlots((prev) => [...prev, slotId]);
  };

  return (
    <section className="min-h-screen  py-8 lg:py-20 px-4 md:px-8 lg:px-0 lg:w-1/2 lg:mx-auto text-black">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#154f6e]">
        Book A Slot
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <Calendar onChange={onChange} value={value} minDate={new Date()} />
        <div>
          {!error && (
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#154f6e]">
              Available Slots:
            </h1>
          )}
          {!error &&
            slots &&
            slots.map((slot) => (
              <div
                className="form-control"
                key={slot._id}
                onClick={() => handleSelectedSlots(slot._id)}
              >
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-warning"
                  />
                  <span className="label-text text-black text-xl font-semibold font-mono">
                    {slot.startTime} - {slot.endTime}
                  </span>
                </label>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Booking;
