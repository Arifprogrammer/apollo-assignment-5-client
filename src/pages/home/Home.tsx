/* import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hook";
import { Link } from "react-router-dom"; */

import room from "../../assets/images/room-banner-edited.webp";
import Services from "./services/Services";
import Lottie from "lottie-react";
import Testimonials from "./testimonials/Testimonials";
import calender from "../../assets/animation/calendar.json";
import payment from "../../assets/animation/digital-payment.json";
import select from "../../assets/steps/selection.webp";
import booking from "../../assets/steps/booking.webp";
import time from "../../assets/steps/time.webp";
import React from "react";
import { useGetRoomsQuery } from "../../redux/features/rooms/roomsApi";
import { TRoom } from "../../types";
import Room from "./room/Room";
import { Link } from "react-router-dom";

const cardData = [
  { image: select, title: "1. Select a Room" },
  { image: time, title: "2. Choose Date & Time" },
  { image: booking, title: "3. Confirm Booking" },
];

const Home = () => {
  const { isLoading, data } = useGetRoomsQuery({
    limit: 3,
    page: 1,
    searchTerm: "",
    sort: "",
  });
  const allRooms = data?.data as TRoom[];

  return (
    <main>
      {/* //* Hero */}
      <section className="pt-12 md:pt-24 bg-[#003049]">
        <div className="relative">
          <img src={room} alt="keyboard" className="size-full" />
          <div className="absolute z-10 inset-0 bg-[#002f497e]"></div>
          <div className="absolute z-20 text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-4/6 flex flex-col gap-y-2 md:gap-y-6 lg:gap-y-8">
            <h1 className="text-3xl md:text-5xl lg:text-8xl font-bold text-[#FCBF49]">
              Book Your Ideal{" "}
              <span className="text-[#EAE2B7]">Meeting Room</span> with Ease.
            </h1>
            <h4 className="text-sm md:text-xl lg:text-3xl font-semibold text-white">
              Efficient, hassle-free room booking for all your meeting needs.
            </h4>
            <Link to="/rooms" className="col-span-full w-fit mx-auto">
              <button className="btn bg-[#D62828] border-none text-white w-fit mx-auto font-bold">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* //* Services */}
      <h1 className="text-center text-2xl md:text-4xl text-[#003049] mt-24 mb-6 font-bold">
        Services
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-4 gap-6 mb-24 my-container">
        <Services />
      </section>

      {/* //* Featured Rooms */}
      <h1 className="text-center text-2xl md:text-4xl text-[#003049] mt-24 mb-6 font-bold">
        Featured Rooms
      </h1>
      {isLoading && (
        <div className="text-center">
          <span className="loading loading-bars loading-md"></span>
        </div>
      )}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 my-container">
        {allRooms &&
          allRooms.map((room) => {
            return (
              <React.Fragment key={room._id}>
                <Room room={room} />
              </React.Fragment>
            );
          })}
        <Link to="/rooms" className="col-span-full w-fit mx-auto">
          <button className="btn bg-[#D62828] text-white border-none px-20">
            See all
          </button>
        </Link>
      </section>

      {/* //* Why choose us */}
      <h1 className="text-center text-2xl md:text-4xl text-[#003049] mt-24 font-bold">
        Why Choose Us?
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 my-container">
        <div className="relative -mt-10">
          <Lottie
            animationData={calender}
            loop={true}
            style={{ height: 500 }}
          />
          <h1 className="text-xl md:text-3xl text-[#154f6e] font-bold absolute bottom-10 left-1/2 transform -translate-x-1/2 text-nowrap">
            Seamless Booking Experience
          </h1>
        </div>
        <div className="relative">
          <Lottie animationData={payment} loop={true} style={{ height: 500 }} />
          <h1 className="text-xl md:text-3xl text-[#154f6e] font-bold absolute bottom-10 left-1/2 transform -translate-x-1/2 text-nowrap">
            Secure Transactions
          </h1>
        </div>
      </section>

      {/* //* How It Works */}
      <h1 className="text-center text-2xl md:text-4xl text-[#003049] mt-24 mb-6 font-bold">
        How It Works
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 my-container">
        {cardData.map((card) => {
          return (
            <React.Fragment key={card.title}>
              <div className="card bg-[#154f6e] text-white font-semibold w-full overflow-hidden shadow-xl">
                <figure>
                  <img src={card.image} alt="select-room" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{card.title}</h2>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </section>

      {/* //*Testimonials */}
      <h1 className="text-center text-2xl md:text-4xl text-[#003049] mt-24 mb-6 font-bold">
        Reviews
      </h1>
      <section className="mb-24 bg-gray-100 rounded-lg my-container">
        <Testimonials />
      </section>
    </main>
  );
};

export default Home;
