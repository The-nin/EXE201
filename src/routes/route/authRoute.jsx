import { lazy } from "react";
import ROUTES from "../index";
const Login = lazy(() => import("../../pages/authPage/login"));
const Register = lazy(() => import("../../pages/authPage/register"));

export const authRoute = [
  {
    path: ROUTES.AUTH.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.AUTH.REGISTER,
    element: <Register />,
  },
];
