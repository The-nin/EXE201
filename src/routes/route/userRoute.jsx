import { lazy } from "react";
import ROUTES from "../index";
const LandingPage = lazy(() => import("../../pages/landingPage"));

const userRoutes = [
  {
    path: ROUTES.LANDING_PAGE,
    element: <LandingPage />,
  },
];

export default userRoutes;
