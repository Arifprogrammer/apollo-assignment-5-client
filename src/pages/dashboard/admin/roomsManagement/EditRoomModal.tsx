/* eslint-disable no-prototype-builtins */
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  useCreateRoomMutation,
  useUpdateRoomMutation,
} from "../../../../redux/features/rooms/roomsApi";
import { TRoom } from "../../../../types";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import Swal from "sweetalert2";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { isArray, trim } from "radash";

interface EditRoomModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  specificRoom: TRoom;
}

export default function EditRoomModal({
  open,
  setOpen,
  specificRoom,
}: EditRoomModalProps) {
  const [updateRoom] = useUpdateRoomMutation();
  const [createRoom] = useCreateRoomMutation();

  const { name, pricePerSlot } = specificRoom;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (!isArray(data.images)) {
        data.images = data.images
          .split(",")
          .map((img: string) => trim(img))
          .filter((img: string) => !!img);
      } else {
        data.images = data.images
          .map((img: string) => trim(img))
          .filter((img: string) => !!img);
      }

      if (!isArray(data.amenities)) {
        data.amenities = data.amenities
          .split(",")
          .map((amenity: string) => trim(amenity))
          .filter((amenity: string) => !!amenity);
      } else {
        data.amenities = data.amenities
          .map((amenity: string) => trim(amenity))
          .filter((amenity: string) => !!amenity);
      }

      const mapData: TRoom = {
        ...data,
        images: data.images,
        amenities: data.amenities,
        capacity: Number(data.capacity),
        floorNo: Number(data.floorNo),
        roomNo: Number(data.roomNo),
        pricePerSlot: Number(data.pricePerSlot),
        name: data.name,
      };
      const res = data._id
        ? await updateRoom(mapData as TRoom).unwrap()
        : await createRoom(mapData as TRoom).unwrap();

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

  /* const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      image: { value: string };
      brand: { value: string };
      price: { value: string };
      rating: { value: string };
      availableQuantity: { value: string };
      description: { value: string };
    };

    const updatedRoom = {
      _id,
      name: target.name.value,
      // images: target.image.value,
      pricePerSlot: parseFloat(target.price.value),
    };

    const existingDataChange = isEqual(
      omit(specificRoom, ["createdAt", "updatedAt"]),
      updatedRoom
    );

    if (!existingDataChange) {
      if (updatedRoom._id) {
        const { data } = await updateRoom(updatedRoom).unwrap();

        if (Object.keys(data).length) {
          setOpen(false);
        }
      } else {
        const { data } = await createRoom(omit(updatedRoom, ["_id"]));
        if (Object.keys(data).length) {
          setOpen(false);
        }
      }
    }
  }; */

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
                  <PHForm onSubmit={onSubmit} defaultValues={specificRoom}>
                    <PHInput type="text" name="images" label="Images"></PHInput>
                    <small className="flex items-center gap-x-2 text-[#a14916]">
                      <IoMdInformationCircleOutline />{" "}
                      <span>Upload multiple image links by adding comma</span>
                    </small>
                    <PHInput type="text" name="name" label="Name"></PHInput>
                    <PHInput
                      type="number"
                      name="capacity"
                      label="Capacity"
                    ></PHInput>
                    <PHInput
                      type="number"
                      name="floorNo"
                      label="Floor No"
                    ></PHInput>
                    <PHInput
                      type="number"
                      name="roomNo"
                      label="Room No"
                    ></PHInput>
                    <PHInput
                      type="number"
                      name="pricePerSlot"
                      label="Price"
                    ></PHInput>
                    <PHInput
                      type="text"
                      name="amenities"
                      label="Amenities"
                    ></PHInput>
                    <small className="flex items-center gap-x-2 text-[#a14916]">
                      <IoMdInformationCircleOutline />{" "}
                      <span>separate amenities by adding comma</span>
                    </small>
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
                        {name && pricePerSlot ? "Update" : "Create"}
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
