import { lazy } from "react";
import ROUTES from "../index";
import MainPage from "../../pages/adminPage/MainPage/MainPage";
import { ProtectedAdminRoute } from "../protectedRoute/ProtectedAdminRoute";
const LoginAdmin = lazy(() =>
  import("../../pages/adminPage/LoginAdmin/LoginAdmin")
);
const AccountManagement = lazy(() =>
  import("../../pages/adminPage/AccountMngPage/AccountMng")
);

const adminRoute = [
  {
    path: ROUTES.ADMIN.LOGIN,
    element: <LoginAdmin />,
  },
  {
    path: "",
    element: (
      <ProtectedAdminRoute>
        <MainPage />
      </ProtectedAdminRoute>
    ),
    children: [
      {
        path: ROUTES.ADMIN.ACCOUNT_MNG,
        element: <AccountManagement />,
      },
    ],
  },
];

export default adminRoute;
