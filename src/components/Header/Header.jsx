import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FiUser } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import header from "./styles/Header.module.scss";

function Header() {
  return (
    <>
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
            <Link to="/about-us" className={header["nav-title"]}>
              About us
            </Link>

            <Link to="/products" className={header["nav-title"]}>
              Products
            </Link>

            <Link to="/custom" className={header["nav-title"]}>
              Custom
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
    </>
  );
}

export default Header;
