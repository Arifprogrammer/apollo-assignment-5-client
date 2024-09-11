import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { FaCircleArrowUp } from "react-icons/fa6";

const MainLayout = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] pt-16">
        <Outlet />
      </main>
      <Footer />
      {isVisible && (
        <div
          className="fixed bottom-8 right-8 text-3xl text-[#F77F00] z-50 cursor-pointer transition-opacity duration-300 opacity-70 hover:opacity-100"
          onClick={scrollToTop}
        >
          <FaCircleArrowUp className="animate-bounce" />
        </div>
      )}
    </>
  );
};

export default MainLayout;
