// import { lazy } from "react";
// const NotFound = lazy(() => import("../../pages/notFoundPage"));
import ROUTES from "../index";
import NotFound from "../../pages/notFoundPage";

const notFoundRoute = {
    path: ROUTES.NOT_FOUND_PAGE,
    element : <NotFound />, 
};

export default notFoundRoute