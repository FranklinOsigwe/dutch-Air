import { createBrowserRouter, Navigate, Outlet } from "react-router";

import Flights from "pages/Flights";
import HomePage from "pages/Home";
import Login from "pages/Login";
import Signup from "pages/Signup";

export enum routeKeys {
  HOME = "/home",
  FLIGHTS = "/flights",
  LOGIN = "/",
  SIGN_UP = "/signup",
}

const router = createBrowserRouter([
  {
    path: routeKeys.LOGIN,
    element: <Login />,
  },
  {
    path: routeKeys.SIGN_UP,
    element: <Signup />,
  },
  {
    path: routeKeys.FLIGHTS,
    element: <Flights />,
  },
  {
    path: routeKeys.HOME,
    element: <HomePage />,
  },
]);

export default router;