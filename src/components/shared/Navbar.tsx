import { TfiUser } from "react-icons/tfi";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { resetSlotsId } from "../../redux/features/slots/slotSlice";

const menus = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/rooms",
    name: "Meeting Rooms",
  },
  {
    path: "/about",
    name: "About Us",
  },
  {
    path: "/contact",
    name: "Contact Us",
  },
];

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetSlotsId());
  };

  const listItem = (
    <>
      {menus.map((menu) => (
        <li key={menu.name}>
          <NavLink
            to={menu.path}
            className={({ isActive }) =>
              isActive
                ? "text-[#F77F00] font-semibold lg:border-b-4 border-b-[#F77F00]"
                : "font-semibold lg:border-b-4 lg:border-b-white hover:border-b-[#F77F00] lg:text-white hover:text-[#F77F00] lg:transition lg:duration-200"
            }
          >
            {menu.name}
          </NavLink>
        </li>
      ))}
      {!user && (
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-[#F77F00] font-semibold lg:border-b-4 border-b-[#F77F00]"
                : "font-semibold lg:border-b-4 lg:border-b-white hover:border-b-[#F77F00] lg:text-white hover:text-[#F77F00] lg:transition lg:duration-200"
            }
          >
            Login / Register
          </NavLink>
        </li>
      )}
      {user && (
        <li className="hidden lg:block">
          <div className="dropdown !p-0">
            <div tabIndex={0} role="button">
              <TfiUser className="size-9" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-fit p-2 shadow right-0 top-12"
            >
              {user.role === "admin" ? (
                <li>
                  <Link to="/dashboard/rooms">Dashboard</Link>
                </li>
              ) : (
                <li>
                  <Link to="/dashboard/my-bookings" className="text-nowrap">
                    My bookings
                  </Link>
                </li>
              )}
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </li>
      )}
    </>
  );

  return (
    <section className="fixed z-30 w-full bg-[#003049]">
      <div className="navbar p-0 my-container rounded-sm text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-100 rounded-box w-52 font-semibold text-black"
            >
              {listItem}
            </ul>
          </div>
          <div className="hidden lg:flex">
            <Link to="/">
              <div className="flex items-end gap-1 pb-2">
                <h1 className="text-7xl font-bold text-[#F77F00] font-serif italic">
                  R
                </h1>
                <p className="italic text-xl font-semibold mb-1.5">
                  eserve <br /> ealm
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="navbar-center">
          <div className="lg:hidden">
            <Link to="/">
              <div className="flex items-end gap-px pb-2">
                <h1 className="text-5xl font-bold text-[#F77F00] font-serif italic">
                  R
                </h1>
                <p className="italic text-sm font-semibold mb-1">
                  eserve <br /> ealm
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal mr-3 gap-4 hidden lg:flex items-center">
            {listItem}
          </ul>
          {user && (
            <div className="dropdown lg:hidden mr-2 !p-0">
              <div tabIndex={0} role="button">
                <TfiUser className="size-9" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-fit p-2 shadow right-0 top-12"
              >
                {user.role === "admin" ? (
                  <li>
                    <Link to="/dashboard/rooms">Dashboard</Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/dashboard/my-bookings" className="text-nowrap">
                      My bookings
                    </Link>
                  </li>
                )}
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
