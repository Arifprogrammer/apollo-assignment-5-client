/* eslint-disable no-prototype-builtins */
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TRoom, TSlot } from "../../../../types";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import Swal from "sweetalert2";
import { SubmitHandler, FieldValues } from "react-hook-form";
import {
  useCreateSlotMutation,
  useUpdateSlotMutation,
} from "../../../../redux/features/slots/slotsApi";
import { shake } from "radash";

interface EditSlotModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  specificSlot: TSlot;
}

export default function EditSlotModal({
  open,
  setOpen,
  specificSlot,
}: EditSlotModalProps) {
  const [updateSlot] = useUpdateSlotMutation();
  const [createSlot] = useCreateSlotMutation();

  const { _id } = specificSlot;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const mapData: TSlot = {
        _id: specificSlot._id,
        date: specificSlot.date,
        room: (specificSlot.room as TRoom)._id!,
        startTime: data.startTime,
        endTime: data.endTime,
      };
      const res = data._id
        ? await updateSlot(mapData as TSlot).unwrap()
        : await createSlot(shake(mapData) as TSlot).unwrap();

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: `${res.message}`,
      });

      setOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: `${err?.data?.errorMessages[0]?.message}`,
      });
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-black text-left shadow-xl transition-all sm:my-8 w-11/12 lg:w-[800px]">
                <div className="card-body p-5 md:p-8 gap-x-6 shadow-2xl text-black">
                  <PHForm onSubmit={onSubmit} defaultValues={specificSlot}>
                    <PHInput type="text" name="startTime" label="Start Time" />
                    <PHInput type="text" name="endTime" label="End Time" />
                    <div className="flex gap-2 mt-2 ml-auto">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="inline-flex justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-blue-900 shadow-sm hover:bg-gray-400 hover:text-black sm:ml-3 sm:w-auto gap-x-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-lime-400 px-3 py-2 text-sm font-semibold text-blue-900 shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto gap-x-2"
                      >
                        {_id ? "Update" : "Create"}
                      </button>
                    </div>
                  </PHForm>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
