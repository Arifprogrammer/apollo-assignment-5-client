import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

function App() {
  //* hooks
  const { pathname } = useLocation();

  //* effects
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <>
      <MainLayout />
    </>
  );
}

export default App;
