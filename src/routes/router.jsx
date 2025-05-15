import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import userRoutes from "./route/userRoute.jsx";
import notFoundRoute from "./route/notFoundRoute.jsx";
import { authRoute } from "./route/authRoute.jsx";
const RootLayout = lazy(() => import("../layout/RootLayout"));
const AuthLayout = lazy(() => import("../layout/AuthLayout"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [...userRoutes],
  },
  notFoundRoute,
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [...authRoute],
  },
]);
