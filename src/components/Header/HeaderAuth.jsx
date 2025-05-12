import React from "react";
import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import header from "./styles/HeaderAuth.module.scss";

function HeaderAuth() {
  return (
    <>
      <Container className={header["container"]}>
        <div className={header["logo-title"]}>
          <Image
            src="https://res.cloudinary.com/dntcdrfiq/image/upload/v1744641869/logo_web-03_4_e8lvkf.svg"
            alt="logo"
            className={header["logo-img"]}
          />
          <p className={header["title"]}>ICOT</p>
        </div>
      </Container>
    </>
  );
}

export default HeaderAuth;
