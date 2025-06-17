import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { register } from "../../service/auth";
import { AiOutlineHome } from "react-icons/ai"; // Icon Home từ react-icons

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
    role: "CUSTOMER",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
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
      return setError("Mật khẩu xác nhận không khớp.");
    }

    setLoading(true);
    const payload = { ...formData };
    delete payload.confirmPassword;

    try {
      const response = await register(payload);
      if (response.data.code === 201) {
        navigate("/login");
      } else {
        setError("Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      setError(err.message || "Lỗi không xác định.");
    } finally {
      setLoading(false);
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
      <Card className="w-100 shadow rounded-4" style={{ maxWidth: "1000px" }}>
        <Row className="g-0">
          {/* Image Panel */}
          <Col
            md={5}
            className="d-none d-md-flex bg-white justify-content-center align-items-center p-4"
            style={{
              overflow: "hidden",
              borderTopLeftRadius: "1.5rem",
              borderBottomLeftRadius: "1.5rem",
            }}
          >
            <div>
              {!imageLoaded && (
                <Spinner animation="border" variant="secondary" />
              )}
              <img
                src="https://res.cloudinary.com/dntcdrfiq/image/upload/v1744640996/Apricat_2_gkxrcn.svg"
                alt="Register"
                onLoad={() => setImageLoaded(true)}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: imageLoaded ? "block" : "none",
                }}
              />
            </div>
          </Col>

          {/* Form Panel */}
          <Col md={7}>
            <Card.Body className="p-4 p-md-5">
              <h2 className="mb-4 text-center">Tạo tài khoản</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tài khoản</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Nhập tài khoản"
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
                        placeholder="********"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={handleChange}
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
                        type="tel"
                        name="phone"
                        placeholder="098xxxxxxx"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Xác nhận mật khẩu</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Nhập lại mật khẩu"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
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
                      <Form.Label>Họ và tên</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        placeholder="Nguyễn Văn A"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  className="w-100 mt-3"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Đăng ký"}
                </Button>
              </Form>

              {/* Thêm các nút quay lại trang đăng nhập và trang chủ */}
              <div className="d-flex justify-content-center align-items-center mt-4">
                <a
                  href="/auth/login"
                  className="back-to-home-link d-flex justify-content-center align-items-center"
                  style={{
                    fontSize: "16px",
                    color: "#f38280",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  Quay lại đăng nhập
                </a>
                <span className="mx-3">|</span>
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

export default RegisterPage;
