import { lazy } from "react";
import ROUTES from "../index";
import CustomShirtOrder from "../../pages/customOrderPage/CustomShirtOrder";
import ProductDetail from "../../pages/productPage/ProductDetail";
import OrderHistory from "../../pages/orderHistoryPage/OrderHistory";
import Success from "../../pages/adminPage/BookOrderMngPage/Success";
import OrderComplete from "../../pages/cart/Order-complete";
import BookOrderHistory from "../../pages/bookOrderHistory/BookOrderHistory";
import BookOrderHistoryDetail from "../../pages/bookOrderHistory/BookOrderHistoryDetail";
const LandingPage = lazy(() => import("../../pages/landingPage/index"));
const AboutUsPage = lazy(() => import("../../pages/aboutUsPage/AboutUsPage"));
const ProductPage = lazy(() => import("../../pages/productPage/product"));
const ContactPage = lazy(() =>
  import("../../pages/customOrderPage/CustomShirtOrder")
);
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
  {
    path: ROUTES.CART_PAGE,
    element: <CartPage />,
  },
  {
    path: ROUTES.ORDER_HISTORY_PAGE,
    element: <OrderHistory />,
  },
  {
    path: ROUTES.ORDER_COMPLETE,
    element: <OrderComplete />,
  },
  {
    path: ROUTES.BOOKORDER_HISTORY,
    element: <BookOrderHistory />,
  },
  {
    path: ROUTES.BOOKORDER_DETAIL_PAGE,
    element: <BookOrderHistoryDetail />,
  },
];

export default userRoutes;
