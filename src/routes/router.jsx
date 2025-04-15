import { createBrowserRouter } from "react-router-dom";
import userRoutes from "./route/userRoute.jsx";
import notFoundRoute from "./route/notFoundRoute.jsx";
import RootLayout from "../layout/RootLayout.jsx";
// import { lazy } from "react";
// const RootLayout = lazy(() => import("../layout/RootLayout"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [...userRoutes],
  },
  notFoundRoute,
]);
