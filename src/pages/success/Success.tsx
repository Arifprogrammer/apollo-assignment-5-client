import { TiTick } from "react-icons/ti";

const Success = () => {
  return (
    <div className="my-container my-24 flex flex-col items-center gap-4 text-center px-4 md:px-0">
      <TiTick className="text-green-600 text-6xl" />
      <h1 className="font-bold text-3xl text-black">
        You've made a successful order!!!
      </h1>
    </div>
  );
};

export default Success;
