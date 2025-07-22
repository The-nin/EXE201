import React from "react";
import { CgMail } from "react-icons/cg";
import { FiPhone } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import footer from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={footer["footer"]}>
      <Container className={footer["content"]}>
        <div className={footer["section"]}>
          <h5 className={footer["title"]}>📬 Liên hệ</h5>
          <div className={footer["info"]}>
            <CgMail className={footer["icon"]} />
            <span>phanhoangnam17@gmail.com</span>
          </div>
          <div className={footer["info"]}>
            <FiPhone className={footer["icon"]} />
            <span>+84 914566567</span>
          </div>
        </div>

        <div className={footer["section"]}>
          <h5 className={footer["title"]}>🏭 Đối tác in ấn</h5>
          <div className={footer["info"]}>
            <SlLocationPin className={footer["icon"]} />
            <span>ĐH FPT, Quận 9, TP.HCM</span>
          </div>
        </div>

        <div className={footer["section"]}>
          <h5 className={footer["title"]}>📱 Mạng xã hội</h5>
          <div className={footer["social-icons"]}>
            <a
              href="https://facebook.com/Icot25"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>{" "}
            <a
              href="https://www.tiktok.com/@icot510?_t=ZS-8yEJY7JF1kH&_r=1"
              target="_blank"
              rel="noreferrer"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </Container>

      <div className={footer["bottom"]}>
        © 2025 ICOT. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
}

export default Footer;
