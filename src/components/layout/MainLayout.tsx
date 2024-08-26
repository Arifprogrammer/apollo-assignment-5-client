import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] pt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
