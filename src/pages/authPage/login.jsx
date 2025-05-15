import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { login } from "../../service/auth/index";
import { useNavigate } from "react-router-dom";

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
    img.onload = () => {
      console.log("Image loaded");
      setIsImageLoading(false);
    };
    img.onerror = () => {
      console.error("Failed to load image");
      setIsImageLoading(false);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsApiLoading(true);
    setError(null);

    try {
      const response = await login(username, password);
      console.log(response.data);
      if (response.data.code === 200) {
        localStorage.setItem("token", response.data.result.token);
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message);
    } finally {
      setIsApiLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
      }}
    >
      <Card
        className="shadow-sm w-100 rounded-4"
        style={{ maxWidth: "1100px", borderRadius: "15px", height: "500px" }}
      >
        <Row className="g-0">
          <Col
            md={6}
            style={{
              height: "500px",
              borderTopLeftRadius: "15px",
              borderBottomLeftRadius: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isImageLoading ? (
              <div className="loader" />
            ) : (
              <img
                src="https://res.cloudinary.com/dntcdrfiq/image/upload/v1744640996/Apricat_2_gkxrcn.svg"
                alt="Login illustration"
                className="float-animation"
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "contain",
                }}
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
              />
            )}
          </Col>
          <Col md={6}>
            <Card.Body className="p-5 d-flex flex-column justify-content-center h-100">
              <h2 className="text-center mb-4" style={{ fontSize: "2rem" }}>
                Đăng nhập
              </h2>
              {error && (
                <Alert variant="danger" className="mb-3">
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
                    style={{ fontSize: "1.1rem" }}
                    disabled={isApiLoading}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    autoComplete="on"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ fontSize: "1.1rem" }}
                    disabled={isApiLoading}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  style={{ fontSize: "1.1rem", padding: "10px" }}
                  disabled={isApiLoading}
                >
                  {isApiLoading ? (
                    <div
                      className="loader"
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
                <div className="text-center mt-3">
                  <a href="/forgot-password">Quên mật khẩu</a> |{" "}
                  <a href="/auth/register">Đăng kí</a>
                </div>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default LoginPage;
