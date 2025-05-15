import { lazy } from "react";
import ROUTES from "../index";
const LandingPage = lazy(() => import("../../pages/landingPage/index"));
const AboutUsPage = lazy(() => import("../../pages/aboutUsPage/AboutUs"));

const userRoutes = [
  {
    path: ROUTES.LANDING_PAGE,
    element: <LandingPage />,
  },
  {
    path: ROUTES.ABOUT_US_PAGE,
    element: <AboutUsPage />,
  },
];

export default userRoutes;
