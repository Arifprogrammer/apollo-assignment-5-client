/* eslint-disable no-prototype-builtins */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { InputField } from "../../form/InputField";
import { isEqual, omit } from "radash";
import {
  useCreateRoomMutation,
  useUpdateRoomMutation,
} from "../../../redux/features/rooms/roomsApi";
import { TRoom } from "../../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { registrationSchema } from "../../../schemas/auth.schema";
import PHForm from "../../form/PHForm";
import PHInput from "../../form/PHInput";
import Swal from "sweetalert2";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { register } from "swiper/element";

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
      const res = await updateRoom(data as TRoom).unwrap();

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
        title: `${err.data.errorMessages[0].message}`,
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
                <div className="md:px-4 md:pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="card-body p-5 md:p-8 gap-x-6 md:grid md:grid-cols-2 shadow-2xl text-black border-2 border-[#154f6e]">
                    <PHForm
                      onSubmit={onSubmit}
                      defaultValues={specificRoom}
                      // resolver={zodResolver(registrationSchema)}
                    >
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
                  {/* <form
                    className="card-body p-5 md:p-8 gap-x-6 md:grid md:grid-cols-2"
                    onSubmit={onSubmit}
                  >
                    <InputField
                      label="Name"
                      name="name"
                      id="name"
                      type="text"
                      defaultValue={name}
                      required
                    />
                    <InputField
                      label="Image Url"
                      id="url"
                      name="image"
                      type="url"
                      defaultValue={image}
                      required
                    />
                    <InputField
                      label="Brand"
                      id="brand"
                      name="brand"
                      type="text"
                      defaultValue={brand}
                      required
                    />
                    <InputField
                      label="Price"
                      id="price"
                      name="price"
                      defaultValue={price}
                      type="number"
                      required
                    />
                    <InputField
                      label="Rating"
                      id="rating"
                      name="rating"
                      defaultValue={rating}
                      type="number"
                      required
                    />
                    <InputField
                      label="Quantity"
                      id="quantity"
                      name="availableQuantity"
                      defaultValue={availableQuantity}
                      type="number"
                      required
                    />
                    <div className="form-control col-span-2">
                      <label className="label">
                        <span className="label-text text-black font-semibold text-base">
                          Description*
                        </span>
                      </label>
                      <textarea
                        name="description"
                        className="textarea textarea-bordered text-black font-semibold h-32 rounded-md bg-white"
                        defaultValue={description ? description : ""}
                      ></textarea>
                    </div>
                    <div className="hidden lg:block"></div>
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
                  </form> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
