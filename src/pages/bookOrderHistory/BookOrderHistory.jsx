import { Badge, Button, Card, Form } from "react-bootstrap";
import {
  CalendarDays,
  Package,
  Search,
  Truck,
  Eye,
  Palette,
  Ruler,
  FileText,
} from "lucide-react";
import { getBookOrderHistory } from "../../service/user/index.js";
import { useEffect, useState } from "react";
import "./BookOrderHistory.scss"; // File CSS tùy chỉnh

export default function BookOrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getBookOrderHistory();
        if (Array.isArray(data)) {
          setOrders(data);
          console.log(data);
        } else {
          console.error("getBookOrderHistory did not return an array:", data);
          setOrders([]);
          setError("Dữ liệu nhận được không đúng định dạng.");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
        setError("Không thể tải đơn hàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-success text-white";
      case "SHIPPED":
        return "bg-primary text-white";

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

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.designName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold text-primary animate__animated animate__fadeIn">
            Đơn Hàng In Ấn Tùy Chỉnh
          </h1>
          <p className="text-muted">
            Theo dõi và quản lý đơn hàng in ấn tùy chỉnh của bạn
          </p>
        </div>
        <div
          className="position-relative"
          style={{ width: "100%", maxWidth: "300px" }}
        >
          <Search
            className="position-absolute top-50 translate-middle-y ms-3 text-muted"
            size={16}
          />
          <Form.Control
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            className="ps-5 rounded-pill"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div className="text-center animate__animated animate__fadeIn">
          <p className="text-muted">Đang tải đơn hàng...</p>
        </div>
      )}

      {error && (
        <div
          className="alert alert-danger animate__animated animate__shakeX"
          role="alert"
        >
          {error}
        </div>
      )}

      {!loading && !error && filteredOrders.length === 0 && (
        <div
          className="alert alert-info animate__animated animate__fadeIn"
          role="alert"
        >
          Không tìm thấy đơn hàng nào.
        </div>
      )}

      {!loading &&
        !error &&
        Array.isArray(filteredOrders) &&
        filteredOrders.length > 0 && (
          <div className="d-flex flex-column gap-4">
            {filteredOrders.map((order) => (
              <Card
                key={order.id}
                className="shadow-lg border-0 animate__animated animate__fadeInUp"
              >
                <Card.Header className="bg-gradient-light">
                  <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between gap-3">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <Card.Title as="h5">Đơn hàng #{order.id}</Card.Title>
                        <Badge
                          className={`${getStatusColor(
                            order.status
                          )} rounded-pill`}
                        >
                          {getStatusIcon(order.status)}
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      <div className="row row-cols-1 row-cols-sm-2 g-2 text-muted small">
                        <p className="col">
                          <strong>Khách hàng:</strong>{" "}
                          {order.customerName || "N/A"}
                        </p>
                        <p className="col">
                          <strong>Thiết kế:</strong> {order.designName || "N/A"}
                        </p>
                        <p className="col">
                          <strong>Ngày:</strong>{" "}
                          {order.createdAt
                            ? new Date(order.createdDate).toLocaleDateString(
                                "vi-VN"
                              )
                            : "N/A"}
                        </p>
                        <p className="col">
                          <strong>Danh mục:</strong>{" "}
                          {order.category?.categoryName || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="text-lg-end">
                      <p className="small text-muted mb-0">Tổng cộng</p>
                      <p className="h5 fw-bold text-primary">
                        $
                        {order.totalPrice
                          ? order.totalPrice.toFixed(2)
                          : "0.00"}
                      </p>
                    </div>
                  </div>
                </Card.Header>

                <Card.Body>
                  <div className="row g-4">
                    <div className="col-lg-8">
                      <div className="row g-3">
                        <div className="col-sm-6">
                          <h6 className="fw-semibold d-flex align-items-center gap-2">
                            <Ruler size={16} /> Thông số
                          </h6>
                          <div className="small">
                            <p>
                              <strong>Kích thước:</strong>{" "}
                              {formatSize(order.size) || "N/A"}
                            </p>
                            <p>
                              <strong>Số lượng:</strong>{" "}
                              {order.quantity || "N/A"}
                            </p>
                            <p>
                              <strong>Màu sắc:</strong> {order.color || "N/A"}
                            </p>
                            <p>
                              <strong>Chất liệu:</strong>{" "}
                              {order.fabric?.fabricName || "N/A"}
                            </p>
                            <p>
                              <strong>Loại in:</strong>{" "}
                              {order.typePrint?.printName || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <h6 className="fw-semibold d-flex align-items-center gap-2">
                            <FileText size={16} /> Mô tả
                          </h6>
                          <p className="small text-muted">
                            {order.description || "N/A"}
                          </p>
                          {order.response && (
                            <div className="mt-2">
                              <h6 className="small fw-medium">
                                Cập nhật trạng thái:
                              </h6>
                              <p className="small text-muted fst-italic">
                                {order.response}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

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
                                  width: "64px",
                                  height: "64px",
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
                                  width: "96px",
                                  height: "64px",
                                  objectFit: "cover",
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="col-lg-4">
                      {order.imageDelivery && (
                        <div className="mb-3">
                          <h6 className="fw-semibold">Sản phẩm đã giao</h6>
                          <img
                            src={order.imageDelivery || "/placeholder.svg"}
                            alt="Sản phẩm đã giao"
                            className="w-100 rounded border shadow-sm hover-scale"
                            style={{ height: "128px", objectFit: "cover" }}
                          />
                        </div>
                      )}

                      <div className="mb-3">
                        <h6 className="fw-semibold">Địa chỉ giao hàng</h6>
                        <div className="small text-muted">
                          <p>{order.address?.street || "N/A"}</p>
                          <p>
                            {order.address?.city
                              ? `${order.address.street},${order.address.ward}, ${order.address.district} ${order.address.city}`
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
                                    ? new Date(process.date).toLocaleDateString(
                                        "vi-VN"
                                      )
                                    : "N/A"}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p className="text-muted">
                              Không có cập nhật tiến độ.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="d-flex flex-column flex-sm-row gap-2">
                    <Button
                      variant="outline-primary"
                      className="flex-fill btn-hover"
                      title="Xem chi tiết đơn hàng"
                    >
                      <Eye className="me-2" size={16} />
                      Xem chi tiết
                    </Button>
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
            ))}
          </div>
        )}

      <div className="text-center py-5">
        <Button variant="outline-primary" className="btn-hover rounded-pill">
          Tải thêm đơn hàng
        </Button>
      </div>
    </div>
  );
}
