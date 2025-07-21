import { useEffect } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  ReadOutlined,
  QuestionCircleOutlined,
  GiftOutlined,
  SolutionOutlined,
  PrinterOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { GiRolledCloth } from "react-icons/gi";
import ROUTES from "../../routes";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = localStorage.getItem("role") || "STAFF";

  const permissions = {
    "/admin": ["ADMIN"],
    "/admin/account-management": ["ADMIN"],
    "/admin/product": ["ADMIN", "MANAGER", "STAFF"],
    "/admin/category": ["ADMIN", "MANAGER"],
    "/admin/fabric": ["ADMIN", "MANAGER"],
    "/admin/bookOrder": ["ADMIN", "MANAGER", "STAFF", "DESIGNER"],
    "/admin/type-print": ["ADMIN", "MANAGER"],
    "/admin/order": ["ADMIN", "MANAGER", "STAFF", "DELIVERY"],
    // "/admin/order": ["ADMIN", "MANAGER", "STAFF", "DELIVERY"],
    // "/admin/blog": ["ADMIN", "MANAGER", "EXPERT"],
    // "/admin/quiz": ["ADMIN", "MANAGER", "EXPERT"],
    // "/admin/voucher": ["ADMIN", "MANAGER"],
    // "/admin/service": ["ADMIN", "MANAGER", "STAFF"],
    // "/admin/consultant-booking": ["EXPERT"],
    // "/admin/consultant-all-booking": ["ADMIN", "MANAGER"],
    // "/admin/staff-manage-consultant-order": ["STAFF"],
  };

  const menuItems = [
    {
      key: `/${ROUTES.ADMIN.DASHBOARD}`,
      icon: <DashboardOutlined />,
      label: "Trang chủ",
    },
    {
      key: "/admin/account-management",
      icon: <UserOutlined />,
      label: "Quản lý người dùng",
    },
    {
      key: "/admin/product",
      icon: <ShoppingOutlined />,
      label: "Quản lý sản phẩm",
    },
    {
      key: "/admin/category",
      icon: <AppstoreOutlined />,
      label: "Quản lý danh mục",
    },
    {
      key: "/admin/fabric",
      icon: <GiRolledCloth />,
      label: "Quản lý loại vải",
    },
    {
      key: "/admin/bookOrder",
      icon: <ReadOutlined />,
      label: "Quản lý đặt hàng",
    },
    {
      key: "/admin/type-print",
      icon: <PrinterOutlined />,
      label: "Quản lý loại in",
    },
    // {
    //   key: "/admin/order",
    //   icon: <ShoppingCartOutlined />,
    //   label: "Quản lý đơn hàng",
    // },
  ];
  const filteredMenuItems = menuItems.filter((item) =>
    permissions[item.key]?.includes(userRole)
  );

  useEffect(() => {
    const currentPath = location.pathname;

    const isPathAllowed = filteredMenuItems.some((item) =>
      currentPath.startsWith(item.key)
    );

    if (!isPathAllowed && filteredMenuItems.length > 0) {
      navigate(filteredMenuItems[0].key);
    }
  }, [location.pathname, filteredMenuItems, navigate]);

  return (
    <Sider
      collapsed={collapsed}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      theme="dark"
      width={200}
      collapsedWidth={80}
    >
      <div
        style={{
          height: "64px",
          margin: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            color: "white",
            margin: 0,
            fontSize: collapsed ? "14px" : "18px",
          }}
        >
          {collapsed ? "Quản trị" : "Trang Quản trị"}
        </h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={filteredMenuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default Sidebar;
