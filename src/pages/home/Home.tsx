/* import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hook";
import { Link } from "react-router-dom"; */

import room from "../../assets/images/room-banner-edited.webp";
import Services from "./services/Services";
import Lottie from "lottie-react";
import calender from "../../assets/animation/calendar.json";
import payment from "../../assets/animation/digital-payment.json";

const Home = () => {
  /* const { isLoading, refetch } = useGetProductsQuery(3);
  const { products } = useAppSelector(getAllProducts); */

  //* effects
  /* useEffect(() => {
    refetch();
  }, [refetch]); */
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
            <button className="btn bg-[#003049] border-none text-white w-fit mx-auto">
              Book Now
            </button>
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
      {/*  <h1 className="text-center text-2xl md:text-4xl text-[#003049] mt-24 mb-6 font-bold">
        Featured Rooms
      </h1>
      {isLoading && (
        <div className="text-center">
          <span className="loading loading-bars loading-md"></span>
        </div>
      )}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 my-container">
        {products &&
          products.map((product) => {
            return (
              <React.Fragment key={product._id}>
                <Product product={product} />
              </React.Fragment>
            );
          })}
        <Link to="/rooms" className="col-span-full w-fit mx-auto">
          <button className="btn bg-rose-500 text-white border-none px-20">
            See all
          </button>
        </Link>
      </section> */}

      {/* //* Why choose us */}
      <h1 className="text-center text-2xl md:text-4xl text-[#003049] mt-24 font-bold">
        Why Choose Us
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 my-container">
        <div className="relative">
          <Lottie
            animationData={calender}
            loop={true}
            style={{ height: 500 }}
          />
          <h1 className="text-3xl text-[#154f6e] font-semibold absolute bottom-10 left-1/2 transform -translate-x-1/2 text-nowrap">
            Seamless Booking Experience
          </h1>
        </div>
        <div className="relative">
          <Lottie animationData={payment} loop={true} style={{ height: 500 }} />
          <h1 className="text-3xl text-[#154f6e] font-semibold absolute bottom-10 left-1/2 transform -translate-x-1/2 text-nowrap">
            Secure Transactions
          </h1>
        </div>
      </section>
    </main>
  );
};

export default Home;
