import { useParams } from "react-router-dom";
import { getAllRooms } from "../../redux/features/rooms/roomSlice";
import { useAppSelector } from "../../redux/hook";

const SingleRoom = () => {
  const { id } = useParams();
  const { rooms } = useAppSelector(getAllRooms);
  const room = rooms.find((room) => room._id === id);

  return (
    <section className="min-h-screen  py-8 lg:py-20 px-4 md:px-8 lg:px-0 lg:w-1/2 lg:mx-auto">
      {room && (
        <>
          <div className="grid grid-cols-1 gap-y-10 font-semibold">
            <div>
              <img
                src={room.images[0]}
                alt=""
                className="rounded-2xl shadow-lg shadow-rose-600"
              />
            </div>
            <div className="divide-y-2 space-y-4 text-slate-700">
              <div>
                {/* <p className="text-slate-600">{room.brand}</p> */}
                <h2 className="card-title text-2xl text-black">
                  {room.name}
                  <div className="badge bg-rose-300 border-none text-black">
                    NEW
                  </div>
                </h2>
              </div>
              {/* <p className="pt-4">{room.description}</p> */}
              <div>
                {/* <p className="text-gray-600">
                  {room.availableQuantity
                    ? `Remaining items: ${room.availableQuantity}`
                    : "Out of stock"}
                </p> */}
                <p className="font-bold text-lg">${room.pricePerSlot}</p>
                <button className="btn bg-black text-white mt-4">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default SingleRoom;
