import { FaAnglesRight } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const userMenus = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/dashboard/my-bookings",
    name: "Bookings Management",
  },
];

const adminMenus = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/dashboard/rooms",
    name: "Rooms Management",
  },
  {
    path: "/dashboard/slots",
    name: "Slots Management",
  },
  {
    path: "/dashboard/bookings",
    name: "Bookings Management",
  },
];

const Dashboard = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content overflow-x-auto w-full px-4 md:px-12 lg:px-20 py-12">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn border-[#F77F00] text-[#F77F00] bg-white absolute top-2 left-2 drawer-button lg:hidden"
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
            {user?.role === "user"
              ? userMenus.map((userMenu) => (
                  <li key={userMenu.name}>
                    <Link
                      to={userMenu.path}
                      className="font-semibold border-b-4 border-b-white hover:border-b-[#F77F00] text-white hover:text-[#F77F00] lg:transition lg:duration-200 text-sm lg:text-lg text-nowrap"
                    >
                      {userMenu.name}
                    </Link>
                  </li>
                ))
              : adminMenus.map((adminMenu) => (
                  <li key={adminMenu.name}>
                    <Link
                      to={adminMenu.path}
                      className="font-semibold border-b-4 border-b-white hover:border-b-[#F77F00] text-white hover:text-[#F77F00] lg:transition lg:duration-200 text-sm lg:text-lg text-nowrap"
                    >
                      {adminMenu.name}
                    </Link>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
