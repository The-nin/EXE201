import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FiUser } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import header from "./styles/Header.module.scss";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <Container fluid className={header["container"]}>
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
              isActive("/products") ? header["active"] : ""
            }`}
          >
            Sản phẩm
          </Link>

          <Link
            to="/custom"
            className={`${header["nav-title"]} ${
              isActive("/custom") ? header["active"] : ""
            }`}
          >
            Liên hệ
          </Link>
        </div>

        <div className={header["button-container"]}>
          <Button className={header["btn"]}>
            <FiUser size={28} />
          </Button>

          <Button className={header["btn"]}>
            <BsCart2 size={28} />
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Header;
