import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../../service/auth";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    phone: "",
    email: "",
    gender: "",
    fullName: "",
    status: "ACTIVE",
    role: "CUSTOMER", // Gửi cố định
  });

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setIsApiLoading(true);

    const payload = { ...formData };
    delete payload.confirmPassword;

    try {
      const response = await register(formData);
      console.log(response);
      if (response.data.code === 201) {
        navigate("/login");
      } else {
        navigate("/register");
      }
    } catch (err) {
      setError(err.message || "Lỗi không xác định.");
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
        style={{ maxWidth: "1100px", height: "550px", borderRadius: "15px" }}
      >
        <Row className="g-0 h-100">
          {/* Cột ảnh/logo */}
          <Col
            md={6}
            style={{
              backgroundColor: "#f8f9fa",
              borderTopLeftRadius: "15px",
              borderBottomLeftRadius: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://res.cloudinary.com/dntcdrfiq/image/upload/v1744640996/Apricat_2_gkxrcn.svg"
              alt="Register illustration"
              style={{
                width: "300px",
                height: "300px",
                objectFit: "contain",
                display: isImageLoading ? "none" : "block",
              }}
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
            />
            {isImageLoading && <div className="loader" />}
          </Col>

          {/* Cột form */}
          <Col md={6}>
            <Card.Body className="p-5 d-flex flex-column justify-content-center h-100">
              <h2 className="text-center mb-4" style={{ fontSize: "2rem" }}>
                Đăng ký
              </h2>
              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tài khoản</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Mật khẩu</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Xác nhận mật khẩu</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Ngày sinh</Form.Label>
                      <Form.Control
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Số điện thoại</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Giới tính</Form.Label>
                      <Form.Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="MALE">Nam</option>
                        <option value="FEMALE">Nữ</option>
                        <option value="OTHER">Khác</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Họ tên</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 mt-3"
                  disabled={isApiLoading}
                  style={{ padding: "10px", fontSize: "1.1rem" }}
                >
                  {isApiLoading ? "Đang xử lý..." : "Đăng ký"}
                </Button>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default RegisterPage;
