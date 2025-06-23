import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../service/auth";
import "./LoginAdmin.scss";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const adminUser = JSON.parse(localStorage.getItem("adminUser"));
    if (adminUser?.token) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(formData.username, formData.password);
      console.log(response);
      if (response?.error) {
        setError(response.message || "Đăng nhập thất bại");
        return;
      }

      localStorage.setItem("role", response.data.result.role);

      const roleValid = ["ADMIN", "STAFF", "MANAGER", "DESIGNER"];

      if (response?.data.code === 200) {
        // Kiểm tra role ADMIN
        if (!roleValid.includes(response.data.result.role)) {
          setError("Bạn không có quyền truy cập vào trang quản trị");
          return;
        }
        localStorage.removeItem("token");
        localStorage.removeItem("fullname");
        localStorage.removeItem("userTokenExpiration");
        localStorage.setItem("admin", response.data.result.role);

        localStorage.setItem("role", response.data.result.role);
        localStorage.setItem("token", response.data.result.token);
        const expirationTime = new Date().getTime() + 5 * 60 * 60 * 1000;
        localStorage.setItem("adminTokenExpiration", expirationTime.toString());

        // Redirect based on role
        if (response.data.result.role === "ADMIN") {
          navigate("/admin"); // Admin goes to dashboard
        } else if (
          response.data.result.role === "STAFF" ||
          response.data.result.role === "MANAGER" ||
          response.data.result.role === "DESIGNER"
        ) {
          navigate("/admin"); // Other roles go to product management
        } else {
          navigate("/admin"); // Other roles go to order management
        }
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">
          <div className="title-content">
            <div className="title-main">ICOT</div>
            <div className="title-sub">ADMIN</div>
          </div>
        </h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-input"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
