import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { TbTimeDuration30 } from "react-icons/tb";
import { AiFillSchedule } from "react-icons/ai";
import { MdOutlineSupportAgent } from "react-icons/md";
import { SiThunderstore } from "react-icons/si";

const Services = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <div
        className=" py-8 px-4 lg:p-10 text-center space-y-4 rounded-lg bg-[#F77F00] shadow-lg"
        data-aos="fade-up"
        data-aos-delay="40"
        data-aos-duration="500"
      >
        <TbTimeDuration30 className="text-7xl mx-auto text-black" />
        <p className="font-bold text-xl md:text-3xl tracking-widest text-black">
          Real-Time Availability
        </p>
        <p className="text-[#003049] font-semibold">
          Check availability in real-time and book instantly. No more waiting
          for confirmations.
        </p>
      </div>
      <div
        className=" py-8 px-4 lg:p-10 text-center space-y-4 rounded-lg bg-[#F77F00] shadow-lg"
        data-aos="fade-up"
        data-aos-delay="60"
        data-aos-duration="1000"
      >
        <MdOutlineSupportAgent className="text-7xl mx-auto text-black" />
        <p className="font-bold text-xl md:text-3xl tracking-widest text-black">
          24/7 Support
        </p>
        <p className="text-[#003049] font-semibold">
          Need assistance? Our dedicated support team is available 24/7 to
          answer your questions and provide prompt solutions.
        </p>
      </div>
      <div
        className=" py-8 px-4 lg:p-10 text-center space-y-4 rounded-lg bg-[#F77F00] shadow-lg"
        data-aos="fade-up"
        data-aos-delay="80"
        data-aos-duration="1500"
      >
        <AiFillSchedule className="text-7xl mx-auto text-black" />
        <p className="font-bold text-xl md:text-3xl tracking-widest text-black">
          Flexible Scheduling
        </p>
        <p className="text-[#003049] font-semibold">
          Choose the time and date that works best for you. Our flexible
          scheduling options cater to your busy lifestyle.
        </p>
      </div>
      <div
        className=" py-8 px-4 lg:p-10 text-center space-y-4 rounded-lg bg-[#F77F00] shadow-lg"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="2000"
      >
        <SiThunderstore className="text-7xl mx-auto text-black" />
        <p className="font-bold text-xl md:text-3xl tracking-widest text-black">
          Instant Booking Confirmation
        </p>
        <p className="text-[#003049] font-semibold">
          Get immediate booking confirmation. Your reservation is secured as
          soon as you complete the process.
        </p>
      </div>
    </>
  );
};

export default Services;
