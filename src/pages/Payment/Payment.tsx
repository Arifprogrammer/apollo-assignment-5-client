import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { useGetSingleRoomsQuery } from "../../redux/features/rooms/roomsApi";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  //* hooks
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const date = searchParams.get("date");
  const { isLoading, data, error } = useGetSingleRoomsQuery(roomId!);
  const room = data?.data;

  return (
    <>
      {isLoading && (
        <div className="text-center">
          <span className="loading loading-bars loading-md"></span>
        </div>
      )}
      {!isLoading && !error && (
        <Elements stripe={stripePromise}>
          <CheckoutForm room={room} date={date!} />
        </Elements>
      )}
    </>
  );
};

export default Payment;
