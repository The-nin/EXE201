// src/components/BookOrderHistoryDetail.js
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import {
  CalendarDays,
  Package,
  Truck,
  ArrowLeft,
  Palette,
  Ruler,
  FileText,
} from "lucide-react";
import { getBookOrderHistory } from "../../service/user/index.js";
import "./BookOrderHistoryDetail.scss"; // Reuse CSS từ BookOrderHistory

export default function BookOrderHistoryDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getBookOrderHistory();
        if (Array.isArray(data)) {
          const foundOrder = data.find((o) => o.id === parseInt(id));
          if (foundOrder) {
            setOrder(foundOrder);
          } else {
            setError("Không tìm thấy đơn hàng.");
          }
        } else {
          setError("Dữ liệu không hợp lệ từ server.");
        }
      } catch (err) {
        console.error("Lỗi khi tải chi tiết đơn hàng:", err);
        setError("Không thể tải chi tiết đơn hàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-success text-white";
      case "SHIPPED":
        return "bg-primary text-white";
      case "PRINTING":
        return "bg-purple text-white";
      case "PENDING_APPROVAL":
        return "bg-warning text-dark";
      case "CANCELLED":
        return "bg-danger text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "DELIVERED":
        return "Đã giao";
      case "SHIPPED":
        return "Đang vận chuyển";
      case "PRINTING":
        return "Đang in";
      case "PENDING_APPROVAL":
        return "Chờ duyệt";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "DELIVERED":
        return <Package className="me-1" size={16} />;
      case "SHIPPED":
        return <Truck className="me-1" size={16} />;
      case "PRINTING":
        return <Palette className="me-1" size={16} />;
      case "PENDING_APPROVAL":
        return <CalendarDays className="me-1" size={16} />;
      default:
        return <Package className="me-1" size={16} />;
    }
  };

  const formatSize = (size) => {
    return size ? size.replace(/_/g, " ") : "N/A";
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center animate__animated animate__fadeIn">
        <p className="text-muted">Đang tải chi tiết đơn hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div
          className="alert alert-danger animate__animated animate__shakeX"
          role="alert"
        >
          {error}
        </div>
        <Link to="/" className="btn btn-outline-primary btn-hover rounded-pill">
          <ArrowLeft className="me-2" size={16} />
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto p-4">
        <div
          className="alert alert-info animate__animated animate__fadeIn"
          role="alert"
        >
          Không tìm thấy đơn hàng.
        </div>
        <Link to="/" className="btn btn-outline-primary btn-hover rounded-pill">
          <ArrowLeft className="me-2" size={16} />
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 fw-bold text-primary animate__animated animate__fadeIn">
          Chi tiết đơn hàng #{order.id}
        </h1>
        <Link to="/" className="btn btn-outline-primary btn-hover rounded-pill">
          <ArrowLeft className="me-2" size={16} />
          Quay lại danh sách
        </Link>
      </div>

      <Card className="shadow-lg border-0 animate__animated animate__fadeInUp">
        <Card.Header className="bg-gradient-light">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between gap-3">
            <div>
              <div className="d-flex align-items-center gap-2">
                <Card.Title as="h5">Đơn hàng #{order.id}</Card.Title>
                <Badge
                  className={`${getStatusColor(order.status)} rounded-pill`}
                >
                  {getStatusIcon(order.status)}
                  {getStatusText(order.status)}
                </Badge>
              </div>
              <div className="row row-cols-1 row-cols-sm-2 g-2 text-muted small">
                <p className="col">
                  <strong>Khách hàng:</strong> {order.customerName || "N/A"}
                </p>
                <p className="col">
                  <strong>Thiết kế:</strong> {order.designName || "N/A"}
                </p>
                <p className="col">
                  <strong>Ngày:</strong>{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("vi-VN")
                    : "N/A"}
                </p>
                <p className="col">
                  <strong>D danh mục:</strong> {order.category?.name || "N/A"}
                </p>
              </div>
            </div>
            <div className="text-lg-end">
              <p className="small text-muted mb-0">Tổng cộng</p>
              <p className="h5 fw-bold text-primary">
                ${order.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}
              </p>
            </div>
          </div>
        </Card.Header>

        <Card.Body>
          <Row className="g-4">
            <Col lg={8}>
              <Row className="g-3">
                <Col sm={6}>
                  <h6 className="fw-semibold d-flex align-items-center gap-2">
                    <Ruler size={16} /> Thông số
                  </h6>
                  <div className="small">
                    <p>
                      <strong>Kích thước:</strong>{" "}
                      {formatSize(order.size) || "N/A"}
                    </p>
                    <p>
                      <strong>Số lượng:</strong> {order.quantity || "N/A"}
                    </p>
                    <p>
                      <strong>Màu sắc:</strong> {order.color || "N/A"}
                    </p>
                    <p>
                      <strong>Chất liệu:</strong> {order.fabric?.name || "N/A"}
                    </p>
                    <p>
                      <strong>Loại in:</strong> {order.typePrint?.name || "N/A"}
                    </p>
                  </div>
                </Col>

                <Col sm={6}>
                  <h6 className="fw-semibold d-flex align-items-center gap-2">
                    <FileText size={16} /> Mô tả
                  </h6>
                  <p className="small text-muted">
                    {order.description || "N/A"}
                  </p>
                  {order.response && (
                    <div className="mt-2">
                      <h6 className="small fw-medium">Cập nhật trạng thái:</h6>
                      <p className="small text-muted fst-italic">
                        {order.response}
                      </p>
                    </div>
                  )}
                </Col>
              </Row>

              {order.imageCus?.length > 0 && (
                <div className="mt-3">
                  <h6 className="fw-semibold">Hình ảnh khách hàng</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {order.imageCus.map((img) => (
                      <img
                        key={img.id}
                        src={img.imageUrl || "/placeholder.svg"}
                        alt="Hình ảnh khách hàng"
                        className="rounded border shadow-sm hover-scale"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {order.imageDesign?.length > 0 && (
                <div className="mt-3">
                  <h6 className="fw-semibold">Xem trước thiết kế</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {order.imageDesign.map((img) => (
                      <img
                        key={img.id}
                        src={img.imageUrl || "/placeholder.svg"}
                        alt="Xem trước thiết kế"
                        className="rounded border shadow-sm hover-scale"
                        style={{
                          width: "150px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </Col>

            <Col lg={4}>
              {order.imageDelivery && (
                <div className="mb-3">
                  <h6 className="fw-semibold">Sản phẩm đã giao</h6>
                  <img
                    src={order.imageDelivery || "/placeholder.svg"}
                    alt="Sản phẩm đã giao"
                    className="w-100 rounded border shadow-sm hover-scale"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </div>
              )}

              <div className="mb-3">
                <h6 className="fw-semibold">Địa chỉ giao hàng</h6>
                <div className="small text-muted">
                  <p>{order.address?.street || "N/A"}</p>
                  <p>
                    {order.address?.city
                      ? `${order.address.city}, ${order.address.state} ${order.address.zipCode}`
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <h6 className="fw-semibold">Tiến độ đơn hàng</h6>
                <div className="d-flex flex-column gap-2 small">
                  {order.processOrders?.length > 0 ? (
                    order.processOrders.map((process) => (
                      <div
                        key={process.id}
                        className="d-flex align-items-center gap-2"
                      >
                        <div
                          className="bg-primary rounded-circle"
                          style={{ width: "8px", height: "8px" }}
                        ></div>
                        <span className="fw-medium">
                          {process.status
                            ? getStatusText(process.status)
                            : "N/A"}
                        </span>
                        <span className="text-muted">
                          {process.date
                            ? new Date(process.date).toLocaleDateString("vi-VN")
                            : "N/A"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">Không có cập nhật tiến độ.</p>
                  )}
                </div>
              </div>
            </Col>
          </Row>

          <hr className="my-4" />

          <div className="d-flex flex-column flex-sm-row gap-2">
            <Button
              variant="outline-primary"
              className="flex-fill btn-hover"
              title="Theo dõi trạng thái vận chuyển"
            >
              <Truck className="me-2" size={16} />
              Theo dõi
            </Button>
            {order.status === "DELIVERED" && (
              <Button
                variant="outline-primary"
                className="flex-fill btn-hover"
                title="Đặt lại đơn hàng này"
              >
                Đặt lại
              </Button>
            )}
            {order.status === "PENDING_APPROVAL" && (
              <Button
                variant="primary"
                className="flex-fill btn-hover"
                title="Xem và duyệt thiết kế"
              >
                Duyệt thiết kế
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
