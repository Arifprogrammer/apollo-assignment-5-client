import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useGetSlotsQuery } from "../../redux/features/slots/slotsApi";
import dayjs from "dayjs";
import { TSlot } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  deleteSlot,
  getAllSelectedSlots,
  setSelectedSlots,
} from "../../redux/features/slots/slotSlice";
import { SubmitHandler, FieldValues } from "react-hook-form";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Booking = () => {
  const { id } = useParams();
  const [value, onChange] = useState<Value>(new Date());
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const selectedSlots = useAppSelector(getAllSelectedSlots);
  const selectedSlotIds = selectedSlots.map((selectedSlot) => selectedSlot.id);
  const { data, error } = useGetSlotsQuery({
    date: dayjs(value as Date).format("YYYY-MM-DD"),
    roomId: id as string,
  });
  const slots = data?.data as TSlot[];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  const handleSelectedSlots = (slot: TSlot) => {
    const isExist = selectedSlots.some(
      (setSelectedSlot) => setSelectedSlot.id === slot._id
    );

    if (isExist) {
      dispatch(deleteSlot(slot._id!));
      return;
    }

    dispatch(
      setSelectedSlots({
        id: slot._id!,
        time: `${slot.startTime}-${slot.endTime}`,
      })
    );
  };

  return (
    <section className="min-h-screen  py-8 lg:py-20 px-4 md:px-8 lg:px-0 lg:w-1/2 lg:mx-auto text-black flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#154f6e]">
        Book A Slot
      </h1>
      <div className="flex flex-col md:flex-row gap-6 w-fit">
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
              <div className="form-control" key={slot._id}>
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    defaultChecked={selectedSlotIds.includes(slot._id!)}
                    onChange={() => handleSelectedSlots(slot)}
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
      <div className="card w-80 md:w-[35rem] shrink-0 shadow-2xl text-black p-4 md:p-6 border-2 border-[#154f6e] mt-6">
        <PHForm
          onSubmit={onSubmit}
          defaultValues={{ email: user?.email, name: user?.name }}
        >
          <PHInput
            type="text"
            name="name"
            label="Name"
            disabled={true}
          ></PHInput>
          <PHInput
            type="email"
            name="email"
            label="Email"
            disabled={true}
          ></PHInput>
          <Link
            to={`/rooms/payment?roomId=${id}&date=${dayjs(value as Date).format(
              "YYYY-MM-DD"
            )}`}
            className="w-full"
          >
            <button
              type="submit"
              disabled={!selectedSlots.length}
              className="btn bg-[#D62828] border-none text-white mx-auto font-bold mt-4"
            >
              Checkout
            </button>
          </Link>
        </PHForm>
      </div>
    </section>
  );
};

export default Booking;
