import React, { useEffect, useState } from "react";
import { Image, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiUser, FiMenu } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";

function HeaderAuth() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [fadeIn, setFadeIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  useEffect(() => {}, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about-us", label: "About Us" },
    { to: "/custom", label: "Custom" },
  ];

  return (
    <Container
      fluid
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: isSmallScreen ? "0.5rem 1rem" : "1rem 2rem",
        background: "linear-gradient(135deg, #e0f7fa 0%, #fff9e6 100%)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        minHeight: isSmallScreen ? "60px" : "80px",
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? "translateY(0)" : "translateY(-20px)",
        animation: fadeIn ? "fadeIn 0.5s ease-in-out" : "none",
        transition: "all 0.3s ease",
        position: "relative", // Đảm bảo menu mobile không bị che
      }}
    >
      {/* Logo and Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isSmallScreen ? "0.5rem" : "0.75rem",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            transition: "transform 0.3s ease, filter 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.filter =
              "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.filter = "none";
          }}
        >
          <Image
            src="https://res.cloudinary.com/dntcdrfiq/image/upload/q_auto,f_auto,w_150/v1744641869/logo_web-03_4_e8lvkf.svg"
            alt="ICOT Logo"
            fluid
            style={{
              width: isSmallScreen ? "40px" : "50px",
              height: "auto",
              transition: "transform 0.3s ease",
            }}
          />
          <h1
            style={{
              fontSize: isSmallScreen ? "1.5rem" : "2rem",
              fontWeight: "800",
              color: "#ff6f61",
              margin: 0,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "'Poppins', sans-serif",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            ICOT
          </h1>
        </Link>
      </div>

      <div
        style={{
          display: isSmallScreen ? "none" : "flex",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              fontSize: isSmallScreen ? "0.9rem" : "1rem",
              color: "#333",
              textDecoration: "none",
              fontWeight: "500",
              zIndex: 1002,
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6f61")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {isSmallScreen && (
        <Button
          style={{
            background: "transparent",
            border: "none",
            padding: "0.5rem",
            cursor: "pointer",
            zIndex: 1001,
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <FiMenu size={isSmallScreen ? "20px" : "24px"} color="#ff6f61" />
        </Button>
      )}

      {isSmallScreen && menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: 0,
            right: 0,
            background: "white",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            zIndex: 1000,
            animation: fadeIn ? "fadeIn 0.3s ease-in-out" : "none",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontSize: "1rem",
                color: "#333",
                textDecoration: "none",
                fontWeight: "500",
                padding: "0.5rem",
                transition: "color 0.3s ease",
                cursor: "pointer",
              }}
              onClick={() => setMenuOpen(false)}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6f61")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <div
        style={{
          display: isSmallScreen ? "none" : "flex",
          alignItems: "center",
          gap: isSmallScreen ? "0.5rem" : "1rem",
        }}
      ></div>
    </Container>
  );
}

export default HeaderAuth;
