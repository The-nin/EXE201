import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
import { login } from "../../service/auth/index";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai"; // Sử dụng icon Home từ react-icons
import "../authPage/styles/login.module.scss"; // Custom CSS file
import { toast } from "react-toastify";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src =
      "https://res.cloudinary.com/dntcdrfiq/image/upload/v1744640996/Apricat_2_gkxrcn.svg";
    img.onload = () => setIsImageLoading(false);
    img.onerror = () => setIsImageLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsApiLoading(true);
    setError(null);

    try {
      const response = await login(username, password);
      console.log(response);
      if (response.data.code === 200) {
        localStorage.setItem("token", response.data.result.token);
        localStorage.setItem("fullName", response.data.result.fullName);
        navigate("/"); // Chuyển hướng đến trang chủ
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi không xác định");
    } finally {
      setIsApiLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex justify-content-center align-items-center bg-light"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dntcdrfiq/image/upload/v1749145348/bg-01_x9olek.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card
        className="login-card shadow-lg rounded-4 w-100"
        style={{
          maxWidth: "calc(100% - 200px)", // Thu gọn form với khoảng cách 100px mỗi bên
          width: "100%", // Đảm bảo form chiếm toàn bộ chiều rộng của Container
          backgroundColor: "rgba(158, 145, 145, 0.2)", // Semi-transparent background
          backdropFilter: "blur(10px)", // Blur effect
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}

        //           maxWidth: "400px", // Smaller width for a compact form
        //           width: "100%",
        //           backgroundColor: "rgba(158, 145, 145, 0.2)", // Semi-transparent background
        //           backdropFilter: "blur(10px)", // Blur effect
        //           border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border
      >
        <Row className="p-4">
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center bg-light rounded-start"
          >
            {isImageLoading ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <img
                src="https://res.cloudinary.com/dntcdrfiq/image/upload/v1744640996/Apricat_2_gkxrcn.svg"
                alt="Login Illustration"
                className="float-animation"
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "contain",
                }}
              />
            )}
          </Col>
          <Col md={6}>
            <Card.Body className="p-5 d-flex flex-column justify-content-center">
              <h2 className="text-center mb-4 fw-bold">Đăng nhập</h2>

              {error && (
                <Alert variant="danger" className="mb-3 text-center">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Tài khoản</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tài khoản"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isApiLoading}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isApiLoading}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2"
                  disabled={isApiLoading}
                >
                  {isApiLoading ? (
                    <Spinner animation="border" size="sm" className="me-2" />
                  ) : null}
                  {isApiLoading ? "Đang xử lý..." : "Đăng nhập"}
                </Button>

                <div className="text-center mt-4">
                  <a href="/forgot-password">Quên mật khẩu</a> |{" "}
                  <a href="/auth/register">Đăng kí</a>
                </div>
              </Form>

              {/* Thay thế nút Back bằng một link đẹp hơn */}
              <div className="d-flex justify-content-center align-items-center mt-5">
                <a
                  href="/"
                  className="back-to-home-link d-flex justify-content-center align-items-center"
                  style={{
                    fontSize: "16px",
                    color: "#f38280",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  <AiOutlineHome size={20} style={{ marginRight: "8px" }} />
                  Quay lại trang chủ
                </a>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default LoginPage;

// import React, { useState } from "react";
// import { Container, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
// import { login } from "../../service/auth/index";
// import { useNavigate } from "react-router-dom";
// import { AiOutlineHome } from "react-icons/ai";
// import "../authPage/styles/login.module.scss"; // Custom SCSS file
// import { toast } from "react-toastify";

// function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isApiLoading, setIsApiLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsApiLoading(true);
//     setError(null);

//     try {
//       const response = await login(username, password);
//       console.log(response);
//       if (response.data.code === 200) {
//         localStorage.setItem("token", response.data.result.token);
//         localStorage.setItem("fullName", response.data.result.fullName);
//         navigate("/"); // Redirect to homepage
//       } else {
//         setError(response.data.message);
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Lỗi không xác định");
//     } finally {
//       setIsApiLoading(false);
//     }
//   };

//   return (
//     <Container
//       fluid
//       className="min-vh-100 d-flex justify-content-center align-items-center"
//       style={{
//         backgroundImage: `url(https://res.cloudinary.com/dntcdrfiq/image/upload/v1749145348/bg-01_x9olek.png)`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundColor: "#f0f2f5", // Fallback color
//       }}
//     >
//       <Card
//         className="login-card shadow-lg rounded-4 w-100"
//         style={{
//           maxWidth: "400px", // Smaller width for a compact form
//           width: "100%",
//           backgroundColor: "rgba(158, 145, 145, 0.2)", // Semi-transparent background
//           backdropFilter: "blur(10px)", // Blur effect
//           border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border
//         }}
//       >
//         <Card.Body className="p-5 d-flex flex-column justify-content-center">
//           <h2 className="text-center mb-4 fw-bold text-white">Đăng nhập</h2>

//           {error && (
//             <Alert variant="danger" className="mb-3 text-center">
//               {error}
//             </Alert>
//           )}

//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3" controlId="formUsername">
//               <Form.Label className="text-black">Tài khoản</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Nhập tài khoản"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 disabled={isApiLoading}
//                 style={{
//                   backgroundColor: "rgba(255, 255, 255, 0.8)",
//                   border: "none",
//                 }}
//               />
//             </Form.Group>

//             <Form.Group className="mb-4" controlId="formPassword">
//               <Form.Label className="text-black">Mật khẩu</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Nhập mật khẩu"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 disabled={isApiLoading}
//                 style={{
//                   backgroundColor: "rgba(255, 255, 255, 0.8)",
//                   border: "none",
//                 }}
//               />
//             </Form.Group>

//             <Button
//               variant="primary"
//               type="submit"
//               className="w-100 py-2"
//               disabled={isApiLoading}
//               style={{
//                 backgroundColor: "#007bff",
//                 border: "none",
//               }}
//             >
//               {isApiLoading ? (
//                 <Spinner animation="border" size="sm" className="me-2" />
//               ) : null}
//               {isApiLoading ? "Đang xử lý..." : "Đăng nhập"}
//             </Button>

//             <div className="text-center mt-4">
//               <a href="/forgot-password" className="text-white">
//                 Quên mật khẩu
//               </a>{" "}
//               |{" "}
//               <a href="/auth/register" className="text-white">
//                 Đăng kí
//               </a>
//             </div>
//           </Form>

//           <div className="d-flex justify-content-center align-items-center mt-5">
//             <a
//               href="/"
//               className="back-to-home-link d-flex justify-content-center align-items-center text-white"
//               style={{
//                 fontSize: "16px",
//                 fontWeight: "600",
//                 textDecoration: "none",
//               }}
//             >
//               <AiOutlineHome size={20} style={{ marginRight: "8px" }} />
//               Quay lại trang chủ
//             </a>
//           </div>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// }

// export default LoginPage;
