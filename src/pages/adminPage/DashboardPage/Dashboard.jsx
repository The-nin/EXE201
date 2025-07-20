import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
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
import { Table, Spin } from "antd";
import {
  getAllOrder,
  getTotalOrders,
  getTotalRevenue,
  getTotalUsers,
} from "../../../service/admin";

export default function AdminDashboard() {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [orders, setOrders] = useState([]);

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

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getAllOrder();
      if (response.code === 200) {
        setOrders(response.result);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalOrders();
    fetchTotalRevenue();
    fetchOrders();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  function formatDateTime(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // tháng bắt đầu từ 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Tổng giá",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => formatPrice(totalAmount),
    },
    {
      title: "Phương thức",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (orderDate) => formatDateTime(orderDate),
    },
    {
      title: "Trang thái",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">Dashboard</h2>
              <p className="text-muted mb-0">Tổng quan hoạt động kinh doanh</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col lg={4} md={6} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-muted small mb-1">Doanh thu</div>
                  <h4 className="mb-1">{formatPrice(totalRevenue)}</h4>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <FiDollarSign className="text-primary" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={6} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-muted small mb-1">Đơn hàng</div>
                  <h4 className="mb-1">{totalOrders}</h4>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <FiShoppingBag className="text-success" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={6} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="text-muted small mb-1">Người dùng</div>
                  <h4 className="mb-1">{totalUsers}</h4>
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <FiUsers className="text-info" size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={orders}
          loading={loading}
          rowKey="id"
        />
      </Spin>
    </Container>
  );
}
