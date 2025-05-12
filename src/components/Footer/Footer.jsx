import React from "react";
import { CgMail } from "react-icons/cg";
import { FiPhone } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import Container from "react-bootstrap/Container";
import footer from "./Footer.module.scss";

function Footer() {
  return (
    <Container>
      <div className={footer["container"]}>
        <div className={footer["left-section"]}>
          <h3 className={footer["title"]}>CONTACT US</h3>
          <div className={footer["email"]}>
            <CgMail className={footer["email-icon"]} />
            abcyxz@gmail.com
          </div>

          <div className={footer["phone"]}>
            <FiPhone className={footer["phone-icon"]} />
            84
          </div>
        </div>

        <div className={footer["right-section"]}>
          <h3 className={footer["title"]}>OUR PRINTING PARTNER</h3>
          <div className={footer["address"]}>
            <SlLocationPin className={footer["address-icon"]} />
            street bla bla...
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Footer;
