import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Dropdown,
  ProgressBar,
} from "react-bootstrap";
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiTrendingUp,
  FiTrendingDown,
  FiEye,
  FiEdit,
  FiMoreVertical,
  FiCalendar,
  FiDownload,
  FiRefreshCw,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiTruck,
} from "react-icons/fi";
import {
  getTotalOrders,
  getTotalRevenue,
  getTotalUsers,
} from "../../../service/admin";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchTotalUsers = async () => {
    setLoading(true);
    try {
      const response = await getTotalUsers();
      setTotalUsers(response);
    } catch (error) {
      console.error("Error fetching total users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalOrders = async () => {
    setLoading(true);
    try {
      const response = await getTotalOrders();
      setTotalOrders(response);
    } catch (error) {
      console.error("Error fetching total orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalRevenue = async () => {
    setLoading(true);
    try {
      const response = await getTotalRevenue();
      setTotalRevenue(response);
    } catch (error) {
      console.error("Error fetching total revenue:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalOrders();
    fetchTotalRevenue();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  //   const formatDate = (dateString) => {
  //     return new Date(dateString).toLocaleDateString("vi-VN", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       year: "numeric",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     });
  //   };

  //   const getOrderStatusBadge = (status) => {
  //     const statusMap = {
  //       PENDING: { bg: "warning", text: "Chờ xử lý" },
  //       CONFIRMED: { bg: "info", text: "Đã xác nhận" },
  //       SHIPPING: { bg: "primary", text: "Đang giao" },
  //       DELIVERED: { bg: "success", text: "Đã giao" },
  //       CANCELLED: { bg: "danger", text: "Đã hủy" },
  //     };
  //     return statusMap[status] || { bg: "secondary", text: "Không xác định" };
  //   };

  //   const getStockStatusBadge = (status) => {
  //     const statusMap = {
  //       LOW_STOCK: { bg: "warning", text: "Sắp hết" },
  //       OUT_OF_STOCK: { bg: "danger", text: "Hết hàng" },
  //     };
  //     return statusMap[status] || { bg: "success", text: "Còn hàng" };
  //   };

  //   const handleViewOrder = (orderId) => {
  //     navigate(`/admin/orders/${orderId}`);
  //   };

  //   const handleViewProduct = (productId) => {
  //     navigate(`/admin/products/${productId}`);
  //   };

  //   const handleEditProduct = (productId) => {
  //     navigate(`/admin/products/edit/${productId}`);
  //   };

  if (loading) {
    return (
      <Container fluid className="py-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  //   if (!loading && !totalUsers && !totalOrders && !totalRevenue) {
  //     return (
  //       <Container fluid className="py-4">
  //         <div className="text-center">
  //           <h4>Không thể tải dữ liệu dashboard</h4>
  //         </div>
  //       </Container>
  //     );
  //   }

  return (
    <Container fluid className="py-4">
      {/* Header */}
      {/* <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">Dashboard</h2>
              <p className="text-muted mb-0">Tổng quan hoạt động kinh doanh</p>
            </div>
            <div className="d-flex gap-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" size="sm">
                  <FiCalendar className="me-2" />
                  {selectedPeriod === "today" && "Hôm nay"}
                  {selectedPeriod === "week" && "Tuần này"}
                  {selectedPeriod === "month" && "Tháng này"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSelectedPeriod("today")}>
                    Hôm nay
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSelectedPeriod("week")}>
                    Tuần này
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSelectedPeriod("month")}>
                    Tháng này
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant="outline-primary" size="sm">
                <FiDownload className="me-2" />
                Xuất báo cáo
              </Button>
              <Button variant="primary" size="sm" onClick={fetchDashboardData}>
                <FiRefreshCw className="me-2" />
                Làm mới
              </Button>
            </div>
          </div>
        </Col>
      </Row> */}

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-muted small mb-1">Doanh thu</div>
                  <h4 className="mb-1">{formatPrice(totalRevenue)}</h4>
                  {/* <div className="d-flex align-items-center">
                    {totalRevenue.stats.revenueChange > 0 ? (
                      <FiTrendingUp className="text-success me-1" />
                    ) : (
                      <FiTrendingDown className="text-danger me-1" />
                    )}
                    <small
                      className={
                        totalRevenue.stats.revenueChange > 0
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {Math.abs(totalRevenue.stats.revenueChange)}%
                    </small>
                  </div> */}
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <FiDollarSign className="text-primary" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-muted small mb-1">Đơn hàng</div>
                  <h4 className="mb-1">{totalOrders}</h4>
                  {/* <div className="d-flex align-items-center">
                    {dashboardData.stats.ordersChange > 0 ? (
                      <FiTrendingUp className="text-success me-1" />
                    ) : (
                      <FiTrendingDown className="text-danger me-1" />
                    )}
                    <small
                      className={
                        dashboardData.stats.ordersChange > 0
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {Math.abs(dashboardData.stats.ordersChange)}%
                    </small>
                  </div> */}
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <FiShoppingBag className="text-success" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-muted small mb-1">Người dùng</div>
                  <h4 className="mb-1">{totalUsers}</h4>
                  {/* <div className="d-flex align-items-center">
                    {dashboardData.stats.customersChange > 0 ? (
                      <FiTrendingUp className="text-success me-1" />
                    ) : (
                      <FiTrendingDown className="text-danger me-1" />
                    )}
                    <small
                      className={
                        dashboardData.stats.customersChange > 0
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {Math.abs(dashboardData.stats.customersChange)}%
                    </small>
                  </div> */}
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <FiUsers className="text-info" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* <Col lg={3} md={6} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-muted small mb-1">Sản phẩm</div>
                  <h4 className="mb-1">{dashboardData.stats.totalProducts}</h4>
                  <div className="d-flex align-items-center">
                    {dashboardData.stats.productsChange > 0 ? (
                      <FiTrendingUp className="text-success me-1" />
                    ) : (
                      <FiTrendingDown className="text-danger me-1" />
                    )}
                    <small
                      className={
                        dashboardData.stats.productsChange > 0
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {Math.abs(dashboardData.stats.productsChange)}%
                    </small>
                  </div>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <FiPackage className="text-warning" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>

      <Row>
        {/* Recent Orders */}
        {/* <Col lg={8} className="mb-4">
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Đơn hàng gần đây</h5>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => navigate("/admin/orders")}
                >
                  Xem tất cả
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Ngày đặt</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentOrders.map((order) => {
                    const statusInfo = getOrderStatusBadge(order.status);
                    return (
                      <tr key={order.id}>
                        <td>
                          <strong className="text-primary">{order.id}</strong>
                        </td>
                        <td>
                          <div>
                            <div>{order.customerName}</div>
                            <small className="text-muted">
                              {order.items} sản phẩm
                            </small>
                          </div>
                        </td>
                        <td>
                          <strong>{formatPrice(order.total)}</strong>
                        </td>
                        <td>
                          <Badge bg={statusInfo.bg}>{statusInfo.text}</Badge>
                        </td>
                        <td>
                          <small>{formatDate(order.createdAt)}</small>
                        </td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="outline-secondary"
                              size="sm"
                            >
                              <FiMoreVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => handleViewOrder(order.id)}
                              >
                                <FiEye className="me-2" />
                                Xem chi tiết
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <FiEdit className="me-2" />
                                Cập nhật trạng thái
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col> */}

        {/* Order Status Overview */}
        {/* <Col lg={4} className="mb-4">
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Trạng thái đơn hàng</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small">
                    <FiClock className="me-1 text-warning" />
                    Chờ xử lý
                  </span>
                  <strong>{dashboardData.ordersByStatus.pending}</strong>
                </div>
                <ProgressBar
                  variant="warning"
                  now={
                    (dashboardData.ordersByStatus.pending /
                      dashboardData.stats.totalOrders) *
                    100
                  }
                  style={{ height: "6px" }}
                />
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small">
                    <FiCheckCircle className="me-1 text-info" />
                    Đã xác nhận
                  </span>
                  <strong>{dashboardData.ordersByStatus.confirmed}</strong>
                </div>
                <ProgressBar
                  variant="info"
                  now={
                    (dashboardData.ordersByStatus.confirmed /
                      dashboardData.stats.totalOrders) *
                    100
                  }
                  style={{ height: "6px" }}
                />
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small">
                    <FiTruck className="me-1 text-primary" />
                    Đang giao
                  </span>
                  <strong>{dashboardData.ordersByStatus.shipping}</strong>
                </div>
                <ProgressBar
                  variant="primary"
                  now={
                    (dashboardData.ordersByStatus.shipping /
                      dashboardData.stats.totalOrders) *
                    100
                  }
                  style={{ height: "6px" }}
                />
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small">
                    <FiCheckCircle className="me-1 text-success" />
                    Đã giao
                  </span>
                  <strong>{dashboardData.ordersByStatus.delivered}</strong>
                </div>
                <ProgressBar
                  variant="success"
                  now={
                    (dashboardData.ordersByStatus.delivered /
                      dashboardData.stats.totalOrders) *
                    100
                  }
                  style={{ height: "6px" }}
                />
              </div>

              <div className="mb-0">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small">
                    <FiAlertCircle className="me-1 text-danger" />
                    Đã hủy
                  </span>
                  <strong>{dashboardData.ordersByStatus.cancelled}</strong>
                </div>
                <ProgressBar
                  variant="danger"
                  now={
                    (dashboardData.ordersByStatus.cancelled /
                      dashboardData.stats.totalOrders) *
                    100
                  }
                  style={{ height: "6px" }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>

      <Row>
        {/* Top Products */}
        {/* <Col lg={8} className="mb-4">
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Sản phẩm bán chạy</h5>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => navigate("/admin/products")}
                >
                  Xem tất cả
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Đã bán</th>
                    <th>Doanh thu</th>
                    <th>Tồn kho</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.topProducts.map((product, index) => (
                    <tr key={product.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="me-2">
                            <Badge bg="primary" className="rounded-pill">
                              #{index + 1}
                            </Badge>
                          </div>
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="rounded me-3"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                            }}
                          />
                          <div>
                            <div className="fw-medium">{product.name}</div>
                            <small className="text-muted">
                              ID: {product.id}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <strong>{product.sold}</strong>
                      </td>
                      <td>
                        <strong className="text-success">
                          {formatPrice(product.revenue)}
                        </strong>
                      </td>
                      <td>
                        <Badge bg={product.stock < 10 ? "warning" : "success"}>
                          {product.stock}
                        </Badge>
                      </td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="outline-secondary"
                            size="sm"
                          >
                            <FiMoreVertical />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => handleViewProduct(product.id)}
                            >
                              <FiEye className="me-2" />
                              Xem chi tiết
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleEditProduct(product.id)}
                            >
                              <FiEdit className="me-2" />
                              Chỉnh sửa
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col> */}

        {/* Low Stock Alert */}
        {/* <Col lg={4} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <FiAlertCircle className="me-2 text-warning" />
                Cảnh báo tồn kho
              </h5>
            </Card.Header>
            <Card.Body>
              {dashboardData.lowStockProducts.length > 0 ? (
                <div className="space-y-3">
                  {dashboardData.lowStockProducts.map((product) => {
                    const statusInfo = getStockStatusBadge(product.status);
                    return (
                      <div
                        key={product.id}
                        className="d-flex justify-content-between align-items-center mb-3"
                      >
                        <div>
                          <div className="fw-medium">{product.name}</div>
                          <small className="text-muted">
                            Còn {product.stock}/{product.minStock} tối thiểu
                          </small>
                        </div>
                        <Badge bg={statusInfo.bg}>{statusInfo.text}</Badge>
                      </div>
                    );
                  })}
                  <div className="text-center mt-3">
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => navigate("/admin/inventory")}
                    >
                      Quản lý tồn kho
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted">
                  <FiCheckCircle size={48} className="mb-2" />
                  <p>Tất cả sản phẩm đều có đủ tồn kho</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </Container>
  );
}
