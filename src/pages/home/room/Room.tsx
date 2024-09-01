import { Link } from "react-router-dom";
import { TRoom } from "../../../types";

const Room = ({ room }: { room: TRoom }) => {
  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl font-semibold">
        <figure className="h-[256px] w-full overflow-hidden">
          <img
            src={room.images[0]}
            alt="keyboard"
            className="h-full w-full object-cover object-center lg:hover:scale-125 lg:transition lg:duration-300"
          />
        </figure>
        <div className="card-body grow bg-rose-200 text-slate-700">
          <h2 className="card-title text-xl">
            {room.name}
            <div className="badge bg-rose-500 border-none text-black">NEW</div>
          </h2>
          <p className="text-slate-600">Capacity: {room.capacity}</p>
          <p className="font-bold">Price: ${room.pricePerSlot}</p>
        </div>
        <div className="card-actions w-full">
          <Link to={`/products/${room._id}`} className="w-full">
            <button className="btn bg-black w-full !rounded-none !rounded-b-2xl text-white">
              Details
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Room;
