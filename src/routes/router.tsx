import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Dashboard from "../pages/dashboard/Dashboard";
import RoomManagement from "../pages/dashboard/admin/roomsManagement/RoomManagement";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Rooms from "../pages/rooms/Rooms";
import SingleRoom from "../pages/singleRoom/SingleRoom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Booking from "../pages/booking/Booking";
import Payment from "../pages/Payment/Payment";
import SlotManagement from "../pages/dashboard/admin/slotsManagement/SlotManagement";
import MyBookingsManagement from "../pages/dashboard/user/myBookingsManagement/MyBookingsManagement";
import BookingsManagement from "../pages/dashboard/admin/bookingsManagement/BookingsManagement";

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
            <ProtectedRoute role="user">
              <Booking />
            </ProtectedRoute>
          ),
        },
        {
          path: "/rooms/payment",
          element: (
            <ProtectedRoute role="user">
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
          element: (
            <ProtectedRoute role="admin">
              <RoomManagement />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/slots",
          element: (
            <ProtectedRoute role="admin">
              <SlotManagement />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/bookings",
          element: (
            <ProtectedRoute role="admin">
              <BookingsManagement />
            </ProtectedRoute>
          ),
        },
        //* user routes
        {
          path: "/dashboard/my-bookings",
          element: (
            <ProtectedRoute role="user">
              <MyBookingsManagement />
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
