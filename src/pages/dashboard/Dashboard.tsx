import { FaAnglesRight } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content overflow-x-auto w-full px-4 md:px-12 lg:px-20 py-12">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn border-rose-500 text-rose-500 bg-white absolute top-2 left-2 drawer-button lg:hidden"
          >
            <FaAnglesRight />
          </label>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu px-4 min-h-full bg-slate-900 max-w-48 md:!max-w-64 w-full text-base-content space-y-6 flex flex-col justify-center">
            {/* Sidebar content here */}
            <li>
              <Link
                to="/"
                className="font-semibold border-b-4 border-b-white hover:border-b-rose-500 text-white hover:text-rose-500 lg:transition lg:duration-200 text-sm lg:text-lg"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="text-nowrap font-semibold border-b-4 border-b-white hover:border-b-rose-500 text-white hover:text-rose-500 lg:transition lg:duration-200 text-sm lg:text-lg"
              >
                Product Management
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
