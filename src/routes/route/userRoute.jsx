// import { lazy } from "react";
import LandingPage from "../../pages/landingPage";
import ROUTES from "../index";
// const NotFound = lazy(() => import("../../pages/notFoundPage"));

const userRoutes = [
  {
    path: ROUTES.LANDING_PAGE,
    element: <LandingPage />,
  },
];

export default userRoutes;
