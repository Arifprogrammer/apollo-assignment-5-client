import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/about/About";
import Checkout from "../pages/checkout/Checkout";
import Contact from "../pages/contact/Contact";
import Dashboard from "../pages/dashboard/Dashboard";
import RoomManagement from "../pages/dashboard/admin/roomsManagement/RoomManagement";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Rooms from "../pages/rooms/Rooms";
import SingleRoom from "../pages/singleRoom/SingleRoom";
import Success from "../pages/success/Success";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Booking from "../pages/booking/Booking";
import Payment from "../pages/Payment/Payment";
import BookingsManagement from "../pages/dashboard/user/bookingsManagement/BookingsManagement";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/rooms",
          element: <Rooms />,
        },
        {
          path: "/rooms/:id",
          element: (
            <ProtectedRoute role={undefined}>
              <SingleRoom />
            </ProtectedRoute>
          ),
        },
        {
          path: "/rooms/:id/booking",
          element: (
            <ProtectedRoute role={undefined}>
              <Booking />
            </ProtectedRoute>
          ),
        },
        {
          path: "/rooms/payment",
          element: (
            <ProtectedRoute role={undefined}>
              <Payment />
            </ProtectedRoute>
          ),
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/success",
          element: <Success />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute role={undefined}>
          <Dashboard />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        //* admin routes
        {
          path: "/dashboard/rooms",
          element: <RoomManagement />,
        },
        //* user routes
        {
          path: "/dashboard/my-bookings",
          element: (
            <ProtectedRoute role="user">
              <BookingsManagement />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
  ]);
