// import { Navigate } from "react-router-dom";
// import ROUTES from "../index";

// const ProtectedAdminRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const isAuthenticated =
//     token && ["ADMIN", "MANAGER", "STAFF", "DELIVERY", "EXPERT"].includes(role);

//   if (!isAuthenticated) {
//     console.log("Chuyển hướng đến login từ:", window.location.pathname);
//     return <Navigate to={`/admin/${ROUTES.ADMIN.LOGIN}`} replace />;
//   }

//   return children;
// };

// export default ProtectedAdminRoute;

import { Navigate } from "react-router-dom";

export const ProtectedAdminRoute = ({ children }) => {
  const admin = localStorage.getItem("admin");
  const staff = localStorage.getItem("staff");
  const manager = localStorage.getItem("manager");
  const delivery = localStorage.getItem("delivery");
  const expert = localStorage.getItem("expert");

  // Gộp các role vào một mảng và lọc bỏ các giá trị null/undefined
  const roles = [admin, staff, manager, delivery, expert].filter(Boolean);

  // Nếu không có role nào hợp lệ (mảng rỗng), chuyển về login
  if (roles.length === 0) {
    return <Navigate to="/admin/login" replace />;
  }

  // Kiểm tra xem có ít nhất một role hợp lệ không
  const validRoles = ["ADMIN", "STAFF", "MANAGER", "DELIVERY", "EXPERT"];
  const hasValidRole = roles.some((role) => validRoles.includes(role));

  if (!hasValidRole) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};
