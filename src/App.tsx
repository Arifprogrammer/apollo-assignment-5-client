import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

function App() {
  //* hooks
  const { pathname } = useLocation();

  //* effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <MainLayout />
    </>
  );
}

export default App;
