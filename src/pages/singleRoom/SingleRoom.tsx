import { useParams } from "react-router-dom";
import { useGetSingleRoomsQuery } from "../../redux/features/rooms/roomsApi";
import { TRoom } from "../../types";

const SingleRoom = () => {
  const { id } = useParams();
  const { data } = useGetSingleRoomsQuery(id!);
  const room = data?.data as TRoom;

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
            <div className="flex flex-col md:flex-row gap-x-6 gap-y-10">
              {room.images.map(
                (image, i) =>
                  i !== 0 && (
                    <img
                      key={i}
                      src={image}
                      alt=""
                      className="rounded-2xl shadow-lg md:shadow-md shadow-rose-600"
                    />
                  )
              )}
            </div>
            <div className="divide-y-2 space-y-4 text-slate-700">
              <div>
                <h2 className="card-title text-2xl text-black">
                  {room.name}
                  <div className="badge bg-rose-300 border-none text-black">
                    NEW
                  </div>
                </h2>
              </div>
              <div>
                <p className="text-slate-600">Capacity: {room.capacity}</p>
                <p className="text-slate-600">Room No: {room.roomNo}</p>
                <p className="text-slate-600">Floor No: {room.floorNo}</p>
                Amenities:{" "}
                {room.amenities.map((amenity) => (
                  <span key={amenity}>{amenity}, </span>
                ))}
              </div>
              <div>
                <p className="font-bold text-lg">Price: ${room.pricePerSlot}</p>
                <button className="btn bg-[#D62828] border-none text-white w-fit font-bold mt-4">
                  Book Now
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
