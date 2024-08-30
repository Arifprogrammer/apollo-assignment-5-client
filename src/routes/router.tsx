import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/about/About";
import Checkout from "../pages/checkout/Checkout";
import Contact from "../pages/contact/Contact";
import Dashboard from "../pages/dashboard/Dashboard";
import ProductManagement from "../pages/dashboard/management/ProductManagement";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import SingleProduct from "../pages/singleProduct/SingleProduct";
import Success from "../pages/success/Success";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

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
          element: <Products />,
        },
        {
          path: "/rooms/:id",
          element: <SingleProduct />,
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
      element: <Dashboard />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <ProductManagement />,
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
