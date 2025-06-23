import React, { useEffect, useState } from "react";
import { Image, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { Dropdown, Menu } from "antd";
import header from "./styles/Header.module.scss";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [fullName, setFullName] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  // Check authentication status
  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    const token = localStorage.getItem("token");

    if (token && storedFullName) {
      setFullName(storedFullName);
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    setFullName(null);
    window.location.href = "/auth/login";
  };

  const isActive = (path) => currentPath === path;

  const userMenu = (
    <Menu className={header["dropdown"]}>
      <Menu.Item key="1">
        <Link to="/profile" className={header["dropdown-item"]}>
          Trang cá nhân
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/settings" className={header["dropdown-item"]}>
          Lịch sử đặt hàng
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/settings" className={header["dropdown-item"]}>
          Cài đặt
        </Link>
      </Menu.Item>
      <Menu.Item
        key="4"
        onClick={handleLogout}
        className={header["dropdown-item-logout"]}
      >
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={header["container"]}>
      <div className={header["logo-title"]}>
        <Link to="/" className={header["logo-name"]}>
          <Image
            src="https://res.cloudinary.com/dntcdrfiq/image/upload/v1744641869/logo_web-03_4_e8lvkf.svg"
            alt="logo"
            className={header["logo-img"]}
          />
          <p className={header["title"]}>ICOT</p>
        </Link>
      </div>

      <div className={header["nav-btn"]}>
        <div className={header["nav"]}>
          <Link
            to="/"
            className={`${header["nav-title"]} ${
              isActive("/") ? header["active"] : ""
            }`}
          >
            Trang chủ
          </Link>
          <Link
            to="/about-us"
            className={`${header["nav-title"]} ${
              isActive("/about-us") ? header["active"] : ""
            }`}
          >
            ICOT
          </Link>
          <Link
            to="/product"
            className={`${header["nav-title"]} ${
              isActive("/product") ? header["active"] : ""
            }`}
          >
            Sản phẩm
          </Link>
          <Link
            to="/contact"
            className={`${header["nav-title"]} ${
              isActive("/contact") ? header["active"] : ""
            }`}
          >
            Liên hệ
          </Link>
        </div>

        <div className={header["auth-container"]}>
          {isAuth ? (
            <>
              <div className={header["user-info"]}>
                <Dropdown
                  overlay={userMenu}
                  trigger={["click"]}
                  placement="bottomCenter"
                >
                  <FiUser size={24} className={header["user-icon"]} />
                </Dropdown>
                <span className={header["username"]}>{fullName}</span>
              </div>
              <Link to="/cart">
                <Button variant="outline-light" className={header["cart-btn"]}>
                  <FiShoppingCart size={24} className={header["user-icon"]} />
                </Button>
              </Link>
            </>
          ) : (
            <div className={header["auth-buttons"]}>
              <Link to="/auth/login">
                <Button variant="outline-light" className={header["auth-btn"]}>
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button variant="outline-light" className={header["auth-btn"]}>
                  Đăng ký
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
