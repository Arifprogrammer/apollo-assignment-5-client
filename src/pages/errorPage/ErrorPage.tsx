import { useNavigate, useRouteError } from "react-router-dom";
import errorPic from "../../assets/images/404.png";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-12 lg:gap-16 px-4 lg:px-0">
      <div id="error-page">
        <img src={errorPic} alt="" className="w-full" />
      </div>
      <button
        className="px-5 py-1 text-xl font-semibold bg-[#FCBF49] rounded-3xl text-black"
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </section>
  );
};

export default ErrorPage;
