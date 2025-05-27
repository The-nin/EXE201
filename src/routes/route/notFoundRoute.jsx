import { lazy } from "react";
import ROUTES from "../index";
const NotFound = lazy(() => import("../../pages/notFoundPage"));

const notFoundRoute = {
  path: ROUTES.NOT_FOUND_PAGE,
  element: <NotFound />,
};

export default notFoundRoute;
