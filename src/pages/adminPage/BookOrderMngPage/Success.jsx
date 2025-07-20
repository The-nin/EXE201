import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle } from "lucide-react";
import { paymentSuccess } from "../../../service/user";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Success() {
  const query = useQuery();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handlePayment = useCallback(async () => {
    const code = query.get("code");
    const cancel = query.get("cancel");
    const status = query.get("status");
    const orderCode = query.get("orderCode");

    if (!code || !cancel || !status || !orderCode) {
      setError("Thiếu thông tin thanh toán. Vui lòng kiểm tra lại.");
      setLoading(false);
      return;
    }

    if (code !== "00" || status !== "PAID" || cancel === "true") {
      setError("Thanh toán không thành công hoặc đã bị hủy.");
      setLoading(false);
      return;
    }

    try {
      const res = await paymentSuccess(orderCode);
      if (res?.code === 200) {
        setPaymentDetails({
          orderCode,
          status: "Đã thanh toán",
          ...res.data,
        });
      } else {
        setError("Dữ liệu đơn hàng không khớp. Vui lòng liên hệ hỗ trợ.");
      }
    } catch (err) {
      console.log(err);
      setError("Xảy ra lỗi khi xác nhận thanh toán.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    handlePayment();
  }, []);

  const handleBackToHome = () => navigate("/");
  const handleViewOrderDetails = () => {
    if (paymentDetails?.orderCode) {
      navigate(`/bookOrder/${paymentDetails.orderCode}`);
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
        <div className="card shadow-sm w-100" style={{ maxWidth: 500 }}>
          <div className="card-header text-danger d-flex align-items-center gap-2">
            <AlertCircle className="me-2" />
            <h5 className="mb-0">Lỗi Thanh Toán</h5>
          </div>
          <div className="card-body">
            <div className="alert alert-danger">{error}</div>
            <button
              onClick={handleBackToHome}
              className="btn btn-primary w-100"
            >
              Quay Về Trang Chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <div className="card shadow w-100" style={{ maxWidth: 700 }}>
        <div className="card-header text-success d-flex align-items-center gap-2">
          <CheckCircle className="me-2" />
          <h5 className="mb-0">Thanh Toán Thành Công</h5>
        </div>
        <div className="card-body">
          <p className="text-muted">
            Cảm ơn bạn đã hoàn tất thanh toán. Dưới đây là chi tiết giao dịch.
          </p>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item d-flex justify-content-between">
              <strong>Mã Đơn Hàng:</strong>
              <span>{paymentDetails.orderCode}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <strong>Trạng Thái:</strong>
              <span className="text-success fw-semibold">
                {paymentDetails.status}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <strong>Thời Gian:</strong>
              <span>{new Date().toLocaleString("vi-VN")}</span>
            </li>
          </ul>
          <div className="alert alert-success text-success">
            Đơn hàng của bạn đã được xác nhận. Chúng tôi sẽ gửi thông tin chi
            tiết qua email.
          </div>
          <div className="d-grid gap-2 d-md-flex">
            <button
              onClick={handleBackToHome}
              className="btn btn-outline-secondary flex-fill"
            >
              Quay Về Trang Chủ
            </button>
            <button
              onClick={handleViewOrderDetails}
              className="btn btn-success flex-fill"
            >
              Xem Chi Tiết Đơn Hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
