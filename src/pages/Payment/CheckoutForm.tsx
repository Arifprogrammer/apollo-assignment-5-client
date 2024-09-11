import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { TBooking, TRoom, TSlot } from "../../types";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  useCreateBookingMutation,
  useCreatePaymentIntentMutation,
} from "../../redux/features/bookings/bookingsApi";
import {
  getAllSelectedSlots,
  resetSlotsId,
} from "../../redux/features/slots/slotSlice";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { SubmitHandler, FieldValues } from "react-hook-form";
import Modal from "../../components/ui/modal/Modal";
import { useNavigate } from "react-router-dom";

type CheckoutFormProps = {
  room: TRoom;
  date: string;
};

const CheckoutForm = ({ room, date }: CheckoutFormProps) => {
  //* react hooks
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [booking, setBooking] = useState<TBooking | null>(null);
  const [process, setProcess] = useState(false);
  const [open, setOpen] = useState(true);
  //* third-party hooks
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  //* redux hooks
  const user = useAppSelector(selectCurrentUser);
  const selectedSlots = useAppSelector(getAllSelectedSlots);
  const selectedSlotIds = selectedSlots.map((selectedSlot) => selectedSlot.id);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [createBooking] = useCreateBookingMutation();
  const dispatch = useAppDispatch();
  //* variables
  const price = room.pricePerSlot;

  //* functions
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  //* effects
  useEffect(() => {
    if (booking && !open) navigate("/dashboard/my-bookings");
  }, [booking, open, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message!);
      return;
    } else {
      setError("");
    }
    setProcess(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
      setError(confirmError.message!);
      setProcess(false);
      return;
    }
    console.log("Payment intent-----------------", paymentIntent);
    if (paymentIntent.status === "succeeded") {
      const payment = {
        slots: selectedSlotIds,
        user: user?.id,
        transactionId: paymentIntent.id,
        room: room._id,
        date: date,
      };
      const addData = async () => {
        const data = await createBooking(payment);
        setBooking(data.data.data);
        setProcess(false);
        dispatch(resetSlotsId());
      };
      addData();
    }
  };

  //* Effects
  useEffect(() => {
    const handleCreatePaymentIntent = async () => {
      if (price > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await createPaymentIntent(
          selectedSlots.length * price
        );
        setClientSecret(data?.data?.clientSecret);
      }
    };

    handleCreatePaymentIntent();
  }, [price, createPaymentIntent, selectedSlots.length]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return "Are you sure you want to leave? Your data may be lost.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <>
      <section className="min-h-screen  py-8 lg:py-20 px-4 md:px-8 lg:px-0 lg:w-1/2 lg:mx-auto text-black flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#167eb6] mb-6">
          Please Proceed Your Payment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 mx-auto space-y-4 border-2 border-[#003049] p-4 rounded-md"
        >
          <div className="space-y-1 text-lg font-semibold">
            <p>Room Name: {room.name}</p>
            <p>Date: {date}</p>
            <p>Slots: {selectedSlots.length}</p>
            <p>
              Time:{" "}
              {selectedSlots.map((selectedSlot) => (
                <span key={selectedSlot.id}>{selectedSlot.time}, </span>
              ))}
            </p>
            <p>
              Price:{" "}
              <span className="text-xl text-[#167eb6] font-bold">
                ${selectedSlots.length * room.pricePerSlot}
              </span>
            </p>
          </div>
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
          </PHForm>
          <div className="border-2 border-[#003049] p-2 rounded-md">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#4B5563",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={
                !stripe || process || !clientSecret || !selectedSlots.length
              }
              className={`font-semibold border-b-4 border-[#003049] px-6 py-1 rounded-md bg-[#167eb6] text-white ${
                process
                  ? "bg-[#167eb6] border-[#167eb6] text-gray-600"
                  : "   hover:bg-[#003049] hover:text-white lg:transition lg:duration-200"
              }`}
            >
              Confirm
            </button>
          </div>
        </form>
        <p className="text-red-600 mt-2 text-center font-semibold text-lg">
          {error && error}
        </p>
        <p className="text-[#003049] mt-2 text-center font-semibold text-lg">
          {process && "please wait..."}
        </p>
      </section>
      {booking && (
        <Modal open={open} setOpen={setOpen}>
          <h1 className="text-3xl font-bold text-center text-[#154f6e] mb-2">
            Payment Successful. Thank You!!!
          </h1>
          <p className="font-bold text-xl">Booking Info:</p>
          <p>Name: {user?.name}</p>
          <p>Room Name: {room?.name}</p>
          <p>Transaction Id: {booking.transactionId}</p>
          <p>Total amount: {booking.totalAmount}</p>
          <p>Date: {booking.date}</p>
          <p>
            Time:{" "}
            {(booking.slots as TSlot[]).map((slot) => (
              <span key={slot._id}>
                {slot.startTime} - {slot.endTime},{" "}
              </span>
            ))}
          </p>
        </Modal>
      )}
    </>
  );
};

export default CheckoutForm;
