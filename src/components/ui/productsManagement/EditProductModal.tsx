/* eslint-disable no-prototype-builtins */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { InputField } from "../../form/InputField";
import { isEqual, omit } from "radash";
import {
  useCreateProductMutation,
  useUpdateSingleProductMutation,
} from "../../../redux/features/products/productsApi";
import { TProduct } from "../../../types";

interface EditProductModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  specificProduct: TProduct;
}

export default function EditProductModal({
  open,
  setOpen,
  specificProduct,
}: EditProductModalProps) {
  const [updateProduct] = useUpdateSingleProductMutation();
  const [createProduct] = useCreateProductMutation();

  const {
    _id,
    availableQuantity,
    image,
    brand,
    price,
    rating,
    name,
    description,
  } = specificProduct;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    const updatedProduct = {
      _id,
      name: target.name.value,
      image: target.image.value,
      brand: target.brand.value,
      price: parseFloat(target.price.value),
      rating: parseFloat(target.rating.value),
      availableQuantity: parseFloat(target.availableQuantity.value),
      description: target.description.value,
    };

    const existingDataChange = isEqual(
      omit(specificProduct, ["orderQuantity", "createdAt", "updatedAt"]),
      updatedProduct
    );

    if (!existingDataChange) {
      if (updatedProduct._id) {
        const { data } = await updateProduct(updatedProduct).unwrap();

        if (Object.keys(data).length) {
          setOpen(false);
        }
      } else {
        const { data } = await createProduct(omit(updatedProduct, ["_id"]));
        if (Object.keys(data).length) {
          setOpen(false);
        }
      }
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
                <div className="md:px-4 md:pb-4 pt-5 sm:p-6 sm:pb-4">
                  <form
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
                        {name && price ? "Update" : "Create"}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
