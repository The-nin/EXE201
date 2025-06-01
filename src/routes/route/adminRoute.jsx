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
const ProductMng = lazy(() =>
  import("../../pages/adminPage/ProductMngPage/ProductMng")
);
const AddProductPage = lazy(() =>
  import("../../pages/adminPage/ProductMngPage/AddProductPage")
);
const CategoryMng = lazy(() =>
  import("../../pages/adminPage/CategoryMngPage/CategoryMng")
);
const AddCategoryPage = lazy(() =>
  import("../../pages/adminPage/CategoryMngPage/AddCategoryPage")
);
const FabricMng = lazy(() =>
  import("../../pages/adminPage/FabricMngPage/FabricMng")
);
const AddFabricPage = lazy(() =>
  import("../../pages/adminPage/FabricMngPage/CreateFabric")
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
      {
        path: ROUTES.ADMIN.PRODUCT_MNG,
        children: [
          {
            path: "",
            element: <ProductMng />,
          },
          {
            path: ROUTES.ADMIN.ADD_PRODUCT,
            element: <AddProductPage />,
          },
        ],
      },
      {
        path: ROUTES.ADMIN.CATEGORY_MNG,
        children: [
          {
            path: "",
            element: <CategoryMng />,
          },
          {
            path: ROUTES.ADMIN.ADD_CATEGORY,
            element: <AddCategoryPage />,
          },
        ],
      },
      {
        path: ROUTES.ADMIN.FABRIC_MNG,
        children: [
          {
            path: "",
            element: <FabricMng />,
          },
          {
            path: ROUTES.ADMIN.ADD_FABRIC,
            element: <AddFabricPage />,
          },
        ],
      },
    ],
  },
];

export default adminRoute;
