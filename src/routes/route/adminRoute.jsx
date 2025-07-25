import { lazy } from "react";
import ROUTES from "../index";
import MainPage from "../../pages/adminPage/MainPage/MainPage";
import { ProtectedAdminRoute } from "../protectedRoute/ProtectedAdminRoute";
import BookOrderMng from "../../pages/adminPage/BookOrderMngPage/BookOrderMng";
import Designer from "../../pages/adminPage/Designer/Designer";
import AdminDashboard from "../../pages/adminPage/DashboardPage/Dashboard";
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
const TypePrintPage = lazy(() =>
  import("../../pages/adminPage/TypePrintMng/TypePrintPage")
);
const AddTypePrintPage = lazy(() =>
  import("../../pages/adminPage/TypePrintMng/AddTypePrint")
);
const AdminProductDetail = lazy(() =>
  import("../../pages/adminPage/ProductMngPage/ProductDetailAdmin")
);
const OrderMng = lazy(() =>
  import("../../pages/adminPage/OrderMngPage/OrderMng")
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
        path: "",
        element: <AdminDashboard />,
      },
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
          {
            path: ROUTES.ADMIN.DETAIL_PRODUCT,
            element: <AdminProductDetail />,
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
      {
        path: ROUTES.ADMIN.BOOKORDER,
        children: [
          {
            path: "",
            element: <BookOrderMng />,
          },
        ],
      },
      {
        path: ROUTES.ADMIN.TYPE_PRINT_MNG,
        children: [
          {
            path: "",
            element: <TypePrintPage />,
          },
          {
            path: ROUTES.ADMIN.ADD_TYPE_PRINT,
            element: <AddTypePrintPage />,
          },
        ],
      },
      {
        path: ROUTES.ADMIN.DESIGNER,
        children: [
          {
            path: "",
            element: <Designer />,
          },
        ],
      },
      {
        path: ROUTES.ADMIN.ORDER,
        element: <OrderMng />,
      },
    ],
  },
];

export default adminRoute;
