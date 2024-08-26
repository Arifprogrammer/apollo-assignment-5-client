import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <section className="text-black px-6 md:px-0 w-full md:w-1/2 mx-auto my-16 md:my-24 flex flex-col gap-4 items-center text-center">
      <p className="md:w-3/4 text-justify">
        <strong>Keystroke</strong> is your one-stop shop for all things
        mechanical keyboards. We're passionate about the distinct click-clack
        symphony and the unparalleled typing experience that mechanical
        keyboards offer. Founded in [Year], we started our journey to bring the
        joy of customizable and high-performance keyboards to everyone. <br />
        <br /> Our team consists of experienced keyboard enthusiasts who
        understand the nuances of different switches, keycaps, and layouts. We
        curate a diverse selection of keyboards catering to various needs,
        whether you're a gamer seeking lightning-fast response times, a writer
        desiring a comfortable typing experience, or an enthusiast looking for a
        unique, custom-built masterpiece.
      </p>
      <Link to="/">
        <h1 className="text-5xl font-semibold">
          Key<span className="italic text-rose-500">stroke</span>
        </h1>
      </Link>
      <h1
        className="text-3xl font-semibold italic text-rose-400 md:w-3/4 pt-4"
        data-aos="fade-left"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        "Explore our collection and discover the perfect keyboard for you
        today!"
      </h1>
    </section>
  );
};

export default About;
