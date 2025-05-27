import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FiUser } from "react-icons/fi";
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

  return (
    <div className={header["container"]}>
      {/* Logo Section */}
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

      {/* Navigation */}
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

        {/* User Button or Auth Links */}
        <div className={header["auth-container"]}>
          {isAuth ? (
            <>
              <div className={header["user-info"]}>
                <FiUser size={24} className={header["user-icon"]} />
                <span className={header["username"]}>{fullName}</span>
              </div>
              <Button variant="outline-danger" onClick={handleLogout}>
                Đăng xuất
              </Button>
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
