import { lazy } from "react";
import ROUTES from "../index";
import CustomShirtOrder from "../../pages/customOrderPage/CustomShirtOrder";
import ProductDetail from "../../pages/productPage/ProductDetail";
import OrderHistory from "../../pages/orderHistoryPage/OrderHistory";
import Success from "../../pages/adminPage/BookOrderMngPage/Success";
const LandingPage = lazy(() => import("../../pages/landingPage/index"));
const AboutUsPage = lazy(() => import("../../pages/aboutUsPage/AboutUsPage"));
const ProductPage = lazy(() => import("../../pages/productPage/product"));
const ContactPage = lazy(() => import("../../pages/contactPage/contact"));
const ProfilePage = lazy(() => import("../../pages/profilePage/ProfilePage"));
const CartPage = lazy(() => import("../../pages/cart/cart"));

const userRoutes = [
  {
    path: ROUTES.LANDING_PAGE,
    element: <LandingPage />,
  },
  {
    path: ROUTES.ABOUT_US_PAGE,
    element: <AboutUsPage />,
  },
  {
    path: ROUTES.PRODUCT_PAGE,
    element: <ProductPage />,
  },
  {
    path: ROUTES.PRODUCT_DETAIL_PAGE,
    element: <ProductDetail />,
  },
  {
    path: ROUTES.CONTACT_PAGE,
    element: <ContactPage />,
  },
  {
    path: ROUTES.CUSTOM_SHIRT_PAGE,
    element: <CustomShirtOrder />,
  },
  {
    path: ROUTES.PROFILE_PAGE,
    element: <ProfilePage />,
  },
  {
    path: ROUTES.SUCCESS_PAGE,
    element: <Success />,
  },
];

export default userRoutes;
