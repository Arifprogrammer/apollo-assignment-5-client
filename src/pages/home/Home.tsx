import room from "../../assets/images/room-banner-edited.webp";
import Services from "./services/Services";

const Home = () => {
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
    </main>
  );
};

export default Home;
