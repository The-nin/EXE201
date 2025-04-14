import React from "react";
import { CgMail } from "react-icons/cg";
import { FiPhone } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";

function Footer() {
  return (
    <>
      <div className="container">
        <div>
          <h3>CONTACT US</h3>
          <div className="mail">
            <CgMail />
            abcyxz@gmail.com
          </div>

          <div className="phone">
            <FiPhone />
            84
          </div>
        </div>

        <div>
          <h3>OUR PRINTING PARTNER</h3>
          <div>
            <SlLocationPin />
            street bla bla...
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
