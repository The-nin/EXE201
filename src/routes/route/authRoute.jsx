import { lazy } from "react";
import ROUTES from "../index";
const Login = lazy(() => import("../../pages/authPage/login"));

const authRoute = [
  {
    path: ROUTES.AUTH.LOGIN,
    element: <Login />,
  },
];

export default authRoute;
