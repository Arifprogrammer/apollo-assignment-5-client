import { Link, NavLink } from "react-router-dom";
/* import { getTotalOrderQuantity } from "../../redux/features/cart/cartSlice";
import { useAppSelector } from "../../redux/hook"; */

const Navbar = () => {
  // const totalOrderQuantity = useAppSelector(getTotalOrderQuantity);

  const listItem = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#F77F00] font-semibold lg:border-b-4 border-b-[#F77F00]"
              : "font-semibold lg:border-b-4 lg:border-b-white hover:border-b-[#F77F00] lg:text-white hover:text-[#F77F00] lg:transition lg:duration-200"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            isActive
              ? "text-[#F77F00] font-semibold lg:border-b-4 border-b-[#F77F00]"
              : "font-semibold lg:border-b-4 lg:border-b-white hover:border-b-[#F77F00] lg:text-white hover:text-[#F77F00] lg:transition lg:duration-200"
          }
        >
          Meeting Rooms
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-[#F77F00] font-semibold lg:border-b-4 border-b-[#F77F00]"
              : "font-semibold lg:border-b-4 lg:border-b-white hover:border-b-[#F77F00] lg:text-white hover:text-[#F77F00] lg:transition lg:duration-200"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-[#F77F00] font-semibold lg:border-b-4 border-b-[#F77F00]"
              : "font-semibold lg:border-b-4 lg:border-b-white hover:border-b-[#F77F00] lg:text-white hover:text-[#F77F00] lg:transition lg:duration-200"
          }
        >
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            isActive
              ? "text-[#F77F00] font-semibold lg:border-b-4 border-b-[#F77F00]"
              : "font-semibold lg:border-b-4 lg:border-b-white hover:border-b-[#F77F00] lg:text-white hover:text-[#F77F00] lg:transition lg:duration-200"
          }
        >
          Register
        </NavLink>
      </li>
      <li className="hidden lg:block">
        {/* <details className="dropdown">
          <summary>
            <img
              src="https://i.ibb.co/TBz7QSQ/rugby-min.png"
              alt="user"
              className="rounded-full size-10 object-cover object-top"
            />
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-fit p-2 shadow !-ms-4">
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </details> */}
        <div className="dropdown !p-0">
          <div tabIndex={0} role="button">
            <img
              src="https://i.ibb.co/TBz7QSQ/rugby-min.png"
              alt="user"
              className="rounded-full size-10 object-cover object-top"
            />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-fit p-2 shadow right-0 top-12"
          >
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </li>
    </>
  );

  return (
    <section className="fixed z-10 w-full bg-[#003049]">
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
          <div className="dropdown lg:hidden mr-2 !p-0">
            <div tabIndex={0} role="button">
              <img
                src="https://i.ibb.co/TBz7QSQ/rugby-min.png"
                alt="user"
                className="rounded-full size-10 object-cover object-top"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-fit p-2 shadow right-0 top-12"
            >
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
